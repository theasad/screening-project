import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Radio from '@material-ui/core/Radio';
import { makeStyles, DialogContentText } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import FormLabel from '@material-ui/core/FormLabel';
import DoneIcon from '@material-ui/icons/Done'
import Config from '../Config.js'
import axios from 'axios'
import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import purple from '@material-ui/core/colors/purple'
import deepPurple from '@material-ui/core/colors/deepPurple'
import indigo from '@material-ui/core/colors/indigo'
import blue from '@material-ui/core/colors/blue'
import lightBlue from '@material-ui/core/colors/lightBlue'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import green from '@material-ui/core/colors/green'
import lightGreen from '@material-ui/core/colors/lightGreen'
import lime from '@material-ui/core/colors/lime'
import amber from '@material-ui/core/colors/amber'
import orange from '@material-ui/core/colors/orange'
import deepOrange from '@material-ui/core/colors/deepOrange'
import yellow from '@material-ui/core/colors/yellow'
import brown from '@material-ui/core/colors/brown'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    icon: {
        color: "white",
        fontSize: 30
    },
    label: {
        marginTop: 15
    }
}));
const FormFileUploadDialog = (props) => {
    const [state, setState] = React.useState({
        file: "",
        folder: props.opnefolder.hasOwnProperty('id') ? props.opnefolder.id : "",
        error: false,
        errorText: "",
        isSubmiting: false,
        submitBtnText: 'Add',
        open: props.open
    });
    let textInput = React.createRef();
    function handleChange(event) {
        console.log(event)

    }

    function inputHandle(event) {
        console.log(event)
    }

    function handleForm(event) {
        console.log(event);
    }

    function handleClose() {
        return props.handleClose();
    }


    const defaultClass = useStyles();




    return (
        <div>
            <Dialog
                open={state.open} onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                keepMounted
                fullWidth={props.open}
                maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title">Upload File</DialogTitle>
                <form noValidate autoComplete="off">
                    <DialogContent dividers fullwidth>
                        <TextField
                            inputRef={textInput}
                            error={state.error}
                            required
                            helperText={state.errorText}
                            onChange={inputHandle} autoFocus
                            margin="dense" id="name" label="Upload File"
                            type="file" fullWidth />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color={red[500]}>
                            Cancel
                    </Button>
                        <Button variant="contained" onClick={handleForm} color="primary">
                            <CircularProgress size="25" color="secondary" />
                            {`${state.submitBtnText}`}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default FormFileUploadDialog;