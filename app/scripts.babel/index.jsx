'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';

import '../styles.scss/main.scss';
import Notes from 'components/Notes';

const root = createRoot(document.getElementById('main-table'));
root.render(
    <Notes
        first_run={!localStorage['__first_run__']} />
);

localStorage['__first_run__'] = true;
