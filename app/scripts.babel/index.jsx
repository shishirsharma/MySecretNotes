'use strict';

import crypto from 'crypto';

import React from 'react';
import ReactDOM from 'react-dom';

import Notes from 'components/Notes';

ReactDOM.render(
    <Notes
        password='password'
        first_run={!localStorage['__first_run__']} />,
    document.getElementById('main-table')
);

localStorage['__first_run__'] = true;
