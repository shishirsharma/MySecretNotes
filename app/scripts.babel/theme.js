'use strict';

import { createTheme } from '@mui/material/styles';

// Light theme - Warm Paper
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f0e8',
      paper: '#ffffff',
    },
    primary: {
      main: '#4a6cf7',
      dark: '#3a55d0',
      light: '#e8ecfd',
    },
    secondary: {
      main: '#c96b3f',
      light: '#f5e5d9',
    },
    text: {
      primary: '#2a2520',
      secondary: '#6b6258',
      disabled: '#9a9088',
    },
    divider: '#e5e0d8',
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body1: {
      color: '#2a2520',
    },
    body2: {
      color: '#6b6258',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2a2520',
          boxShadow: '0 1px 2px rgba(90, 70, 50, 0.05)',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(90, 70, 50, 0.07)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2a2520',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2e',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#2a2520',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2e',
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2a2520',
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
          backgroundColor: '#ffffff',
          padding: '16px',
          borderTop: '1px solid #e5e0d8',
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
            color: '#2a2520',
            backgroundColor: '#ffffff',
            borderColor: '#d9cfc4',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: '#9a9088',
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
          backgroundColor: '#f5f0e8',
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
      default: '#1e1b17',
      paper: '#2a2520',
    },
    primary: {
      main: '#7b8ff0',
      dark: '#5a6ed0',
      light: '#2a3560',
    },
    secondary: {
      main: '#d98a6a',
      light: '#5a4535',
    },
    text: {
      primary: '#ede9e3',
      secondary: '#c4bfb5',
      disabled: '#8a8480',
    },
    divider: '#3a3630',
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body1: {
      color: '#ede9e3',
    },
    body2: {
      color: '#c4bfb5',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2520',
          color: '#ede9e3',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2520',
          color: '#ede9e3',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#191715',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2a2520',
          color: '#ede9e3',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#191715',
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2520',
          color: '#ede9e3',
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
          backgroundColor: '#2a2520',
          padding: '16px',
          borderTop: '1px solid #3a3630',
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
            color: '#ede9e3',
            backgroundColor: '#1e1b17',
            borderColor: '#3a3630',
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: '#8a8480',
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
          backgroundColor: '#1e1b17',
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
