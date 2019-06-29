import React from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const colors = [
    { name: 'red', code: '#f44336' },
    { name: 'pink', code: '#e91e63' },
    { name: 'purple', code: '#9c27b0' },
    { name: 'deepPurple', code: '#673ab7' },
    { name: 'indigo', code: '#3f51b5' },
    { name: 'blue', code: '#2196f3' },
    { name: 'lightBlue', code: '#03a9f4' },
    { name: 'cyan', code: '#00bcd4' },
    { name: 'teal', code: '#009688' },
    { name: 'green', code: '#4caf50' },
    { name: 'lightGreen', code: 'rgb(139, 195, 74)' },
    { name: 'lime', code: 'rgb(205, 220, 57)' },
    // { name: 'yellow', code: 'rgb(255, 235, 59)' },
    { name: 'amber', code: '#ffc107' },
    { name: 'orange', code: '#ff9800' },
    { name: 'deepOrange', code: 'rgb(255, 87, 34)' }
];

const FormDialog = (props) => {
    const [state, setState] = React.useState({
        name: "",
        color: "",
        parent: props.opnefolder.hasOwnProperty('id') ? props.opnefolder.id : "",
        error: false,
        errorText: "",
        isSubmiting: false,
        submitBtnText: 'Add',
        open: props.open
    });
    let textInput = React.createRef();
    function handleChange(event) {
        console.log(event)
        if (state['color'] === event.target.value) {
            setState({ ...state, color: "" })
        } else {
            setState({ ...state, color: event.target.value });
        }

    }

    function inputHandle(event) {
        setState({ ...state, name: event.target.value, error: false, errorText: "" });
    }

    function handleForm(event) {
        if (state.name != "" && !state.error && !state.isSubmiting) {
            setState({ ...state, isSubmiting: true, submitBtnText: 'Adding' })
            delete state.error;
            delete state.errorText;
            if (state.parent == "") delete state.parent

            axios.post(Config.API_BASE_URL, state)
                .then(function (response) {
                    if (response.status === 201) {
                        props.handlerFolderForm(response.data, true);
                    } else {
                        props.handlerFolderForm([]);
                    }
                    setState({ ...state, isSubmiting: false, submitBtnText: "Add" })

                    return
                })
                .catch(function (error) {
                    console.log(error);
                    setState({ ...state, isSubmiting: false, submitBtnText: "Add" })
                    props.handlerFolderForm([]);

                });

        } else {
            setState({ ...state, error: true, errorText: "This field is required." })
            textInput.current.focus();
        }
    }

    function handleClose() {
        return props.handleClose();
    }

    const useStyles = makeStyles(theme => ({
        icon: {
            color: "white",
            fontSize: 30
        },
        label: {
            marginTop: 15
        }
    }));
    const defaultClass = useStyles();
    function ColorPicker() {

        return colors.map(color => {
            console.log(color);
            let nameCls = color.name
            const useStylesRadioBox = makeStyles(theme => ({

                nameCls: {
                    backgroundColor: color.code,
                    margin: 5,
                    width: 48,
                    height: 48,
                    borderRadius: 0,
                    '&:hover': {
                        backgroundColor: `${color.code}!important`,
                    }
                },

            }));
            const classes = useStylesRadioBox();

            return (
                <Tooltip key={color.name} title={color.name} aria-label={color.name} placement="right">
                    <Radio className={classes.nameCls}
                        checkedIcon={<DoneIcon className={defaultClass.icon} />}
                        icon=""
                        name="color"
                        checked={state['color'] === color.code}
                        onClick={handleChange}
                        value={color.code}
                        inputProps={{
                            'aria-label': `${color.name} radiobox`,
                        }}
                    />
                </Tooltip>)
        })
    }



    return (
        <div>
            <Dialog
                open={state.open} onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                keepMounted
                fullWidth={props.open}
                color="inherit"
                maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title">Add New Folder</DialogTitle>
                <form noValidate autoComplete="off">
                    <DialogContent dividers fullwidth>
                        <TextField
                            inputRef={textInput}
                            error={state.error}
                            required
                            helperText={state.errorText}
                            onChange={inputHandle} autoFocus
                            margin="dense" id="name" label="Folder name"
                            type="text" fullWidth />
                        <DialogContentText className={defaultClass.label}>
                            <FormLabel>Pick color:</FormLabel>
                        </DialogContentText>

                        {ColorPicker()}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={handleForm} color="primary">
                            {`${state.submitBtnText}`}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default FormDialog;