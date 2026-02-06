'use strict';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LockIcon from '@mui/icons-material/Lock';

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
    this.state = {
      anchorEl: null,
      currentTheme: localStorage.getItem('theme') || 'light'
    };
  }

  componentDidMount() {
    // Apply saved theme on mount
    document.documentElement.setAttribute('data-theme', this.state.currentTheme);
  }

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  handleAddNote(e) {
    this.props.addNote(e);
  }

  handleLockNotes = (e) => {
    if (window.console) { console.log('[NavBar] lockNotes'); }
    this.handleMenuClose();
    this.props.lockNotes(e);
  }

  setTheme = (theme) => {
    this.setState({ currentTheme: theme });
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Notify parent component (Notes) of theme change
    if (this.props.onThemeChange) {
      this.props.onThemeChange(theme);
    }
  }

  handleThemeToggle = () => {
    const newTheme = this.state.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.handleMenuClose();
  }

  handleOpenSettings = () => {
    this.handleMenuClose();
    this.props.openSettings();
  }

  handleOpenHelp = () => {
    this.handleMenuClose();
    this.props.openHelp();
  }

  render() {
    const isMenuOpen = Boolean(this.state.anchorEl);

    return(
      <AppBar position="static" className="navbar-main">
        <Toolbar sx={{py: 1.5, px: 2}}>
          <IconButton color="inherit" sx={{mr: 1.5, '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}}}>
            <BookIcon />
          </IconButton>
          <span className="app-title">My Secret Notes</span>
          <SearchBar search={this.props.search} />
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Button
              color="inherit"
              onClick={this.handleAddNote.bind(this)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '14px',
                px: 2,
                py: 1,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderRadius: '4px'
                },
                transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              New Note
            </Button>
            <IconButton
              color="inherit"
              onClick={this.handleMenuOpen}
              title="More options"
              sx={{'&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}}}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              anchorEl={this.state.anchorEl}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
              anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
              transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
              <MenuItem onClick={this.handleThemeToggle}>
                <ListItemIcon>
                  {this.state.currentTheme === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </ListItemIcon>
                <ListItemText>
                  {this.state.currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={this.handleLockNotes}>
                <ListItemIcon>
                  <LockIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Lock Notes</ListItemText>
              </MenuItem>
              <MenuItem onClick={this.handleOpenSettings}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Change Passkey</ListItemText>
              </MenuItem>
              <MenuItem onClick={this.handleOpenHelp}>
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Help</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
