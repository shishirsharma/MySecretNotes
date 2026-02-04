'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

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
      alert = <div className="alert alert-danger">Invalid pass key</div>;
    }
    if (window.console) { console.debug('[UnlockModal] render'); }
    return (
      <Dialog open={this.props.open || false} onClose={(e, reason) => this._handleClose(reason)} disableEscapeKeyDown>
        <DialogTitle sx={{backgroundColor: 'rgb(0,188,212)', color:'#FFF'}}>Enter your passkey</DialogTitle>
        <DialogContent>
          <form id="formUnlock" className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-sm-12">
                {alert}
                <input type="password" ref={this.keyInput} className="form-control" onChange={this.handleChange} id="packing-key" required placeholder="Enter key here..."/>
              </div>
              <div className="modal-footer">
                <input type="submit" value="Unlock" className="btn btn-primary"/>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default UnlockModal;
