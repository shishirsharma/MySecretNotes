'use strict';

import React from 'react';


class HelpModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <!-- Modal -->
            <div className="modal fade" id="helpModal" tabindex="-1" role="help-dialog" aria-labelledby="helpModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="uploadModalLabel">Key Bindings</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover">
                                <thead className="thead-default" >
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
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/* 
 *      HTML Entity     GLYPH  NAME
 *      &#63743;              Apple
 *      &#8984;         ⌘      Command, Cmd, Clover, (formerly) Apple
 *      &#8963;         ⌃      Control, Ctl, Ctrl
 *      &#8997;         ⌥      Option, Opt, (Windows) Alt
 *      &#8679;         ⇧      Shift
 *      &#8682;         ⇪      Caps lock
 *      &#9167;         ⏏      Eject
 *      &#8617;         ↩      Return, Carriage Return
 *      &#8629; &crarr; ↵      Return, Carriage Return
 *      &#9166;         ⏎      Return, Carriage Return
 *      &#8996;         ⌤      Enter
 *      &#9003;         ⌫      Delete, Backspace
 *      &#8998;         ⌦      Forward Delete
 *      &#9099;         ⎋      Escape, Esc
 *      &#8594; &rarr;  →      Right arrow
 *      &#8592; &larr;  ←      Left arrow
 *      &#8593; &uarr;  ↑      Up arrow
 *      &#8595; &darr;  ↓      Down arrow
 *      &#8670;         ⇞      Page Up, PgUp
 *      &#8671;         ⇟      Page Down, PgDn
 *      &#8598;         ↖      Home
 *      &#8600;         ↘      End
 *      &#8999;         ⌧      Clear
 *      &#8677;         ⇥      Tab, Tab Right, Horizontal Tab
 *      &#8676;         ⇤      Shift Tab, Tab Left, Back-tab
 *      &#9250;         ␢      Space, Blank
 *      &#9251;         **␣**  Space, BlankHTML Entity     GLYPH  NAME
 *      &#63743;              Apple
 *      &#8984;         ⌘      Command, Cmd, Clover, (formerly) Apple
 *      &#8963;         ⌃      Control, Ctl, Ctrl
 *      &#8997;         ⌥      Option, Opt, (Windows) Alt
 *      &#8679;         ⇧      Shift
 *      &#8682;         ⇪      Caps lock
 *      &#9167;         ⏏      Eject
 *      &#8617;         ↩      Return, Carriage Return
 *      &#8629; &crarr; ↵      Return, Carriage Return
 *      &#9166;         ⏎      Return, Carriage Return
 *      &#8996;         ⌤      Enter
 *      &#9003;         ⌫      Delete, Backspace
 *      &#8998;         ⌦      Forward Delete
 *      &#9099;         ⎋      Escape, Esc
 *      &#8594; &rarr;  →      Right arrow
 *      &#8592; &larr;  ←      Left arrow
 *      &#8593; &uarr;  ↑      Up arrow
 *      &#8595; &darr;  ↓      Down arrow
 *      &#8670;         ⇞      Page Up, PgUp
 *      &#8671;         ⇟      Page Down, PgDn
 *      &#8598;         ↖      Home
 *      &#8600;         ↘      End
 *      &#8999;         ⌧      Clear
 *      &#8677;         ⇥      Tab, Tab Right, Horizontal Tab
 *      &#8676;         ⇤      Shift Tab, Tab Left, Back-tab
 *      &#9250;         ␢      Space, Blank
 *      &#9251;         **␣**  Space, Blank
 */



export default HelpModal;
