import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Dialogs(props) {
    console.log(props.openAddnewStock)
    return (
        <Dialog open={props.openAddnewStock} onClose={props.handleCloseAddnewStock}>
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
                {props.textfield ? <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Stock Symbol"
                    type="stock"
                    fullWidth
                    variant="standard"
                    onChange={e => props.setStockSymbol(e.target.value)}
                /> : null}
            </DialogContent>
            <DialogActions>
                {props.button1 ?
                    <Button onClick={props.handleCloseAddnewStock}>{props.button1text}</Button>
                    : null}
                {props.button2 ?
                    <Button onClick={props.handleAddButton} disabled={props.loading}>{props.button2text}</Button>
                    : null}
            </DialogActions>
        </Dialog>
    );
}


export default Dialogs;