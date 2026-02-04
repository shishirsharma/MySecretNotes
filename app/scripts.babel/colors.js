'use strict';

/**
 * Unified Color System for MySecretNotes
 *
 * This file defines all colors used in both the MUI theme (theme.js) and CSS variables (main.scss).
 * Keep these in sync with the CSS variables defined in app/styles.scss/main.scss
 */

export const colors = {
  // Light Theme - "Warm Paper"
  light: {
    // Backgrounds
    surface: '#f5f0e8',    // Page background
    bg: '#ffffff',         // Card background

    // Text
    textPrimary: '#2a2520',
    textSecondary: '#6b6258',
    textTertiary: '#9a9088',

    // Semantic
    border: '#e5e0d8',
    borderLight: '#f0ebe3',

    // Brand
    primary: '#4a6cf7',
    primaryDark: '#3a55d0',
    primaryLight: '#e8ecfd',
    accent: '#c96b3f',
    accentLight: '#f5e5d9',

    // Status
    danger: '#d84a3e',
    dangerLight: '#fde8e5',

    // Components
    inputBg: '#ffffff',
    inputBorder: '#d9cfc4',
    codeBg: 'rgba(74, 108, 247, 0.07)',
    appbarBg: '#2c2c2e',

    // Shadows
    shadowSm: '0 1px 2px rgba(90, 70, 50, 0.05)',
    shadowMd: '0 4px 6px rgba(90, 70, 50, 0.07)',
    shadowLg: '0 10px 15px rgba(90, 70, 50, 0.1)',
  },

  // Dark Theme - "Warm & Cozy"
  dark: {
    // Backgrounds
    surface: '#1e1b17',    // Page background
    bg: '#2a2520',         // Card background

    // Text
    textPrimary: '#ede9e3',
    textSecondary: '#c4bfb5',
    textTertiary: '#8a8480',

    // Semantic
    border: '#3a3630',
    borderLight: '#2d2a26',

    // Brand
    primary: '#7b8ff0',
    primaryDark: '#5a6ed0',
    primaryLight: '#2a3560',
    accent: '#d98a6a',
    accentLight: '#5a4535',

    // Status
    danger: '#f08a7e',
    dangerLight: '#5a2a22',

    // Components
    inputBg: '#1e1b17',
    inputBorder: '#3a3630',
    codeBg: 'rgba(237, 233, 227, 0.08)',
    appbarBg: '#191715',

    // Shadows
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    shadowMd: '0 4px 6px rgba(0, 0, 0, 0.4)',
    shadowLg: '0 10px 15px rgba(0, 0, 0, 0.5)',
  },

  // Neutral colors (used in both themes)
  white: '#ffffff',
};

export default colors;
