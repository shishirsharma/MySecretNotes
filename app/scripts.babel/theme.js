'use strict';

import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

/**
 * Factory function to create a theme from a color palette
 * @param {Object} palette - Color palette (colors.light or colors.dark)
 * @returns {Object} MUI theme object
 */
function createCustomTheme(palette) {
  return createTheme({
    palette: {
      mode: palette === colors.light ? 'light' : 'dark',
      background: {
        default: palette.surface,
        paper: palette.bg,
      },
      primary: {
        main: palette.primary,
        dark: palette.primaryDark,
        light: palette.primaryLight,
      },
      secondary: {
        main: palette.accent,
        light: palette.accentLight,
      },
      text: {
        primary: palette.textPrimary,
        secondary: palette.textSecondary,
        disabled: palette.textTertiary,
      },
      divider: palette.border,
    },
    typography: {
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body1: {
        color: palette.textPrimary,
      },
      body2: {
        color: palette.textSecondary,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: palette.cardGradient,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg,
            color: palette.textPrimary,
            boxShadow: palette.shadowSm,
            border: `1px solid ${palette.border}`,
            borderRadius: '8px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: palette.accent,
              opacity: 1,
            },
            '&:hover': {
              boxShadow: palette.shadowMd,
              borderColor: palette.primary,
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg,
            color: palette.textPrimary,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.appbarBg,
            color: colors.white,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: colors.white,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colors.white,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.bg,
            color: palette.textPrimary,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: palette.appbarBg,
            color: colors.white,
            fontWeight: 600,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg,
            color: palette.textPrimary,
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: palette.bg,
            padding: '16px',
            borderTop: `1px solid ${palette.border}`,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              color: palette.textPrimary,
              backgroundColor: palette.inputBg,
              borderColor: palette.inputBorder,
            },
            '& .MuiOutlinedInput-input::placeholder': {
              color: palette.textTertiary,
              opacity: 1,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            marginBottom: '16px',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: palette.surface,
            paddingTop: '32px',
            paddingBottom: '32px',
            paddingLeft: '8px',
            paddingRight: '8px',
            minHeight: 'calc(100vh - 64px)',
            transition: 'background-color 300ms ease',
            '@media (min-width: 600px)': {
              paddingLeft: '16px',
              paddingRight: '16px',
            },
            '@media (min-width: 960px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
        },
      },
    },
  });
}

// Create theme instances
const lightTheme = createCustomTheme(colors.light);
const darkTheme = createCustomTheme(colors.dark);

export function getTheme(themeName) {
  return themeName === 'dark' ? darkTheme : lightTheme;
}

export { lightTheme, darkTheme };
