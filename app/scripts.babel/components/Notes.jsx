'use strict';

import Store from 'store';
import React from 'react'; 
import crypto from 'crypto';

/* import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import generateUUID from 'utils';
import NavBar from 'components/NavBar';
import CardColumns from 'components/CardColumns';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        if (window.console) { console.log('[notes] constructor finished', props); }

        var keys = [];
        Store.each(function(value, key) {
            keys.push({uuid: key});
        });
        this.state = {cards: keys, init: true, password:'password'};
        this.addNote = (e) => {
            e.preventDefault();
            this._handleAddNote()
        }
        this.deleteNote = (uuid) => {
            if (window.console) { console.log('[notes] removing', uuid); }
            this._handleDeleteNote(uuid);
        }
    }

    componentDidMount() {
        // var that = this;
        if (window.console) { console.log('[Notes] componentDidMount:', this.state, this.state.init); }
        if(this.state.init === true) {
            this._handleGet(this.state)
        }
    }

    _handleGet(state) {
        const cards_key = 'cards';
        const init = false;
        const password = this.state.password;
        chrome.storage.local.get(cards_key, function(result) {
            const cards = result[cards_key];
            if (window.console) { console.log('[Notes] loading cards:', cards); }
            if (cards != undefined) {
                this.setState({cards, init, password});
            }
        }.bind(this));
    }


    _handleCipher(password) {
        const cipher = crypto.createCipher('aes192', password);

        let encrypted = '';
        cipher.on('readable', () => {
            const data = cipher.read();
            if (data)
                encrypted += data.toString('hex');
        });
        cipher.on('end', () => {
            console.log('encrypted', encrypted);
            // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
        });

        /* cipher.write('some clear text data');
         * cipher.end();*/
        return cipher;
    }

    _handleDecipher(password) {
        const decipher = crypto.createDecipher('aes192', password);

        let decrypted = '';
        decipher.on('readable', () => {
            const data = decipher.read();
            if (data)
                decrypted += data.toString('utf8');
        });
        decipher.on('end', () => {
            console.log('decrypted', decrypted);
            // Prints: some clear text data
        });

        //const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
        /* decipher.write(encrypted, 'hex');
         * decipher.end();*/
        return decipher;
    }

    _handleCards(cards) {
        const serialized = cards;
        var data = {};
        data['cards'] = serialized;
        console.log('[notes] serialized cards:', serialized);
        chrome.storage.local.set(data, function() {
            if (window.console) { console.log('[chrome.storage] cards: ', serialized); }
        });
    }

    _handleAddNote() { 
        var old_cards = this.state.cards;
        const password = this.state.password;
        var uuid = generateUUID();
        var cards = [{uuid: uuid }].concat(old_cards);
        this._handleCards(cards);
        if (window.console) { console.log('[notes] note added', cards); }

        // this.setState({cards: this.state.cards.concat([{uuid: uuid, content: default_note_content}])});
        this.setState({cards, password}, function () {
            if (window.console) { console.log('[notes] updated state', this.state.cards); }
        });
    }

    _handleDeleteNote(uuid) {
        Store.remove(uuid);
        const old_cards = this.state.cards;
        const password = this.state.password;
        var cards = old_cards.filter(function(elem, idx) { if(elem.uuid != uuid) return elem });
        this._handleCards(cards);
        this.setState({cards, password}, function () {
            if (window.console) { console.log('[notes] updated state', this.state.cards); }
        });
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
                                decipher={this._handleDecipher(this.state.password)}
                                cipher={this._handleCipher(this.state.password)}
                                deleteNote={this.deleteNote} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notes;
