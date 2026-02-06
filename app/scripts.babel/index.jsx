'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';

import '../styles.scss/main.scss';
import Notes from 'components/Notes';

const root = createRoot(document.getElementById('main-table'));

// Check if this is first run by looking at stored flag
chrome.storage.local.get('__first_run__', function(result) {
  const first_run = !result['__first_run__'];

  root.render(
    <Notes first_run={first_run} />
  );

  // Mark that the app has run once
  chrome.storage.local.set({ '__first_run__': true });
});
