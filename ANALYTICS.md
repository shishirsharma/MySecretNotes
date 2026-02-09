# Google Analytics Setup

Google Analytics 4 is now integrated with your Chrome extension (Property ID: `G-RTHS9HY3KZ`).

## How to Track Events

Import the analytics utility in any React component:

```javascript
import analytics from 'utils/analytics';
```

### Track a Custom Event

```javascript
analytics.track('note_created', {
  note_length: 100,
  has_formatting: true
});
```

### Track Feature Usage

```javascript
analytics.trackFeature('dark_mode_toggle');
analytics.trackFeature('keyboard_shortcut_used');
```

### Track User Actions

```javascript
analytics.trackAction('delete_note', 'notes', 'permanent_delete', 1);
// Parameters: action, category, label, value
```

### Track Errors

```javascript
analytics.trackError('Failed to save note', 'save_handler');
```

### Examples for Your App

**In Notes.jsx or NoteItem.jsx:**
```javascript
// When user creates a note
analytics.trackFeature('create_note');

// When user deletes a note
analytics.trackAction('delete', 'notes', 'user_initiated');

// When user exports notes
analytics.trackFeature('export_notes');
```

**In theme switcher:**
```javascript
// When user changes theme
analytics.track('theme_changed', {
  theme: 'dark',
  previous_theme: 'light'
});
```

**In keyboard shortcuts:**
```javascript
// When user uses a keyboard shortcut
analytics.track('keyboard_shortcut_used', {
  shortcut: 'ctrl+s',
  action: 'save_note'
});
```

## Built-in Events

These are automatically tracked:
- `extension_opened` - When the extension popup opens (tracks if it's first run)

## Notes

- All tracking respects user privacy - no personal note content is sent to Google
- Tracking is automatic; users can opt out via Google Analytics settings
- Events appear in your Google Analytics dashboard under "Events"
