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

  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.log('[UnlockModal] submit handled:', this.state.password); }
    this.props.unlockNotes(this.state.password);
    $('#unlockModal').modal('hide');
  }

  _handleChange(event) {
    if (window.console) { console.log('[UnlockModal] change'); }
    this.setState({password: event.target.value});
  } 


  render() {
    return (
      /* <!-- Modal -->*/
      <div className="modal fade" id="unlockModal" tabIndex="-1" role="unlock-dialog" aria-labelledby="unlockModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="unlockModalLabel">Enter your passkey</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <form id="formUnlock" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    <input type="password" className="form-control" onChange={this.handleChange} id="packing-key" required placeholder="Enter key here..." />
                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Unlock" className="btn btn-primary" />
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
