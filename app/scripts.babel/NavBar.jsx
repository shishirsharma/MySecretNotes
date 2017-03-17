'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {
        title: {
          cursor: 'pointer',
          },
          navButton: {
            fontSize: 18,
            },
          }
        }
      }

  handleAddNote(e) {
    this.props.addNote(e);
  }

  
  render() {
    return(
      <AppBar
      title= {
        <span style={this.state.styles.title}>My Secret Notes</span>
      }
      iconClassNameLeft={'fa fa-book'}
      iconElementRight={
        <div>
        <FlatButton label="New Note" onClick={this.handleAddNote.bind(this)} />
        <IconButton iconClassName="fa fa-cog" iconStyle={this.state.styles.navButton} data-toggle="modal" data-target="#credentialModal" />
        <IconButton iconClassName="fa fa-question" iconStyle={this.state.styles.navButton} data-toggle="modal" data-target="#helpModal" />
        </div>
      }/>        
    )

  }
}