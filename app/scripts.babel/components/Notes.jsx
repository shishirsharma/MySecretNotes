'use strict';

import Store from 'store';
import React from 'react'; 

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
            var cards = [{uuid: uuid }].concat(old_cards);
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

export default Notes;
