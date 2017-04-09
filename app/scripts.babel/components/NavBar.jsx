'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Autosuggest from 'react-autosuggest';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class SearchBar extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    this.onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    this.onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  }



  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search within notes...',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div>
      <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
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
      <div><span className="app-title" style={this.state.styles.title}>My Secret Notes</span><SearchBar /></div>
    )
  }

  _iconElementRight() {
    return(
      <div>
        <FlatButton label="New Note" onClick={this.handleAddNote.bind(this)} />
        <IconButton iconClassName="fa fa-lock" iconStyle={this.state.styles.navButton} data-toggle="modal" data-target="#unlockModal" />
        <IconButton iconClassName="fa fa-share-square-o" iconStyle={this.state.styles.navButton} />
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
