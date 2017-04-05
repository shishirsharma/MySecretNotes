'use strict';

import React from 'react';
import RichEditor from 'components/RichEditor';

class Card extends React.Component {
    constructor(props) {
        if (window.console) { console.log('[cardcolumns] constructor'); }
        super(props);
        this.state = {init: true, content: props.content};
    }
    render() {
        if (window.console) { console.log('[Card] render:', this.props.uuid, this.state); }

        return (
            <div className="card">
                <div className="card-block">
                    <RichEditor
                        decrypt={this.props.decrypt}
                        encrypt={this.props.encrypt}
                        content={this.props.content}
                        uuid={this.props.uuid}
                        deleteNote={this.props.deleteNote} />
                </div>
            </div>
        );
    }
}

class CardColumns extends React.Component {
    constructor(props) {
        if (window.console) { console.log('[cardcolumns] constructor'); }
        super(props);
    }
    render() {
        var cards = this.props.cards;
        if (window.console) { console.log('[cardcolumns] render', cards); }
        var cardItems = cards.map(function (card) {
            return (
                <Card
                    key={card.uuid}
                    uuid={card.uuid}
                    content={card.content}
                    decrypt={this.props.decrypt}
                    encrypt={this.props.encrypt}
                    deleteNote={this.props.deleteNote} />
            );
        }, this);
        return (
            <div className="card-columns">
                {cardItems}
            </div>
        );
    }
}

export default CardColumns;
