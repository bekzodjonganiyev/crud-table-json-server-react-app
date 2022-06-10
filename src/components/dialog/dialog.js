import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {

    const {id, name, email, phone, dob } = data

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                   {id ? "Update user" : "Create new user"} 
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            id="name"
                            value={name}
                            label="Enter Name"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id="email"
                            value={email}
                            label="Enter Email"
                            variant="outlined"
                            fullWidth
                            onChange={e => onChange(e)}
                            margin="dense"
                        />
                        <TextField
                            id="phone"
                            value={phone}
                            label="Enter Phone Number"
                            variant="outlined"
                            fullWidth
                            onChange={e => onChange(e)}
                            margin="dense"
                        />
                        <TextField
                            id="dob"
                            value={dob}
                            label="Enter Date of Birth"
                            variant="outlined"
                            fullWidth
                            onChange={e => onChange(e)}
                            margin="dense"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color='secondary'>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleFormSubmit()
                        }}
                        variant="contained"
                        color='primary'>
                        {id ? "Update" : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
