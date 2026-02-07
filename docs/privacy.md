---
layout: default
title: Privacy Policy
---

# Privacy Policy

**Last updated:** February 7, 2026

## Overview

My Secret Notes is a browser-based encrypted notes extension. It is designed with privacy as a core principle — your data never leaves your browser.

## Data Collection

My Secret Notes does **not** collect, transmit, or share any personal data. Specifically:

- No analytics or tracking
- No network requests to external servers
- No user accounts or registration
- No cookies

## Data Storage

All data is stored locally on your device using Chrome's `chrome.storage.local` API:

- **Encrypted notes** — your notes are encrypted with AES-192 before being stored
- **App settings** — theme preference and first-run state
- **Password** — your password is never stored. It is used only at runtime to derive the encryption key

This data never leaves your browser and is not accessible to us or any third party.

## Permissions

The extension requests the following browser permissions:

| Permission | Purpose |
|---|---|
| **storage** | Save encrypted notes and settings locally |
| **unlimitedStorage** | Allow notes to grow beyond default storage quotas |
| **tabs** | Check if the extension tab is already open to avoid duplicates |

These permissions are used solely for the functionality described above. No browsing history, web traffic, or personal information is accessed.

## Remote Code

This extension does not load or execute any remotely hosted code. All code is bundled locally within the extension.

## Third Parties

No data is shared with third parties. There are no third-party services, SDKs, or integrations.

## Open Source

The source code is publicly available at [github.com/shishirsharma/MySecretNotes](https://github.com/shishirsharma/MySecretNotes) for inspection.

## Changes

If this policy changes, the updated version will be posted at this URL with a revised date.

## Contact

If you have questions about this policy, please open an issue on the [GitHub repository](https://github.com/shishirsharma/MySecretNotes/issues).
