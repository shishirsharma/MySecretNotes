// Google Analytics utility for tracking events
// Usage: analytics.track('event_name', { param: 'value' })

const analytics = {
  // Track custom events
  track: (eventName, eventData = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventData);
    }
  },

  // Track page view
  pageView: (pageName) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
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
