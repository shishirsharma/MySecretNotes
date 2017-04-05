'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class AutoCompleteExampleSimple extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dataSource: ['a'] };

    this.handleUpdateInput = (value) => {
      this.setState({
        dataSource: [
          value,
          value + value,
          value + value + value,
        ],
      });
    };

  }


  render() {
    return (
      <div>
        <AutoComplete
            hintText="Type anything"
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Full width"
            fullWidth={true}
        />
      </div>
    );
  }
}


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

  handleLockNotes(e) {
    this.props.addNote(e);
  }

  handleLockNotes(e) {
    this.props.addNote(e);
  }

  _title() {
    return (
      <div><span style={this.state.styles.title}>My Secret Notes</span><AutoCompleteExampleSimple /></div>
    )
  }

  _iconElementRight() {
    return(
      <div>
        <FlatButton label="New Note" onClick={this.handleAddNote.bind(this)} />
        <IconButton iconClassName="fa fa-lock" iconStyle={this.state.styles.navButton} data-toggle="modal" data-target="#unlockModal" />
        <IconButton iconClassName="fa fa-question" iconStyle={this.state.styles.navButton} data-toggle="modal" data-target="#helpModal" />
      </div>
    )
  }

  render() {
    return(
      <AppBar
          title={this._title()}
          iconClassNameLeft={'fa fa-book'}
          iconElementRight={this._iconElementRight()} />
    )
  }
}
