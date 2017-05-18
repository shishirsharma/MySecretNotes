'use strict';

import React from 'react';


class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', confirmKey: '', alert: 'info', init: this.props.init};

    this.handleSubmit = (e) => { this._handleSubmit(e) }
    this.handleKeyChange = (e) => { this._handleInputChange(e) }
    this.handleConfirmKeyChange = (e) => { this._handleConfirmInputChange(e) }
  }

  componentDidMount() {
    // This is limitation of bootstrap modal. autoFocus does not work in BS
    $('#settingsModal').on('shown.bs.modal', function () {
      if (window.console) { console.log('[SettingsModal] Focus fired'); }
      $('#new-packing-key').focus();
    })
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.log('[settingsModal] submit handled'); }
    $('#settingsModal').on('hidden.bs.modal', function (e) {
      if (window.console) { console.log('[SettingsModal] hidden'); }
      this.props.updateNotes(this.state.key);
    }.bind(this))
    $('#settingsModal').modal('hide');
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
      close_button = <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    }

    let alert = null;
    if (alertLevel === 'info') {
      alert = <div className="alert alert-info hide">Please enter new keys here</div>;
    } else {
      alert = <div className="alert alert-danger hide">Keys & confirm key does not match</div>;
    }
    return (
      /* <!-- Modal -->*/
      <div className="modal fade" id="settingsModal" tabIndex="-1" role="settings-dialog" aria-labelledby="settingsModalLabel" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsModalLabel">{msg.settingsModalLabel}</h5>
              {close_button}
            </div>
            <form id="formSettings" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    {alert}
                    <input type="password" ref="keyInput" className="form-control" onChange={this.handleKeyChange} id="new-packing-key" required placeholder={msg.keyInput_placeholder}/>
                    <input type="password" ref="confirmKeyInput" className="form-control" onChange={this.handleConfirmKeyChange} id="confirm-packing-key" required placeholder="Confirm key..." />
                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Update" className="btn btn-primary" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsModal;
