'use strict';

import Store from 'store';
import React from 'react';
import crypto from 'crypto';

/* import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'*/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import generateUUID from 'utils';
import NavBar from 'components/NavBar';
import CardColumns from 'components/CardColumns';
import HelpModal from 'components/HelpModal';
import UnlockModal from 'components/UnlockModal';
import SettingsModal from 'components/SettingsModal';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    if (window.console) { console.log('[Notes] constructor finished', props); }

    var keys = [];
    Store.each(function(value, key) {
      keys.push({uuid: key});
    });
    var password = 'shishir';

    this.state = {cards: keys, init: true, locked: true, password: password, query: "" };
    this.addNote = (e) => {
      e.preventDefault();
      this._handleAddNote()
    }
    this.search = (query) => {
      const cards = this.state.cards;
      const password = this.state.password;
      const locked = this.state.locked;
      const init = this.state.init;
      var query = query;
      if (window.console) { console.log('[Notes] search:', {cards, init, locked, password, query}); }

      this.setState({cards, init, locked, password, query});
    }
    this.unlockNotes = (password) => {
      if (window.console) { console.log('[Notes] unlocking:', password); }
      this._handleUnlock(password)
    }
    this.deleteNote = (uuid) => {
      if (window.console) { console.log('[Notes] removing', uuid); }
      this._handleDeleteNote(uuid);
    }
    this.encrypt = (text) => {
      return this._handleEncrypt(text);
    }
    this.decrypt = (crypted) => {
      return this._handleDecrypt(crypted);
    }
  }

  componentDidMount() {
    // var that = this;
    if (window.console) { console.log('[Notes] componentDidMount:', this.state, this.state.init); }
    if(this.state.init === true) {
      this._handleGet(this.state)
    }
  }

  _handleUnlock(password) {
    const cards = this.state.cards;
    const query = this.state.query;
    var password = password;
    const locked = false;
    const init = false;
    if (window.console) { console.log('[Notes] _handleUnlock:', {cards, init, locked,  password, query}); }

    this.setState({cards, init, locked, password});
  }

  _handleGet(state) {
    const cards_key = 'cards';
    const password = this.state.password;
    const lock = this.state.lock;
    const query = this.state.query;

    chrome.storage.local.get(cards_key, function(result) {
      const cards = result[cards_key];
      if (window.console) { console.log('[Notes] loading cards:', cards); }
      if (cards != undefined) {
        this.setState({cards, lock, password, query});
      }
    }.bind(this));
  }

  _handleEncrypt(text) {
    if (window.console) { console.log('[Notes] _handleEncrypt:', this.state.password); }
    const cipher = crypto.createCipher('aes192', this.state.password);
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');

    return crypted;
  }

  _handleDecrypt(crypted) {
    const decipher = crypto.createDecipher('aes192', this.state.password);
    var decrypted = decipher.update(crypted,'hex','utf8')
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  _handleCards(cards) {
    const serialized = cards;
    var data = {};
    data['cards'] = serialized;
    console.log('[Notes] serialized cards:', serialized);
    chrome.storage.local.set(data, function() {
      if (window.console) { console.log('[chrome.storage] cards: ', serialized); }
    });
  }

  _handleAddNote() {
    var old_cards = this.state.cards;
    const password = this.state.password;
    const query = this.state.query;
    const lock = this.state.lock;
    var uuid = generateUUID();
    var cards = [{uuid: uuid }].concat(old_cards);
    this._handleCards(cards);
    if (window.console) { console.log('[Notes] note added', cards); }

    // this.setState({cards: this.state.cards.concat([{uuid: uuid, content: default_note_content}])});
    this.setState({cards, lock, password, query}, function () {
      if (window.console) { console.log('[Notes] updated state', this.state.cards); }
    });
  }

  _handleDeleteNote(uuid) {
    Store.remove(uuid);
    const old_cards = this.state.cards;
    const password = this.state.password;
    const query = this.state.query;
    const lock = this.state.lock;
    var cards = old_cards.filter(function(elem, idx) { if(elem.uuid != uuid) return elem });
    this._handleCards(cards);
    this.setState({cards, lock, password, query}, function () {
      if (window.console) { console.log('[Notes] updated state', this.state.cards); }
    });
  }

  render() {
    if (window.console) { console.log('[Notes] rendering'); }
    let cardColumns = null;
    if (this.state.locked == true) {
      if (window.console) { console.log('[Notes] LOCKED'); }
      $('#unlockModal').modal('show');
      cardColumns = <div></div>;
    } else {
      if (window.console) { console.log('[Notes] OPEN'); }
      cardColumns = <CardColumns
                        cards={this.state.cards}
                        query={this.state.query}
                        decrypt={this.decrypt}
                        encrypt={this.encrypt}
                        deleteNote={this.deleteNote} />;
    }

    return (
      <div>
        <MuiThemeProvider>
          <NavBar addNote={this.addNote} search={this.search} />
        </MuiThemeProvider>
        <div className="container-fluid content-wrapper">
          <div>
            <div className="notes">
              {cardColumns}
            </div>
          </div>
        </div>
        <HelpModal />
        <UnlockModal unlockNotes={this.unlockNotes} /> 
        <SettingsModal unlockNotes={this.unlockNotes} /> 
      </div>
    );
  }
}

export default Notes;
