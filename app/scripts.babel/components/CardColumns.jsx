'use strict';

import React from 'react';
import RichEditor from 'components/RichEditor';
import Grid from '@mui/material/Grid';

class Card extends React.Component {
  constructor(props) {
    if (window.console) { console.debug('[cardcolumns] constructor'); }
    super(props);
    this.state = {init: true, content: props.content};
  }

  render() {
    if (window.console) { console.debug('[Card] render:', this.props.uuid, this.state); }
    return (
      <RichEditor
          decrypt={this.props.decrypt}
          encrypt={this.props.encrypt}
          content={this.props.content}
          update={this.props.update}
          query={this.props.query}
          uuid={this.props.uuid}
          deleteNote={this.props.deleteNote}
          isFocused={this.props.isFocused}
          onFocusCard={this.props.onFocusCard} />
    );
  }
}

class CardColumns extends React.Component {
  constructor(props) {
    if (window.console) { console.debug('[cardcolumns] constructor'); }
    super(props);
    this.state = { focusedCard: null };
    this.handleFocus = (uuid) => this.setState({ focusedCard: uuid });
    this.handleBlur = () => this.setState({ focusedCard: null });
    this.handleDeleteNote = (uuid) => {
      if (this.state.focusedCard === uuid) this.setState({ focusedCard: null });
      this.props.deleteNote(uuid);
    };
    this.handleKeyDown = (e) => {
      if (e.key === 'Escape' && this.state.focusedCard) this.handleBlur();
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    var cards = this.props.cards;
    if (window.console) { console.debug('[cardcolumns] render', cards); }
    var cardItems = cards.map(function (card) {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={card.uuid}>
          <Card
              uuid={card.uuid}
              query={this.props.query}
              update={this.props.update}
              content={card.content}
              decrypt={this.props.decrypt}
              encrypt={this.props.encrypt}
              deleteNote={this.handleDeleteNote}
              isFocused={this.state.focusedCard === card.uuid}
              onFocusCard={this.handleFocus} />
        </Grid>
      );
    }, this);
    return (
      <>
        <Grid container spacing={3} sx={{mb: 2}}>
          {cardItems}
        </Grid>
        {this.state.focusedCard && (
          <div className="note-backdrop" onClick={this.handleBlur} />
        )}
      </>
    );
  }
}

export default CardColumns;
