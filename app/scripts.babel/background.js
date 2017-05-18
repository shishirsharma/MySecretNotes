'use strict';

chrome.runtime.onInstalled.addListener(details => {
  if(details.reason == 'install') {
    chrome.storage.local.set({'first_run': true}, function() {
    });
  }
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({url: chrome.extension.getURL('index.html')}, function(tabs) {
    if ( tabs.length > 0 ) {
      chrome.tabs.update(tabs[0].id,{'active':true});
    } else {
      chrome.tabs.create({url: chrome.extension.getURL('index.html')});
    }
  });
});
