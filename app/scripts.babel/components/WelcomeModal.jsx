'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';

class WelcomeModal extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open || false}
        onClose={() => {}}
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            bgcolor: 'var(--color-bg)',
            color: 'var(--color-text-primary)'
          }
        }}
      >
        <DialogTitle sx={{
          fontFamily: 'var(--font-body)',
          fontSize: '20px',
          letterSpacing: '-0.3px',
          py: 2.5,
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          Welcome to My Secret Notes! 📝
        </DialogTitle>
        <DialogContent sx={{py: 3, px: 3}}>
          <Box sx={{mb: 3}}>
            <Typography variant="body2" sx={{color: 'var(--color-text-secondary)', mb: 2}}>
              A secure, encrypted note-taking extension for Chrome. Your notes are encrypted locally and protected with a passkey.
            </Typography>
          </Box>

          <Box sx={{mb: 2.5}}>
            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2}}>
              <SecurityIcon sx={{color: 'var(--color-primary)', mt: 0.5, flexShrink: 0}} />
              <Box>
                <Typography variant="subtitle2" sx={{fontWeight: 600, mb: 0.5}}>
                  Secure & Private
                </Typography>
                <Typography variant="body2" sx={{color: 'var(--color-text-secondary)', fontSize: '13px'}}>
                  All your notes are encrypted locally. Even we can't read them without your passkey.
                </Typography>
              </Box>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2}}>
              <EditIcon sx={{color: 'var(--color-primary)', mt: 0.5, flexShrink: 0}} />
              <Box>
                <Typography variant="subtitle2" sx={{fontWeight: 600, mb: 0.5}}>
                  Rich Formatting
                </Typography>
                <Typography variant="body2" sx={{color: 'var(--color-text-secondary)', fontSize: '13px'}}>
                  Create notes with bold, italic, headers, code blocks, and more.
                </Typography>
              </Box>
            </Box>

            <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 1.5}}>
              <LightbulbIcon sx={{color: 'var(--color-primary)', mt: 0.5, flexShrink: 0}} />
              <Box>
                <Typography variant="subtitle2" sx={{fontWeight: 600, mb: 0.5}}>
                  Quick & Easy
                </Typography>
                <Typography variant="body2" sx={{color: 'var(--color-text-secondary)', fontSize: '13px'}}>
                  Click the extension icon, create new notes, and search through them instantly.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            p: 1.5,
            mt: 2.5
          }}>
            <Typography variant="body2" sx={{fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 500}}>
              💡 <strong>Tip:</strong> Your notes are sorted by most recently edited. Click on any note to expand and edit it in focus mode.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{p: 2, borderTop: '1px solid var(--color-border)'}}>
          <Button
            onClick={this.props.onClose}
            variant="contained"
            sx={{
              bgcolor: 'var(--color-primary)',
              color: 'white',
              textTransform: 'capitalize',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: 'var(--color-primary-dark)'
              }
            }}
          >
            Get Started
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default WelcomeModal;
