'use strict';

import React from 'react';


class SettingsModal extends React.Component {
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
    setTimeout(function() {
      this.refs.keyInput.focus();
    }.bind(this), 0);

    //this.refs.keyInput.focus();
    if (window.console) { console.log('[settingsModal] Focus fired'); }
  }


  _handleSubmit(event) {
    event.preventDefault();
    if (window.console) { console.log('[settingsModal] submit handled:', this.state.password); }
    this.props.unlockNotes(this.state.password);
    $('#settingsModal').modal('hide');
  }

  _handleChange(event) {
    if (window.console) { console.log('[settingsModal] change'); }
    this.setState({password: event.target.value});
  } 


  render() {
    return (
      /* <!-- Modal -->*/
      <div className="modal fade" id="settingsModal" tabIndex="-1" role="settings-dialog" aria-labelledby="settingsModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settingsModalLabel">Change passkey</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <form id="formSettings" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <div className="col-sm-12">
                    <div className="alert alert-danger hide">Passwords dont' match</div>
                    <input type="password" ref="keyInput" autoFocus className="form-control" onChange={this.handleChange} id="packing-key" required placeholder="Enter key here..." />
                    <input type="password" ref="confirmKeyInput" autoFocus className="form-control" id="confirm-packing-key" required placeholder="Confirm key..." />
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
