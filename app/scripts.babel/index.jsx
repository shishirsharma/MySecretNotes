'use strict';

/* import React from 'react';
 * import ReactDOM from 'react-dom';*/

/* ReactDOM.render(
 *         <h1>Hello, world!</h1>,
 *     document.getElementById('main-table')
 * );*/

var editor = new MediumEditor('.editable');

function formatDate(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name} />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}


function Card(props) {
    return (
        <div className="card">
            <div className="card-block">
                <h4 className="card-title editable">{props.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted editable">{props.subtitle}</h6>
                <p className="card-text editable">{props.para}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    );
}

function CardColumns(props) {
    var cards = props.cards;
    var cardItems = cards.map(function (card) {
				return (
					  <Card
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                para={card.para}
            />
				);
		}, this);

    return (
        <div className="card-columns">
            {cardItems}
        </div>
    );
}

function Notes(props) {
    return (
        <div className="notes">
            <CardColumns cards={props.cards}/>
        </div>
    );
}
  

const cards = [
    {title:'Vishu', subtitle:'This is my first notes', para:'This is a para. and again a para and para para.'},
    {title:'Shishir', subtitle:'Subtitle', para:'This is a para'},
    {title:'Title3', subtitle:'Subtitle', para:'This is a para'},
    {title:'Title4', subtitle:'Subtitle', para:'This is a para'}
];
 
ReactDOM.render(
    <Notes
        cards={cards} />,
    document.getElementById('main-table')
); 
