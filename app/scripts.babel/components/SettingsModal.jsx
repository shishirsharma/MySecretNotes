'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

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
      close_button = <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}><span aria-hidden="true">&times;</span></button>
    }

    let alert = null;
    if (alertLevel === 'info') {
      alert = <div className="alert alert-info">Please enter new keys here</div>;
    } else {
      alert = <div className="alert alert-danger">Keys & confirm key does not match</div>;
    }
    return (
      <Dialog open={this.props.open || false} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle sx={{backgroundColor: 'rgb(0,188,212)', color:'#FFF'}}>
          {msg.settingsModalLabel}
          {close_button}
        </DialogTitle>
        <DialogContent>
          <form id="formSettings" className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-sm-12">
                {alert}
                <input type="password" className="form-control" onChange={this.handleKeyChange} id="new-packing-key" required placeholder={msg.keyInput_placeholder}/>
                <input type="password" className="form-control" onChange={this.handleConfirmKeyChange} id="confirm-packing-key" required placeholder="Confirm key..." />
              </div>
              <div className="modal-footer">
                <input type="submit" value="Update" className="btn btn-primary" />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

export default SettingsModal;
