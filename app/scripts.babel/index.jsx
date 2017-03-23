'use strict';

import Store from 'store'
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, ContentState, convertFromHTML, convertToRaw, convertFromRaw} from 'draft-js';
/* import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'*/
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

class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {editorState: EditorState.createEmpty()};

        const default_note_content = '{"entityMap":{},"blocks":[{"key":"9id36","text":"New Note","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"arjcc","text":"New note","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}';
        // var aValue = localStorage.getItem(props.uuid);
        // var aValue = Store.get(props.uuid);
        var aValue = props.content;
        if (aValue == null || aValue === '') {
            console.log('[RichEditor] new note:', aValue );
            aValue = default_note_content;
        }
        /* var initialState = convertFromRaw(JSON.parse(props.initialState));*/
        var initialState = convertFromRaw(JSON.parse(aValue));
        this.state = {editorState: EditorState.createWithContent(initialState), init: true};

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
            //editorState.getCurrentContent().getBlockMap().first().getKey() === selectionState.getAnchor/FocusKey();
            var selectionState = editorState.getSelection();
            var anchorKey = selectionState.getAnchorKey();
            var currentContent = editorState.getCurrentContent();
            if(currentContent.getBlockMap().first().getKey() === anchorKey) {
                console.log('[notes] Title:', currentContent.getBlockMap().first().getKey() === anchorKey);
                var currentBlockType = RichUtils.getCurrentBlockType(editorState)
                console.log('[notes] Title:', currentBlockType);
                if (currentBlockType != 'header-three') {
                    this._toggleBlockType(editorState, 'header-three');
                }
            }
            // Store.set(props.uuid, serialized);
            var data = {};
            data[props.uuid] = serialized;
            chrome.storage.local.set(data, function() {
                if (window.console) { console.log('[chrome.storage]', props.uuid, ':', serialized); }
            });

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

    componentDidMount() {
        // var that = this;
        if (window.console) { console.log('[RichEditor] componentDidMount:', this.props.uuid, this.state.init); }
        if(this.state.init === true) {
            const uuid = this.props.uuid;
            chrome.storage.local.get(uuid, function(result) {
                if (window.console) { console.log('[RichEditor] loading uuid:', uuid, result); }
                const content = result[uuid];
                const contentState = convertFromRaw(JSON.parse(content));
                const editorState = EditorState.push(this.state.editorState, contentState);
                if (window.console) { console.log('[RichEditor] loaded content:', content, this.state); }
                this.setState({editorState: editorState, init: false});
            }.bind(this));
        }
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
        if (window.console) { console.log('[RichEditor] render:', this.props.uuid, this.state); }

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
        // Not needed
        // Part of Editor Plugins system. We are not using
        /* const options = {
         *     breakoutBlockType: 'unordered-list-item',
         *     breakoutBlocks: ['header-one', 'header-two', 'header-three']
         * }
         * const blockBreakoutPlugin = createBlockBreakoutPlugin(options);
         * const plugins = [blockBreakoutPlugin];*/

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
            <div className="note-controls">
                <span onMouseDown={this.onMouseDown}>
                    <i className="fa fa-trash" aria-hidden="true"></i> DELETE
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

class Card extends React.Component {
    constructor(props) {
        if (window.console) { console.log('[cardcolumns] constructor'); }
        super(props);
        this.state = {init: true, content: props.content};
    }
    render() {
        if (window.console) { console.log('[Card] render:', this.props.uuid, this.state); }

        return (
            <div className="card">
                <div className="card-block">
                    <RichEditor
                        content={this.props.content}
                        uuid={this.props.uuid}
                        deleteNote={this.props.deleteNote} />
                </div>
            </div>
        );
    }
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

class Notes extends React.Component {
    constructor(props) {
        super(props);
        if (window.console) { console.log('[notes] constructor finished', props); }

        var keys = [];
        Store.each(function(value, key) {
            keys.push({uuid: key});
        })
        /* for (var key in localStorage) {
         *     if (localStorage.hasOwnProperty(key)) {
         *         keys.push({uuid: key, content: localStorage.getItem(key)});
         *     }
         * }*/
        this.state = {cards: keys};
        this.addNote = (e) => {
            e.preventDefault();
            var old_cards = this.state.cards;
            var uuid = generateUUID();
            var cards = [{uuid: uuid}].concat(old_cards);
            if (window.console) { console.log('[notes] note added', cards); }

            // this.setState({cards: this.state.cards.concat([{uuid: uuid, content: default_note_content}])});
            this.setState({cards: cards}, function () {
                if (window.console) { console.log('[notes] updated state', this.state.cards); }
            });
        }
        this.deleteNote = (uuid) => {
            if (window.console) { console.log('[notes] removing', uuid); }

            Store.remove(uuid);
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
    {
        uuid: '4aca821c-2676-4015-a6e4-48f42a003c39'
    },
    {
        uuid:'646d2de3-8103-47c4-b604-48229eb87fe8'
    },
    {
        uuid:'0c163d83-2f79-4838-bd48-15f9247ba476'
    }
];

ReactDOM.render(
    <Notes
        cards={cards} />,
    document.getElementById('main-table')
);
