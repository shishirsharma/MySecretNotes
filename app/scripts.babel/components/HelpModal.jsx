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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const sectionHeaderSx = {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '15px',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mt: 3,
    mb: 1.5,
    '&:first-of-type': { mt: 0 }
};

const paragraphSx = {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    mb: 0.5
};

const bulletSx = {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.8,
    pl: 2,
    mb: 0.25
};

const kbdStyle = {
    display: 'inline-block',
    padding: '1px 6px',
    fontSize: '11px',
    fontFamily: 'var(--font-mono, "Inconsolata", monospace)',
    lineHeight: '1.6',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    boxShadow: '0 1px 0 var(--color-border)',
};

const tableSx = {
    '& .MuiTableHead-root': {
        bgcolor: 'var(--color-surface)'
    },
    '& .MuiTableCell-head': {
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        borderBottom: '2px solid var(--color-border)',
        color: 'var(--color-text-primary)',
        fontSize: '13px',
        py: 1
    },
    '& .MuiTableCell-body': {
        fontSize: '12.5px',
        color: 'var(--color-text-secondary)',
        borderBottom: '1px solid var(--color-border)',
        py: 0.75,
        fontFamily: 'var(--font-body)',
    },
    '& .MuiTableBody-root tr:hover': {
        bgcolor: 'var(--color-primary-light)'
    }
};

const SectionIcon = ({ children }) => (
    <Box component="span" sx={{
        width: '22px',
        height: '22px',
        borderRadius: '5px',
        bgcolor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        flexShrink: 0
    }}>
        {children}
    </Box>
);

const Kbd = ({ children }) => <span style={kbdStyle}>{children}</span>;

const Bullet = ({ children }) => (
    <Typography sx={bulletSx}>• {children}</Typography>
);

class HelpModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
              open={this.props.open || false}
              onClose={this.props.onClose}
              maxWidth="md"
              fullWidth
              autoFocus
              PaperProps={{
                sx: {
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                  bgcolor: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  maxHeight: '80vh'
                }
              }}
            >
                <DialogTitle sx={{
                  background: 'var(--appbar-bg)',
                  color: '#FFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '-0.3px',
                  py: 2.5,
                  borderBottom: '1px solid var(--color-border)'
                }}>
                  Help
                </DialogTitle>
                <DialogContent sx={{pt: 4, pb: 3, px: 3}}>

                    {/* Getting Started */}
                    <Typography sx={{...sectionHeaderSx, mt: 0}}>
                        <SectionIcon>📝</SectionIcon>
                        Getting Started
                    </Typography>
                    <Bullet>Click <b>New Note</b> in the top bar to create a note</Bullet>
                    <Bullet>Click any note card to expand and edit in focus mode</Bullet>
                    <Bullet>Click outside the card or press <Kbd>Esc</Kbd> to exit focus mode</Bullet>
                    <Bullet>Notes auto-save as you type</Bullet>
                    <Bullet>Notes are sorted by most recently edited</Bullet>

                    <Divider sx={{ my: 2.5, borderColor: 'var(--color-border)' }} />

                    {/* Text Formatting */}
                    <Typography sx={sectionHeaderSx}>
                        <SectionIcon>Aa</SectionIcon>
                        Text Formatting
                    </Typography>
                    <Typography sx={{...paragraphSx, mb: 1.5}}>
                        Use the toolbar in the editor or keyboard shortcuts to format text.
                    </Typography>
                    <Table size="small" sx={{...tableSx, mb: 1.5}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Format</TableCell>
                                <TableCell>Shortcut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell><b>Bold</b></TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>B</Kbd></TableCell></TableRow>
                            <TableRow><TableCell><i>Italic</i></TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>I</Kbd></TableCell></TableRow>
                            <TableRow><TableCell><u>Underline</u></TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>U</Kbd></TableCell></TableRow>
                            <TableRow><TableCell><code style={{fontSize: '12px', backgroundColor: 'var(--color-code-bg)', padding: '1px 4px', borderRadius: '3px'}}>Inline Code</code></TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>J</Kbd></TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <Bullet>Headers (H1–H6), blockquotes, and lists available in the toolbar</Bullet>
                    <Bullet>Ordered and unordered lists supported</Bullet>
                    <Bullet>Use <Kbd>Tab</Kbd> to indent list items, <Kbd>Shift</Kbd> + <Kbd>Tab</Kbd> to outdent</Bullet>
                    <Bullet>Code blocks for multi-line code snippets</Bullet>

                    <Divider sx={{ my: 2.5, borderColor: 'var(--color-border)' }} />

                    {/* Keyboard Shortcuts */}
                    <Typography sx={sectionHeaderSx}>
                        <SectionIcon>⌨</SectionIcon>
                        Keyboard Shortcuts
                    </Typography>
                    <Table size="small" sx={tableSx}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '40px' }}>#</TableCell>
                                <TableCell>Key</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow><TableCell>1</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>B</Kbd></TableCell><TableCell><b>Bold</b></TableCell></TableRow>
                            <TableRow><TableCell>2</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>D</Kbd></TableCell><TableCell>Delete forward</TableCell></TableRow>
                            <TableRow><TableCell>3</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>H</Kbd></TableCell><TableCell>Backspace</TableCell></TableRow>
                            <TableRow><TableCell>4</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>I</Kbd></TableCell><TableCell><i>Italic</i></TableCell></TableRow>
                            <TableRow><TableCell>5</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>J</Kbd></TableCell><TableCell><code style={{fontSize: '12px', backgroundColor: 'var(--color-code-bg)', padding: '1px 4px', borderRadius: '3px'}}>Code</code></TableCell></TableRow>
                            <TableRow><TableCell>6</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></TableCell><TableCell>Kill line from cursor</TableCell></TableRow>
                            <TableRow><TableCell>7</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>M</Kbd></TableCell><TableCell>Split block</TableCell></TableRow>
                            <TableRow><TableCell>8</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>O</Kbd></TableCell><TableCell>Split block</TableCell></TableRow>
                            <TableRow><TableCell>9</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>T</Kbd></TableCell><TableCell>Transpose characters</TableCell></TableRow>
                            <TableRow><TableCell>10</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>U</Kbd></TableCell><TableCell><u>Underline</u></TableCell></TableRow>
                            <TableRow><TableCell>11</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>W</Kbd></TableCell><TableCell>Backspace word</TableCell></TableRow>
                            <TableRow><TableCell>12</TableCell><TableCell><Kbd>Ctrl</Kbd> + <Kbd>Y</Kbd></TableCell><TableCell>Redo</TableCell></TableRow>
                        </TableBody>
                    </Table>

                    <Divider sx={{ my: 2.5, borderColor: 'var(--color-border)' }} />

                    {/* Search & Organization */}
                    <Typography sx={sectionHeaderSx}>
                        <SectionIcon>🔍</SectionIcon>
                        Search & Organization
                    </Typography>
                    <Bullet>Use the search bar to filter notes by content</Bullet>
                    <Bullet>Notes automatically sort by most recently edited</Bullet>
                    <Bullet>Responsive grid layout adjusts to your screen size</Bullet>

                    <Divider sx={{ my: 2.5, borderColor: 'var(--color-border)' }} />

                    {/* Themes */}
                    <Typography sx={sectionHeaderSx}>
                        <SectionIcon>🎨</SectionIcon>
                        Themes
                    </Typography>
                    <Bullet>Toggle between <b>Light</b> and <b>Dark</b> mode</Bullet>
                    <Bullet>Access via the <b>Settings</b> menu (gear icon) in the top-right corner</Bullet>

                    <Divider sx={{ my: 2.5, borderColor: 'var(--color-border)' }} />

                    {/* Security */}
                    <Typography sx={sectionHeaderSx}>
                        <SectionIcon>🔒</SectionIcon>
                        Security
                    </Typography>
                    <Bullet>Notes are encrypted locally with AES-192</Bullet>
                    <Bullet>Lock your notes when stepping away via <b>Settings → Lock Notes</b></Bullet>
                    <Bullet>Change your passkey via <b>Settings → Change Passkey</b></Bullet>
                    <Box sx={{
                        mt: 1.5,
                        p: 1.5,
                        bgcolor: 'var(--color-danger-light, var(--color-surface))',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                    }}>
                        <Typography sx={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12.5px',
                            color: 'var(--color-danger, var(--color-text-secondary))',
                            lineHeight: 1.6
                        }}>
                            <b>Warning:</b> Your passkey cannot be recovered if forgotten. All encrypted notes will be permanently inaccessible.
                        </Typography>
                    </Box>

                    {/* Attribution footer */}
                    <Box sx={{
                      fontSize: '11px',
                      color: 'var(--color-text-tertiary)',
                      marginTop: '24px',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--color-border)',
                      lineHeight: 1.5
                    }}>
                      Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>CC 3.0 BY</a>
                    </Box>
                </DialogContent>
                <DialogActions sx={{p: 2, borderTop: '1px solid var(--color-border)'}}>
                    <Button
                      onClick={this.props.onClose}
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        '&:hover': {
                          bgcolor: 'var(--color-primary-light)'
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
