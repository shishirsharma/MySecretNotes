'use strict';

import React from 'react';


class UnlockModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSave(e) {
    this.props.handleSave(e);
  }


  render() {
    return (
      /* <!-- Modal -->*/
      <div className="modal fade" id="unlockModal" tabindex="-1" role="unlock-dialog" aria-labelledby="unlockModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="unlockModalLabel">Locking Key</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

            </div>
            <div className="modal-body">
              <form id="formUnlock" className="form-horizontal">
                <div className="form-group">
                  <label className="col-sm-12 control-label" for="input-packing-key">Your Packing Key</label>
                  <div className="col-sm-12">
                    <input type="password" className="form-control" id="packing-key" required placeholder="Packing Key" />
                  </div>
                </div>
                <button type="submit" hidden className="btn btn-primary"><i className="fa fa-unlock" aria-hidden="true"></i></button>
              </form>

              <div className="modal-footer">
                <button id="btnSaveChange" type="button" onClick={this._handleSave} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnlockModal;
