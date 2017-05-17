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
    if (window.console) { console.debug('[Notes] constructor finished', props); }

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
      if (window.console) { console.debug('[Notes] search:', {cards, init, locked, password, query}); }

      this.setState({cards, init, locked, password, query});
    }
    this.unlockNotes = (password) => {
      if (window.console) { console.debug('[Notes] unlocking:', password); }
      this._handleUnlock(password)
    }
    this.lockNotes = (e) => {
      e.preventDefault();
      if (window.console) { console.debug('[Notes] locking'); }
      this._handleLock(e)
    }
    this.updateNotes = (password) => {
      if (window.console) { console.debug('[Notes] updating:', password); }
      this._handleUpdate(password)
    }
    this.deleteNote = (uuid) => {
      if (window.console) { console.debug('[Notes] removing', uuid); }
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
    if (window.console) { console.debug('[Notes] componentDidMount:', this.state, this.state.init); }
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
    if (window.console) { console.debug('[Notes] _handleUnlock:', {cards, init, locked,  password, query}); }

    this.setState({cards, init, locked, password});
  }

  _handleLock() {
    const cards = this.state.cards;
    const init = this.state.init;
    const query = '';
    var password = '';
    const locked = true;
    if (window.console) { console.debug('[Notes] _handlelock:', {cards, init, locked,  password, query}); }
    this.setState({cards, init, locked, password});
  }

  _handleUpdate(password) {
    const cards = this.state.cards;
    const query = this.state.query;
    var password = password;
    const locked = false;
    const init = false;
    const update = true;
    if (window.console) { console.debug('[Notes] _handleUpdate:', {cards, init, locked,  password, query, update}); }

    this.setState({cards, init, locked, password, update});
  }

  _handleChange(uuid, content) {
    const cards = this.state.cards;
    const query = this.state.query;
    var password = password;
    const locked = false;
    const init = false;
    const update = false;
    var index = this.state.index;
    if (!index) { index = {}; }
    if (window.console) { console.debug('[Notes] _handleUpdate:', {cards, init, locked,  password, query, update}); }

    this.setState({cards, init, locked, password, update, index});
  }

  _handleGet(state) {
    const cards_key = 'cards';
    const password = this.state.password;
    const lock = this.state.lock;
    const query = this.state.query;

    chrome.storage.local.get(cards_key, function(result) {
      const cards = result[cards_key];
      if (window.console) { console.debug('[Notes] loading cards:', cards); }
      if (cards != undefined) {
        this.setState({cards, lock, password, query});
      }
    }.bind(this));
  }

  _handleEncrypt(text) {
    if (window.console) { console.debug('[Notes] _handleEncrypt:', this.state.password); }
    const cipher = crypto.createCipher('aes192', this.state.password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    
    const md5 = crypto.createHash('md5');
    var checksum = md5.update(text, 'utf8', 'hex');
    checksum += md5.digest('hex');
    if (window.console) { console.debug('[Notes] Encrypt checksum:', checksum); }

    return crypted;
  }

  _handleDecrypt(crypted) {
    const decipher = crypto.createDecipher('aes192', this.state.password);
    var decrypted = decipher.update(crypted,'hex','utf8');
    decrypted += decipher.final('utf8');

    const md5 = crypto.createHash('md5');
    var checksum = md5.update(decrypted, 'utf8', 'hex');
    checksum += md5.digest('hex');
    if (window.console) { console.debug('[Notes] Decrypt checksum:', checksum); } 

    return decrypted;
  }

  _handleCards(cards) {
    const serialized = cards;
    var data = {};
    data['cards'] = serialized;
    if (window.console) {  console.debug('[Notes] serialized cards:', serialized); }
    chrome.storage.local.set(data, function() {
      if (window.console) { console.debug('[chrome.storage] cards: ', serialized); }
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
    if (window.console) { console.debug('[Notes] note added', cards); }

    // this.setState({cards: this.state.cards.concat([{uuid: uuid, content: default_note_content}])});
    this.setState({cards, lock, password, query}, function () {
      if (window.console) { console.debug('[Notes] updated state', this.state.cards); }
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
      if (window.console) { console.debug('[Notes] updated state', this.state.cards); }
    });
  }

  render() {
    if (window.console) { console.debug('[Notes] rendering'); }
    let cardColumns = null;
    let settingsModal = null;
    if (this.state.locked == true) {
      if (window.console) { console.debug('[Notes] LOCKED'); }
      cardColumns = <div></div>;
      $('#unlockModal').modal('show');
    } else {
      if (window.console) { console.debug('[Notes] OPEN'); }
      cardColumns = <CardColumns
                        cards={this.state.cards}
                        query={this.state.query}
                        update={this.state.update}
                        decrypt={this.decrypt}
                        encrypt={this.encrypt}
                        deleteNote={this.deleteNote} />;
      settingsModal = <SettingsModal unlockNotes={this.updateNotes} />
    }

    return (
      <div>
        <MuiThemeProvider>
          <NavBar addNote={this.addNote} search={this.search} lockNotes={this.lockNotes} lock={this.state.lock} />
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
        { settingsModal }
      </div>
    );
  }
}

export default Notes;
