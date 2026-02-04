'use strict';

import React from 'react';
import {Editor, EditorState, RichUtils, ContentState, convertFromHTML, convertToRaw, convertFromRaw} from 'draft-js';

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
        />
       )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
        />
       )}
    </div>
  );
};

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    const default_note_content = '{"entityMap":{},"blocks":[{"key":"9id36","text":"New Note","type":"header-three","depth":0,"entityRanges":[],"data":{}},{"key":"arjcc","text":"New note","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';
    var aValue = props.content;
    if (aValue == null || aValue === '') {
      if (window.console) { console.debug('[RichEditor] new note:', aValue ); }
      aValue = default_note_content;
    }
    var initialState = convertFromRaw(JSON.parse(aValue));
    this.state = {editorState: EditorState.createWithContent(initialState), init: true};

    this.editorRef = React.createRef();
    this.focus = () => this.editorRef.current?.focus();
    this.onChange = (editorState) => {
      const currentContentState = this.state.editorState.getCurrentContent();
      const newContentState = editorState.getCurrentContent();
      if (window.console) { console.debug('[RichEditor] ', JSON.stringify(convertToRaw(newContentState))); }
      if (currentContentState !== newContentState) {
        // There was a change in the content
        var newEditorState = this._handleTitle(editorState);
        if (newEditorState) {
          this._handleStore(newEditorState);
          this.setState({editorState: newEditorState});
        } else {
          if (window.console) { console.debug('[RichEditor] <<< State did not save >>>'); }
        }
      } else {
        this.setState({editorState});
      }
    }

    this.deleteNote = (uuid) => {
      if (window.console) { console.debug('[RichEditor] note added >>>', props.uuid, uuid); }
      this.props.deleteNote(this.props.uuid);
    }
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    if (window.console) { console.debug('[RichEditor] constructor finished'); }
  }

  componentDidMount() {
    if (window.console) { console.debug('[RichEditor] componentDidMount:', this.props.uuid, this.state.init); }
    if(this.state.init === true) {
      this._handleGet(this.state.editorState)
    }
    this.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.update && !prevProps.update) {
      const props = this.props;
      const content = this.state.editorState.getCurrentContent();
      const serialized = this.props.encrypt(JSON.stringify(convertToRaw(content)));
      var data = {};
      data[props.uuid] = serialized;
      console.debug('[RichEditor] updated:', props.uuid, ' [', serialized, ']');
      chrome.storage.local.set(data, function() {
        if (window.console) { console.debug('[chrome.storage]', props.uuid, ':', serialized); }
      });
    }
  }

  _handleStore(editorState) {
    const props = this.props;
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText(' ').toLowerCase();
    const serialized = this.props.encrypt(JSON.stringify(convertToRaw(contentState)));
    var data = {};
    data[props.uuid] = serialized;
    console.debug('[RichEditor] serialized uuid:', props.uuid, ': [', serialized, '] ', text);

    chrome.storage.local.set(data, function() {
      if (window.console) { console.debug('[chrome.storage] Saved uuid', props.uuid, ': [', serialized, ']'); }
    });
  }

  _handleGet(editorState) {
    const uuid = this.props.uuid;
    chrome.storage.local.get(uuid, function(result) {
      const content = result[uuid];
      if (window.console) {
        console.debug('[chrome.storage] loading from storage uuid: ', uuid, 'result: ', result[uuid]);
      }
      if(content != undefined) {
        if (window.console) {
          console.debug('[RichEditor] loading from storage uuid:', uuid, this.props.decrypt(content));
        }
        var jsonContentState = this.props.decrypt(content)
        if (jsonContentState) {
          const contentState = convertFromRaw(JSON.parse(jsonContentState));
          const editorState = EditorState.push(this.state.editorState, contentState);
          if (window.console) { console.debug('[RichEditor] loaded content:', content, this.state); }
          this.setState({editorState: editorState, init: false});
        } else {
          if (window.console) { console.debug('[RichEditor] invalid data'); }
          if (this.state.no_data == false && this.state.init == false) {
            this.setState({editorState: {}, init: false, no_data: true});
          }
        }
      } else {
        this._handleStore(editorState)
      }
    }.bind(this));
  }

  _handleTitle(editorState) {
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    if(currentContent.getBlockMap().first().getKey() === anchorKey) {
      console.debug('[RichEditor] Title:', currentContent.getBlockMap().first().getKey() === anchorKey);
      var currentBlockType = RichUtils.getCurrentBlockType(editorState)
      console.debug('[RichEditor] Title:', currentBlockType);
      if (currentBlockType != 'header-three') {
        return RichUtils.toggleBlockType(editorState, 'header-three' )
      }
    }
    return editorState
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _handleSearch(contentState, query) {
    var text = contentState.getPlainText(' ').toLowerCase();

    if (window.console) { console.debug('[RichEditor] search', this.props.uuid, 'found', text.search(query), 'query:', query, 'text:', text ); }

    if(text.search(query.toLowerCase()) === -1) {
      if (window.console) { console.debug('[RichEditor] uuid', this.props.uuid, 'query:', query, 'Not Found' ); }
      return false;
    }
    return true;
  }

  render() {
    if (window.console) { console.debug('[RichEditor] render:', this.props.uuid, this.state); }

    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    const query  = this.props.query;

    if(!this._handleSearch(contentState, query)) {
      if (window.console) { console.debug('[RichEditor] uuid', this.props.uuid, 'query:', query, 'Not Found' ); }
      return null;
    }

    if (this.state.no_data) {
      return null
    }

    return (
      <div className="card" onClick={this.focus} autoFocus>
        <div className="card-block">

          <div className="RichEditor-root">
            <CloseButton
                onMouseDown={this.deleteNote} />
            {/* <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
                /> */}
            {/* <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
                /> */}
            <div className={className} >
              <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  deleteNote={this.deleteNote}
                  onChange={this.onChange}
                  onTab={this.onTab}
                  placeholder=""
                  ref={this.editorRef}
                  spellCheck={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CloseButton extends React.Component {
  constructor() {
    super();
    this.onMouseDown = (e) => {
      e.preventDefault();
      this.props.onMouseDown(this.props.uuid);
    };
  }
  render() {
    return (
      <div className="note-controls">
        <span onMouseDown={this.onMouseDown}>
          <i className="fa fa-trash" aria-hidden="true"></i> DELETE
        </span>
      </div>
    );
  }
};
