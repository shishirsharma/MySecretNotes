'use strict';

import React from 'react';


class UnlockModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {password: ''};

    this.handleChange = (e) => {
      this._handleChange(e);
    }
    this.handleSubmit = (e) => {
      this._handleSubmit(e);
    }
  }

  componentDidMount() {
    // This is limitation of bootstrap modal. autoFocus does not work in BS
    $('#unlockModal').on('shown.bs.modal', function () {
      if (window.console) { console.debug('[UnlockModal] Focus fired'); }
      $('#packing-key').focus();
    })
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.debug('[UnlockModal] submit handled:', this.state.password); }
    this.props.unlockNotes(this.state.password);
    $('#unlockModal').modal('hide');
  }

  _handleChange(event) {
    if (window.console) { console.debug('[UnlockModal] change'); }
    this.setState({password: event.target.value});
  }

  render() {
    return (
      /* <!-- Modal -->*/
        <div className="modal show" id="unlockModal" tabIndex="-1" role="unlock-dialog" aria-labelledby="unlockModalLabel" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="unlockModalLabel">Enter your passkey</h5>
            </div>
            <form id="formUnlock" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    <input type="password" ref="keyInput" className="form-control" onChange={this.handleChange} id="packing-key" required placeholder="Enter key here..."/>
                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Unlock" className="btn btn-primary"/>
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

export default UnlockModal;
