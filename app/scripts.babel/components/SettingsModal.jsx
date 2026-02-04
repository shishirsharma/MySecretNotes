'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', confirmKey: '', alert: 'info', init: this.props.init};

    this.handleSubmit = (e) => { this._handleSubmit(e) }
    this.handleKeyChange = (e) => { this._handleInputChange(e) }
    this.handleConfirmKeyChange = (e) => { this._handleConfirmInputChange(e) }
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.log('[settingsModal] submit handled'); }
    this.props.updateNotes(this.state.key);
    this.props.onClose();
  }

  _handleInputChange(event) {
    var [key, confirmKey, alert] = [this.state.key, this.state.confirmKey, this.state.alert];
    if (window.console) { console.log('[settingsModal] keyInput change'); }
    key = event.target.value;
    this.setState({key, confirmKey, alert});
  }

  _handleConfirmInputChange(event) {
    var [key, confirmKey, alert] = [this.state.key, this.state.confirmKey, this.state.alert];
    if (window.console) { console.log('[settingsModal] ConfirmkeyInput change'); }
    confirmKey = event.target.value;
    if (key === confirmKey) {
      alert = 'info';
    } else {
      alert = 'danger';
    }
    this.setState({key, confirmKey, alert});
  }

  render() {
    const alertLevel = this.state.alert;
    const init = this.state.init;

    var msg = {}
    var close_button = null;
    if (init) {
      msg.settingsModalLabel = 'Create passkey';
      msg.keyInput_placeholder = 'Enter a key here...';
    } else {
      msg.settingsModalLabel = 'Change passkey';
      msg.keyInput_placeholder = 'Enter new key here...';
      close_button = <IconButton
        aria-label="Close"
        onClick={this.props.onClose}
        sx={{
          color: '#FFF',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.15)'
          }
        }}
      >
        <CloseIcon />
      </IconButton>
    }

    let alert = null;
    if (alertLevel === 'info') {
      alert = <Alert severity="info">Please enter new keys here</Alert>;
    } else {
      alert = <Alert severity="error">Keys & confirm key does not match</Alert>;
    }
    return (
      <Dialog
        open={this.props.open || false}
        onClose={() => {}}
        disableEscapeKeyDown
        autoFocus
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
          background: 'var(--appbar-bg)',
          color: '#FFF',
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 600,
          letterSpacing: '-0.3px',
          py: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <span>{msg.settingsModalLabel}</span>
          {close_button}
        </DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent sx={{py: 3, px: 3}}>
            {alert && <div sx={{mb: 2}}>{alert}</div>}
            <TextField
              type="password"
              onChange={this.handleKeyChange}
              required
              placeholder={msg.keyInput_placeholder}
              fullWidth
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '15px',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'var(--color-input-bg)',
                  '& fieldset': {
                    borderColor: 'var(--color-input-border)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--color-primary)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-primary)'
                  }
                }
              }}
            />
            <TextField
              type="password"
              onChange={this.handleConfirmKeyChange}
              required
              placeholder="Confirm key..."
              fullWidth
              variant="outlined"
              size="medium"
              sx={{
                mt: 2,
                '& .MuiOutlinedInput-root': {
                  fontSize: '15px',
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'var(--color-input-bg)',
                  '& fieldset': {
                    borderColor: 'var(--color-input-border)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--color-primary)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-primary)'
                  }
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{p: 2, borderTop: '1px solid var(--color-border)'}}>
            <Button
              type="submit"
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
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default SettingsModal;
