'use strict';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class HelpModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
              open={this.props.open || false}
              onClose={this.props.onClose}
              maxWidth="sm"
              fullWidth
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
                  Key Bindings
                </DialogTitle>
                <DialogContent sx={{py: 3, px: 3}}>
                    <Table size="small" sx={{
                      '& .MuiTableHead-root': {
                        bgcolor: '#f5f5f5'
                      },
                      '& .MuiTableCell-head': {
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        borderBottom: '2px solid #e0e0e0',
                        color: '#1a1a1a',
                        fontSize: '14px'
                      },
                      '& .MuiTableCell-body': {
                        fontSize: '13px',
                        color: '#666',
                        borderBottom: '1px solid #e0e0e0'
                      },
                      '& .MuiTableBody-root tr:hover': {
                        bgcolor: 'rgba(0, 188, 212, 0.04)'
                      }
                    }}>
                        <TableHead>
                            <TableRow><TableCell>#</TableCell><TableCell>Key</TableCell><TableCell>Action</TableCell></TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell>1</TableCell><TableCell>⌘ <b>b</b></TableCell><TableCell><b>Bold</b></TableCell></TableRow>
                            <TableRow><TableCell>2</TableCell><TableCell>⌃ <b>d</b></TableCell><TableCell>Delete</TableCell></TableRow>
                            <TableRow><TableCell>3</TableCell><TableCell>⌃ <b>h</b></TableCell><TableCell>Backspace &#9003;</TableCell></TableRow>
                            <TableRow><TableCell>4</TableCell><TableCell>⌘ <b>i</b></TableCell><TableCell><i>Italic</i></TableCell></TableRow>
                            <TableRow><TableCell>5</TableCell><TableCell>⌘ <b>j</b></TableCell><TableCell><code>code</code></TableCell></TableRow>
                            <TableRow><TableCell>6</TableCell><TableCell>⌃ <b>k</b></TableCell><TableCell>Kill line from current point</TableCell></TableRow>
                            <TableRow><TableCell>7</TableCell><TableCell>⌃ <b>m</b></TableCell><TableCell>Split block</TableCell></TableRow>
                            <TableRow><TableCell>8</TableCell><TableCell>⌃ <b>o</b></TableCell><TableCell>Split block</TableCell></TableRow>
                            <TableRow><TableCell>9</TableCell><TableCell>⌃ <b>t</b></TableCell><TableCell>Transpose characters</TableCell></TableRow>
                            <TableRow><TableCell>10</TableCell><TableCell>⌘ <b>u</b></TableCell><TableCell><u>Underline</u></TableCell></TableRow>
                            <TableRow><TableCell>11</TableCell><TableCell>⌃ <b>w</b></TableCell><TableCell>Backspace word </TableCell></TableRow>
                            <TableRow><TableCell>12</TableCell><TableCell>⌃ <b>y</b></TableCell><TableCell>Redo</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid #e0e0e0',
                      lineHeight: 1.5
                    }}>
                      Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver" style={{color: '#00bcd4', textDecoration: 'none'}}>Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon" style={{color: '#00bcd4', textDecoration: 'none'}}>www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" style={{color: '#00bcd4', textDecoration: 'none'}}>CC 3.0 BY</a>
                    </div>
                </DialogContent>
                <DialogActions sx={{p: 2, borderTop: '1px solid #e0e0e0'}}>
                    <Button
                      onClick={this.props.onClose}
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        color: '#00bcd4',
                        '&:hover': {
                          bgcolor: 'rgba(0, 188, 212, 0.08)'
                        }
                      }}
                    >
                      Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default HelpModal;
