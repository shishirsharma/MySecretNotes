'use strict';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BookIcon from '@mui/icons-material/Book';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = (event) => {
      if (window.console) { console.log('[SearchBar] change handled:'); }
      this.setState({
        value: event.target.value
      });
      this.props.search(event.target.value)
    };
  }

  render() {
    return (
      <div>
        <div className="react-autosuggest__container">
          <input type="text" role="combobox" aria-autocomplete="list" aria-owns="react-autowhatever-1" aria-expanded="false" aria-haspopup="false" className="react-autosuggest__input" placeholder="Search within notes..." onChange={this.onChange}/>
        </div>
      </div>
    );
  }
}

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddNote(e) {
    this.props.addNote(e);
  }

  handleLockNotes(e) {
    if (window.console) { console.log('[NavBar] lockNotes'); }
    this.props.lockNotes(e);
  }

  render() {
    return(
      <AppBar position="static" className="navbar-main">
        <Toolbar>
          <IconButton color="inherit" sx={{mr: 1}}>
            <BookIcon />
          </IconButton>
          <span className="app-title">My Secret Notes</span>
          <SearchBar search={this.props.search} />
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
            <Button color="inherit" onClick={this.handleAddNote.bind(this)}>New Note</Button>
            <IconButton color="inherit" onClick={this.handleLockNotes.bind(this)}>
              <LockIcon />
            </IconButton>
            <IconButton color="inherit" onClick={this.props.openSettings}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={this.props.openHelp}>
              <HelpIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
