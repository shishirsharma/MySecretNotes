'use strict';

const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MEASUREMENT_ID = "G-RTHS9HY3KZ";
const API_SECRET = "nZp9i8K-R82qX5vL7mN4Pw";

chrome.runtime.onInstalled.addListener(details => {
  if(details.reason == 'install') {
    chrome.storage.local.set({'first_run': true}, function() {
    });
  }
});

chrome.action.onClicked.addListener(function() {
  chrome.tabs.query({url: chrome.runtime.getURL('index.html')}, function(tabs) {
    if ( tabs.length > 0 ) {
      chrome.tabs.update(tabs[0].id,{'active':true});
    } else {
      chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
    }
  });
});

// Get or create a persistent client ID for analytics
function getClientId(callback) {
  chrome.storage.local.get('ga_client_id', (result) => {
    let clientId = result.ga_client_id;
    if (!clientId) {
      clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
      chrome.storage.local.set({ ga_client_id: clientId });
    }
    callback(clientId);
  });
}

// Handle analytics events from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ANALYTICS_EVENT') {
    getClientId((clientId) => {
      const payload = {
        client_id: clientId,
        timestamp_micros: Date.now() * 1000,
        user_properties: {
          extension_version: {
            value: '0.1.0'
          }
        },
        events: [
          {
            name: request.eventName,
            params: request.eventParams
          }
        ]
      };

      fetch(`${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      }).catch(error => {
        console.debug('[Analytics] Failed to send event:', error);
      });

      sendResponse({ success: true });
    });
    return true; // Indicate that we'll call sendResponse asynchronously
  }
});
