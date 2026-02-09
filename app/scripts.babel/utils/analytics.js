// Google Analytics utility using Measurement Protocol
// Sends events via the background service worker (bypasses CORS)
// Privacy-friendly: you control exactly what data is sent

// Generate or retrieve a session ID for this extension session
function getSessionId() {
  let sessionId = sessionStorage.getItem('ga_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('ga_session_id', sessionId);
  }
  return sessionId;
}

// Send event to Google Analytics via background service worker
function sendToGA(eventName, eventParams = {}) {
  chrome.runtime.sendMessage({
    type: 'ANALYTICS_EVENT',
    eventName: eventName,
    eventParams: {
      session_id: getSessionId(),
      engagement_time_msec: '100',
      ...eventParams
    }
  }).catch(error => {
    // Silently fail - don't disrupt the app if analytics fails
    if (window.console) {
      console.debug('[Analytics] Failed to send message to background:', error);
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
