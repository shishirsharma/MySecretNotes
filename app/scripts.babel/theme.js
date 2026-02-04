'use strict';

import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

// Light theme - Warm Paper
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colors.light.surface,
      paper: colors.light.bg,
    },
    primary: {
      main: colors.light.primary,
      dark: colors.light.primaryDark,
      light: colors.light.primaryLight,
    },
    secondary: {
      main: colors.light.accent,
      light: colors.light.accentLight,
    },
    text: {
      primary: colors.light.textPrimary,
      secondary: colors.light.textSecondary,
      disabled: colors.light.textTertiary,
    },
    divider: colors.light.border,
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body1: {
      color: colors.light.textPrimary,
    },
    body2: {
      color: colors.light.textSecondary,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light.bg,
          color: colors.light.textPrimary,
          boxShadow: colors.light.shadowSm,
          '&:hover': {
            boxShadow: colors.light.shadowMd,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light.bg,
          color: colors.light.textPrimary,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light.appbarBg,
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
          backgroundColor: colors.light.bg,
          color: colors.light.textPrimary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light.appbarBg,
          color: colors.white,
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.light.bg,
          color: colors.light.textPrimary,
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
          backgroundColor: colors.light.bg,
          padding: '16px',
          borderTop: `1px solid ${colors.light.border}`,
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
            color: colors.light.textPrimary,
            backgroundColor: colors.light.inputBg,
            borderColor: colors.light.inputBorder,
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: colors.light.textTertiary,
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
          backgroundColor: colors.light.surface,
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

// Dark theme - Warm & Cozy
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.dark.surface,
      paper: colors.dark.bg,
    },
    primary: {
      main: colors.dark.primary,
      dark: colors.dark.primaryDark,
      light: colors.dark.primaryLight,
    },
    secondary: {
      main: colors.dark.accent,
      light: colors.dark.accentLight,
    },
    text: {
      primary: colors.dark.textPrimary,
      secondary: colors.dark.textSecondary,
      disabled: colors.dark.textTertiary,
    },
    divider: colors.dark.border,
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body1: {
      color: colors.dark.textPrimary,
    },
    body2: {
      color: colors.dark.textSecondary,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.bg,
          color: colors.dark.textPrimary,
          boxShadow: colors.dark.shadowSm,
          '&:hover': {
            boxShadow: colors.dark.shadowMd,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.bg,
          color: colors.dark.textPrimary,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.appbarBg,
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
          backgroundColor: colors.dark.bg,
          color: colors.dark.textPrimary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.appbarBg,
          color: colors.white,
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark.bg,
          color: colors.dark.textPrimary,
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
          backgroundColor: colors.dark.bg,
          padding: '16px',
          borderTop: `1px solid ${colors.dark.border}`,
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
            color: colors.dark.textPrimary,
            backgroundColor: colors.dark.inputBg,
            borderColor: colors.dark.inputBorder,
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: colors.dark.textTertiary,
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
          backgroundColor: colors.dark.surface,
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

export function getTheme(themeName) {
  return themeName === 'dark' ? darkTheme : lightTheme;
}

export { lightTheme, darkTheme };
