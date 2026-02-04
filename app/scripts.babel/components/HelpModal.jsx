'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

class HelpModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog open={this.props.open || false} onClose={this.props.onClose}>
                <DialogTitle sx={{backgroundColor: 'rgb(0,188,212)', color:'#FFF'}}>Key Bindings</DialogTitle>
                <DialogContent>
                    <table className="table table-hover">
                        <thead>
                            <tr><th>#</th><th>Key</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            <tr><th scope="row">1</th><td>⌘ <b>b</b></td><td><b>Bold</b></td></tr>
                            <tr><th scope="row">2</th><td>⌃ <b>d</b></td><td>Delete</td></tr>
                            <tr><th scope="row">3</th><td>⌃ <b>h</b></td><td>Backspace &#9003;</td></tr>
                            <tr><th scope="row">4</th><td>⌘ <b>i</b></td><td><i>Italic</i></td></tr>
                            <tr><th scope="row">5</th><td>⌘ <b>j</b></td><td><code>code</code></td></tr>
                            <tr><th scope="row">6</th><td>⌃ <b>k</b></td><td>Kill line from current point</td></tr>
                            <tr><th scope="row">7</th><td>⌃ <b>m</b></td><td>Split block</td></tr>
                            <tr><th scope="row">8</th><td>⌃ <b>o</b></td><td>Split block</td></tr>
                            <tr><th scope="row">9</th><td>⌃ <b>t</b></td><td>Transpose characters</td></tr>
                            <tr><th scope="row">10</th><td>⌘ <b>u</b></td><td><u>Underline</u></td></tr>
                            <tr><th scope="row">11</th><td>⌃ <b>w</b></td><td>Backspace word </td></tr>
                            <tr><th scope="row">12</th><td>⌃ <b>y</b></td><td>Redo</td></tr>
                        </tbody>
                    </table>
                    <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.props.onClose}>Close</button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default HelpModal;
