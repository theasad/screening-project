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
const colors = [
    { name: 'red', code: red[500] },
    { name: 'pink', code: pink[500] },
    { name: 'purple', code: purple[500] },
    { name: 'deepPurple', code: deepPurple[500] },
    { name: 'indigo', code: indigo[500] },
    { name: 'blue', code: blue[500] },
    { name: 'lightBlue', code: lightBlue[500] },
    { name: 'cyan', code: cyan[500] },
    { name: 'teal', code: teal[500] },
    { name: 'green', code: green[500] },
    { name: 'lightGreen', code: lightGreen[500] },
    { name: 'lime', code: lime[500] },
    { name: 'amber', code: amber[500] },
    { name: 'yellow', code: yellow[900] },
    { name: 'orange', code: orange[500] },
    { name: 'deepOrange', code: deepOrange[500] },
    { name: 'brown', code: brown[500] },
    { name: 'blueGrey', code: blueGrey[500] }
];

const FormDialog = (props) => {
    let _isMounted = false;
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
            setState({ ...state, isSubmiting: true, submitBtnText: 'Adding' });
            // delete state.error;
            // delete state.errorText;
            // if (state.parent == "") delete state.parent;
            _isMounted = true;

            const postData = {
                name:state.name,
                color:state.color,
                parent:state.parent
            }

            props.handlerFolderForm(postData);
            // axios.post(Config.API_BASE_URL, state)
            //     .then(function (response) {
            //         if (_isMounted) {
            //             if (response.status === 201) {
            //                 props.handlerFolderForm(response.data, true);
            //                 setState({ submitBtnText: "Save", open: false });
            //             } else {
            //                 props.handlerFolderForm([]);
            //                 setState({ ...state, isSubmiting: false, submitBtnText: "Save" });
            //             }
            //         }
            //     })
            //     .catch(function (error) {
            //         if (_isMounted) {
            //             setState({ ...state, isSubmiting: false, submitBtnText: "Save" });
            //             props.handlerFolderForm([]);
            //         }
            //
            //     });

        } else {
            setState({ ...state, error: true, errorText: "This field is required." });
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
                fullWidth={true}
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
                        <Button onClick={handleClose}>
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
export default FormDialog;