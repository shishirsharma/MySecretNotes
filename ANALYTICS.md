# Google Analytics Setup

Google Analytics 4 is now integrated with your Chrome extension (Property ID: `G-RTHS9HY3KZ`).

## Privacy-Preserving Note Tracking

Each note is assigned a random `tracking_id` (format: `track_XXXXXXXXXXXX`) instead of using the actual note UUID. This allows you to:
- **Correlate events** for the same note (creation → edits → deletion)
- **Preserve user privacy** - no actual note identifiers are sent to Google
- **Maintain anonymity** - tracking IDs are random and rotated per note

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

### Examples for Tracking with Note ID

If you add more note-related features, include the `tracking_id` for correlation:

```javascript
// Track a custom note action
analytics.track('note_exported', {
  tracking_id: noteTrackingId,
  format: 'markdown'
});

// Track note sharing
analytics.track('note_shared', {
  tracking_id: noteTrackingId,
  share_method: 'email'
});
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

These are automatically tracked with `tracking_id` for correlation:
- `extension_opened` - When the extension popup opens (tracks if it's first run)
- `note_created` - When user creates a new note (includes `tracking_id`)
- `note_deleted` - When user deletes a note (includes `tracking_id`)
- `note_edited` - When user edits note content (debounced to once per 5 minutes of editing, includes `tracking_id`)

## Notes

- All tracking respects user privacy - no personal note content is sent to Google
- Tracking is automatic; users can opt out via Google Analytics settings
- Events appear in your Google Analytics dashboard under "Events"
