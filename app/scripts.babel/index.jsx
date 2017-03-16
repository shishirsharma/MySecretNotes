'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, ContentState, convertFromHTML, convertToRaw, convertFromRaw} from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

class RichEditorExample extends React.Component {
    constructor(props) {
        super(props);
        /* this.state = {editorState: EditorState.createEmpty()};*/
        const default_note_content = '{"entityMap":{},"blocks":[{"key":"9id36","text":"Title","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"209rs","text":"Subtitle","type":"header-five","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"},{"offset":0,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"Para para para para para para para para para para para para para para para para para para para","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';

        var aValue = localStorage.getItem(props.uuid);
        if (aValue == null) {
            aValue = default_note_content;
        }
        /* var initialState = convertFromRaw(JSON.parse(props.initialState));*/
        var initialState = convertFromRaw(JSON.parse(aValue));
        this.state = {editorState: EditorState.createWithContent(initialState)};

        /* var that = this;
         * var p1 = new Promise(function(resolve, reject) {
         *     chrome.storage.local.get(props.uuid, function(result) {
         *         if (window.console) { console.log('[notes] loading uuid:', props.uuid, result, that); }
         *         const contentState = convertFromRaw(JSON.parse(result[props.uuid]));
         *         const editorState = EditorState.push(that.state.editorstate, contentState);
         *         that.setState({editorState});
         *         resolve(true);
         *     });
         * });*/



        /* var p2 = p1.then(function(val) {*/
        /* var processedHTML = convertFromHTML(props.initialState);
         * var initialState = ContentState.createFromBlockArray(processedHTML);*/
        /* console.log(initialState); 
         * console.log(convertFromRaw(JSON.parse(initialState))); */
        /*
           if (window.console) { console.log('[notes] loading initialState:', initialState); }

           });*/

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({editorState});
            // This is a redundent call 
            const content = this.state.editorState.getCurrentContent();
            const serialized = JSON.stringify(convertToRaw(content));
            var data = {};
            data[props.uuid] = serialized;
            console.log('[notes] serialized uuid:', props.uuid, ' [', serialized, ']');
            localStorage.setItem(props.uuid, serialized);
            /* chrome.storage.local.set(data, function() {
             *     if (window.console) {
             *         console.log('[notes] serialized uuid:', props.uuid, ' [', serialized, ']');
             *     }
             * });*/
        }

        this.deleteNote = (uuid) => {
            if (window.console) { console.log('[notes] note added >>>', props.uuid, uuid); }
            this.props.deleteNote(this.props.uuid);
        }
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        if (window.console) { console.log('[notes] constructor finished'); }
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

    render() {
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

        return (
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
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        deleteNote={this.deleteNote}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder=""
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

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
            <div className="Notes-controls">
                <span onMouseDown={this.onMouseDown}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
        );
    }
};


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


function Card(props) {

    return (
        <div className="card">
            <div className="card-block">
                <RichEditorExample
                    initialState={props.content}
                    uuid={props.uuid}
                    deleteNote={props.deleteNote} />
            </div>
        </div>
    );
}

class CardColumns extends React.Component {
    constructor(props) {
        if (window.console) { console.log('[cardcolumns] constructor'); }
        super(props);
    }
    render() {
        var cards = this.props.cards;
        if (window.console) { console.log('[cardcolumns] render', cards); }
        var cardItems = cards.map(function (card) {
            return (
                <Card
                    key={card.uuid}
                    uuid={card.uuid}
                    content={card.content}
                    deleteNote={this.props.deleteNote} />
            );
        }, this);
        return (
            <div className="card-columns">
                {cardItems}
            </div>
        );
    }
}
const default_note_content = '{"entityMap":{},"blocks":[{"key":"9id36","text":"Title","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"209rs","text":"Subtitle","type":"header-five","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"},{"offset":0,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"Para para para para para para para para para para para para para para para para para para para","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';
class Notes extends React.Component {
    constructor(props) {
        super(props);
        if (window.console) { console.log('[notes] constructor finished', props); }

        var keys = [];
        for (var key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                keys.push({uuid: key, content: localStorage.getItem(key)});
            }
        }
        this.state = {cards: keys};
        this.addNote = (e) => {
            e.preventDefault();
            var old_cards = this.state.cards;
            var uuid = generateUUID();
            var cards = [{uuid: uuid, content: default_note_content}].concat(old_cards);
            if (window.console) { console.log('[notes] note added', cards); }

            // this.setState({cards: this.state.cards.concat([{uuid: uuid, content: default_note_content}])});
            this.setState({cards: cards}, function () {
                if (window.console) { console.log('[notes] updated state', this.state.cards); }
            });
        }
        this.deleteNote = (uuid) => {
            if (window.console) { console.log('[notes] removing', uuid); }

            localStorage.removeItem(uuid);
            const old_cards = this.state.cards;

            var cards = old_cards.filter(function(elem, idx) { if(elem.uuid != uuid) return elem });
            this.setState({cards: cards}, function () {
                if (window.console) { console.log('[notes] updated state', this.state.cards); }
            });
        }
    }

    render() {
        if (window.console) { console.log('[notes] rendering'); }
        return (
            <div>
                <MuiThemeProvider>
                    <NavBar addNote={this.addNote.bind(this)} />
                </MuiThemeProvider>
                <div className="container-fluid content-wrapper">
                    <div id="main-table">
                        <div className="notes">
                            <CardColumns
                                cards={this.state.cards}
                                deleteNote={this.deleteNote} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const cards = [
    {uuid: '4aca821c-2676-4015-a6e4-48f42a003c39', content:'{"entityMap":{},"blocks":[{"key":"9id36","text":"Title","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"209rs","text":"Subtitle","type":"header-five","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"},{"offset":0,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"Para para para para para para para para para para para para para para para para para para para","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'},
    {uuid:'646d2de3-8103-47c4-b604-48229eb87fe8', content:'{"entityMap":{},"blocks":[{"key":"9id36","text":"Title","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"209rs","text":"Subtitle","type":"header-five","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"},{"offset":0,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"Para para para para para para para para para para para para para para para para para para para","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'},
    {uuid:'0c163d83-2f79-4838-bd48-15f9247ba476', content:'{"entityMap":{},"blocks":[{"key":"9id36","text":"Title","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"209rs","text":"Subtitle","type":"header-five","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"},{"offset":0,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"Para para para para para para para para para para para para para para para para para para para","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'}
];

ReactDOM.render(
    <Notes
        cards={cards} />,
    document.getElementById('main-table')
);
