'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

class UnlockModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: ''};
    this.keyInput = React.createRef();

    this.handleChange = (e) => {
      this._handleChange(e);
    }
    this.handleSubmit = (e) => {
      this._handleSubmit(e);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      if (window.console) { console.debug('[UnlockModal] Focus fired'); }
      setTimeout(() => {
        if (this.keyInput.current) { this.keyInput.current.focus(); }
      }, 0);
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.debug('[UnlockModal] submit handled:', this.state.password); }
    this.props.unlockNotes(this.state.password);
    this.props.onClose();
    this.setState({password: ''});
    if (this.keyInput.current) { this.keyInput.current.value = ""; }
  }

  _handleClose(reason) {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }
    this.props.onClose();
  }

  _handleChange(event) {
    if (window.console) { console.debug('[UnlockModal] change'); }
    this.setState({password: event.target.value});
  }

  render() {
    let alert = null;
    if (this.props.invalid_key) {
      alert = <Alert severity="error">Invalid pass key</Alert>;
    }
    if (window.console) { console.debug('[UnlockModal] render'); }
    return (
      <Dialog
        open={this.props.open || false}
        onClose={(e, reason) => this._handleClose(reason)}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
          color: '#FFF',
          fontFamily: '"Playfair Display", serif',
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          py: 2.5,
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          Enter your passkey
        </DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent sx={{py: 3, px: 3}}>
            {alert && <div sx={{mb: 2}}>{alert}</div>}
            <TextField
              type="password"
              inputRef={this.keyInput}
              onChange={this.handleChange}
              required
              placeholder="Enter key here..."
              fullWidth
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '15px',
                  '&:hover fieldset': {
                    borderColor: '#00bcd4'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00bcd4'
                  }
                }
              }}
            />
          </DialogContent>
          <DialogActions sx={{p: 2, borderTop: '1px solid #e0e0e0'}}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#00bcd4',
                color: 'white',
                textTransform: 'capitalize',
                fontWeight: 600,
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: '#0097a7'
                }
              }}
            >
              Unlock
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default UnlockModal;
