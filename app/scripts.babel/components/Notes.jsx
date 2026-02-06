'use strict';

import React from 'react';
import crypto from 'crypto';
import { ThemeProvider } from '@mui/material/styles';

import generateUUID from 'utils';
import { getTheme } from '../theme';
import NavBar from 'components/NavBar';
import CardColumns from 'components/CardColumns';
import HelpModal from 'components/HelpModal';
import UnlockModal from 'components/UnlockModal';
import SettingsModal from 'components/SettingsModal';
import WelcomeModal from 'components/WelcomeModal';
import Container from '@mui/material/Container';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    if (window.console) { console.debug('[Notes] constructor: ', props); }

    var cards = [];
    var password = '';
    var query = '';
    var init = true;
    var locked = true;
    var first_run = this.props.first_run;
    var currentTheme = localStorage.getItem('theme') || 'light';

    this.state = {cards, password, query, init, locked, first_run, currentTheme, showUnlock: false, showSettings: false, showHelp: false, showWelcome: first_run};

    this.addNote = (e) => {
      e.preventDefault();
      this._handleAddNote()
    }

    this.search = (query) => {
      var state = Object.assign({}, this.state);
      state.query = query;
      if (window.console) { console.debug('[Notes] search: ', state); }
      this.setState(state);
    }

    this.unlockNotes = (password) => {
      if (window.console) { console.debug('[Notes] unlocking:', password); }
      this._handleUnlock(password)
    }

    this.lockNotes = (e) => {
      e.preventDefault();
      if (window.console) { console.debug('[Notes] locking'); }
      this._handleLock(false)
    }

    this.updateNotes = (password) => {
      if (window.console) { console.debug('[Notes] updating:', password); }
      this._handleUpdate(password)
    }

    this.deleteNote = (uuid) => {
      if (window.console) { console.debug('[Notes] removing', uuid); }
      this._handleDeleteNote(uuid);
    }

    this.updateNoteTimestamp = (uuid) => {
      if (window.console) { console.debug('[Notes] updating timestamp for', uuid); }
      this._handleUpdateTimestamp(uuid);
    }

    this.closeWelcome = () => {
      this.setState({showWelcome: false});
      // Delay showing settings modal until after welcome modal closes
      setTimeout(() => {
        this.setState({showSettings: true});
      }, 300);
    }

    this.updateTheme = (theme) => {
      if (window.console) { console.debug('[Notes] updating theme:', theme); }
      this.setState({ currentTheme: theme });
    }

    this.encrypt = (text) => {
      if (window.console) { console.debug('[Notes] encrypt', text); }
      return this._handleEncrypt(text);
    }

    this.decrypt = (crypted) => {
      return this._handleDecrypt(crypted);
    }
  }

  componentDidMount() {
    if (window.console) { console.debug('[Notes] componentDidMount:', this.state); }

    if (this.state.first_run == true) {
      // Show welcome modal first on first run
      this.setState({showWelcome: true});
    } else if(this.state.init === true) {
      this._handleGet(this.state)
      this.setState({showUnlock: true});
    } else if (this.state.locked == true) {
      this.setState({showUnlock: true});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (window.console) { console.debug('[Notes] componentDidUpdate:', this.state); }
    if (this.state.locked == true && !this.state.showUnlock) {
      this.setState({showUnlock: true});
    }
  }

  _handleLock(invalid_key) {
    if (window.console) { console.debug('[Notes] _handlelock:', this.state); }
    if (this.state.locked != true) {
      var state = Object.assign({}, this.state);
      state.locked = true;
      state.query = '';
      state.password = '';
      state.invalid_key = invalid_key;
      if (window.console) { console.debug('[Notes] trigger lock'); }
      this.setState(state);
    }
  }

  _handleUnlock(password) {
    var state = Object.assign({}, this.state);
    state.password = password;
    state.locked = false;
    state.init = false;
    state.showUnlock = false;
    if (window.console) { console.debug('[Notes] _handleUnlock:', state); }
    this.setState(state);
  }

  _handleUpdate(password) {
    var state = Object.assign({}, this.state);
    state.password = password;
    state.locked = false;
    state.init = false;
    state.showSettings = false;
    if (this.state.init) {
      state.first_run = false;
      state.update = false;
      state.init = false;
    } else if (this.state.init) {
      state.update = false;
      state.init = false;
    } else {
      state.update = true;
    }
    if (window.console) { console.debug('[Notes] _handleUpdate:', state); }
    this.setState(state);
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
    var state = Object.assign({}, this.state);
    if (window.console) { console.debug('[Notes] loading cards'); }
    chrome.storage.local.get(cards_key, function(result) {
      state.cards = result[cards_key];
      if (state.cards != undefined) {
        // Migrate old cards without timestamps
        let needsMigration = false;
        state.cards = state.cards.map((card, index) => {
          if (!card.created || !card.modified) {
            needsMigration = true;
            // Assign timestamps based on array position (older cards get older timestamps)
            const baseTime = Date.now() - (state.cards.length - index) * 1000;
            return {
              ...card,
              created: card.created || baseTime,
              modified: card.modified || baseTime
            };
          }
          return card;
        });

        if (needsMigration) {
          this._handleCards(state.cards);
        }

        this.setState(state, function() {
          if (window.console) { console.debug('[chrome.storage] loading cards: ', state.cards); }
        });
      }
    }.bind(this));
  }

  _handleEncrypt(text) {
    if (window.console) { console.debug('[Notes] _handleEncrypt:', this.state.password); }
    const cipher = crypto.createCipher('aes192', this.state.password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');

    var  md5 = crypto.createHash('md5');
    md5.update(text, 'utf8');
    var checksum = md5.digest('hex');
    if (window.console) { console.debug('[Notes] Encrypt checksum:', checksum); }

    return crypted+checksum;
  }

  _handleDecrypt(blob) {
    var crypted = blob.slice(0,-32);
    var validsum = blob.slice(-32);
    const decipher = crypto.createDecipher('aes192', this.state.password);
    var decrypted = decipher.update(crypted,'hex','utf8');
    decrypted += decipher.final('utf8');

    const md5 = crypto.createHash('md5');
    md5.update(decrypted, 'utf8');
    var checksum = md5.digest('hex');
    if (window.console) { console.debug('[Notes] Valid decrypt:', checksum==validsum, ' checksum:', checksum, ' validsum', validsum); }
    if(checksum != validsum) {
      if (window.console) { console.debug('[Notes] locking notes:'); }
      this._handleLock(true);
      return false;
    }

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
    var state = Object.assign({}, this.state);
    var uuid = generateUUID();
    const now = Date.now();
    state.cards = [{uuid: uuid, created: now, modified: now}].concat(state.cards);
    if (window.console) { console.debug('[Notes] note added', state.cards); }
    this._handleCards(state.cards);
    this.setState(state, function () {
      if (window.console) { console.debug('[Notes] updated state', this.state); }
    });
  }

  _handleDeleteNote(uuid) {
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

  _handleUpdateTimestamp(uuid) {
    const cards = this.state.cards.map(card => {
      if (card.uuid === uuid) {
        return { ...card, modified: Date.now() };
      }
      return card;
    });
    this._handleCards(cards);
    this.setState({ cards });
  }

  render() {
    if (window.console) { console.debug('[Notes] rendering'); }
    let cardColumns = null;
    let settingsModal = null;
    if (this.state.first_run == true) {
      if (window.console) { console.debug('[Notes] INIT'); }
      cardColumns = <div></div>;
      settingsModal = <SettingsModal open={this.state.showSettings} onClose={() => this.setState({showSettings: false})} updateNotes={this.updateNotes} init={this.state.init} />
    } else if (this.state.locked == true) {
      if (window.console) { console.debug('[Notes] LOCKED'); }
      cardColumns = <div></div>;
    } else {
      if (window.console) { console.debug('[Notes] OPEN'); }
      cardColumns = <CardColumns
                        cards={this.state.cards}
                        query={this.state.query}
                        update={this.state.update}
                        decrypt={this.decrypt}
                        encrypt={this.encrypt}
                        deleteNote={this.deleteNote}
                        updateNoteTimestamp={this.updateNoteTimestamp} />;
      settingsModal = <SettingsModal open={this.state.showSettings} onClose={() => this.setState({showSettings: false})} updateNotes={this.updateNotes} />
    }

    const theme = getTheme(this.state.currentTheme);

    return (
      <ThemeProvider theme={theme}>
        <div>
          <NavBar addNote={this.addNote} search={this.search} lockNotes={this.lockNotes} lock={this.state.lock} openSettings={() => this.setState({showSettings: true})} openHelp={() => this.setState({showHelp: true})} onThemeChange={this.updateTheme} />
          <Container
            maxWidth={false}
          >
            {cardColumns}
          </Container>
          <HelpModal open={this.state.showHelp} onClose={() => this.setState({showHelp: false})} />
          <UnlockModal open={this.state.showUnlock} onClose={() => this.setState({showUnlock: false})} unlockNotes={this.unlockNotes} invalid_key={this.state.invalid_key}/>
          {this.state.showWelcome && <WelcomeModal open={true} onClose={this.closeWelcome} />}
          {this.state.showSettings && settingsModal}
        </div>
      </ThemeProvider>
    );
  }
}

export default Notes;
