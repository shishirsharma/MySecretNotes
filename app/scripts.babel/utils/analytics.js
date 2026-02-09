// Google Analytics utility using Measurement Protocol
// No external scripts needed - sends data via HTTPS POST to Google Analytics
// Privacy-friendly: you control exactly what data is sent

const MEASUREMENT_ID = 'G-RTHS9HY3KZ';
const API_SECRET = 'nZp9i8K-R82qX5vL7mN4Pw'; // Generate from GA4 > Admin > Data Streams > Measurement Protocol

// Generate or retrieve a session ID for this extension session
function getSessionId() {
  let sessionId = sessionStorage.getItem('ga_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('ga_session_id', sessionId);
  }
  return sessionId;
}

// Generate or retrieve a client ID (persisted across sessions)
function getClientId() {
  let clientId = localStorage.getItem('ga_client_id');
  if (!clientId) {
    clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
    localStorage.setItem('ga_client_id', clientId);
  }
  return clientId;
}

// Send event to Google Analytics via Measurement Protocol
function sendToGA(eventName, eventParams = {}) {
  const payload = {
    client_id: getClientId(),
    user_id: undefined, // We don't track user IDs for privacy
    timestamp_micros: Date.now() * 1000,
    user_properties: {
      extension_version: {
        value: '0.1.0'
      }
    },
    events: [
      {
        name: eventName,
        params: {
          session_id: getSessionId(),
          engagement_time_msec: '100',
          ...eventParams
        }
      }
    ]
  };

  // Send via fetch to GA4 Measurement Protocol endpoint
  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(error => {
    // Silently fail - don't disrupt the app if analytics fails
    if (window.console) {
      console.debug('[Analytics] Failed to send event:', error);
    }
  });
}

const analytics = {
  // Track custom events
  track: (eventName, eventData = {}) => {
    sendToGA(eventName, eventData);
  },

  // Track page view
  pageView: (pageName) => {
    sendToGA('page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  },

  // Track user action with custom parameters
  trackAction: (action, category, label = '', value = null) => {
    const eventData = {
      action,
      category,
      label
    };
    if (value !== null) {
      eventData.value = value;
    }
    analytics.track('user_action', eventData);
  },

  // Track feature usage
  trackFeature: (featureName) => {
    analytics.track('feature_used', {
      feature: featureName
    });
  },

  // Track errors
  trackError: (errorMessage, source = 'unknown') => {
    analytics.track('error', {
      error_message: errorMessage,
      source
    });
  }
};

export default analytics;
