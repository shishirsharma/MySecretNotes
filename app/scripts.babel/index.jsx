'use strict';

import crypto from 'crypto';

import React from 'react';
import ReactDOM from 'react-dom';

import Notes from 'components/Notes';


const cards = [
    {
        uuid: '4aca821c-2676-4015-a6e4-48f42a003c39'
    },
    {
        uuid:'646d2de3-8103-47c4-b604-48229eb87fe8'
    },
    {
        uuid:'0c163d83-2f79-4838-bd48-15f9247ba476'
    }
];





ReactDOM.render(
    <Notes
        cards={cards} />,
    document.getElementById('main-table')
);
