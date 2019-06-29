import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import {makeStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

import DoneIcon from '@material-ui/icons/Done'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const FormDialog = (props) => {
    const colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#ffc107',
        '#ff9800'
    ];


    const [state, setState] = React.useState({
        checked:[]
    });

    const handleChange = name => event => {
        console.log(name);
        console.log(state.checked);
        setState({checked:[]});
        setState({checked: {[name]:event.target.checked}});
    };

    function handleClose() {
        return props.handleClose();
    }

    function f() {

        return colors.map(color => {
            const useStyles = makeStyles(theme => ({
                color: {
                    backgroundColor: color,
                    margin: 5,
                    width: 48,
                    height: 48,
                    borderRadius:0,
                    '&:hover': {
                        backgroundColor: `${color}!important`,
                    }
                },
                icon: {
                    color: "white",
                    fontSize:30
                }
            }));
            const classes = useStyles();
            return (
                <Tooltip title={color} aria-label={color} placement="right">
                    <Radio className={classes.color}
                           checkedIcon={<DoneIcon className={classes.icon}/>}
                           icon=""
                           name="color"
                        // checked={state.checked[color]}
                        //    onChange={handleChange({color})}
                           value={color}
                           inputProps={{
                               'aria-label': 'primary checkbox',
                           }}
                    />
                </Tooltip>)
        })
    }


    return (
        <div>
            <Dialog
                open={props.open} onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                keepMounted
                fullWidth={true}
                color="inherit"
                maxWidth={'sm'}>
                <DialogTitle id="customized-dialog-title">Add New Folder</DialogTitle>
                <DialogContent dividers fullwidth>
                    <TextField autoFocus margin="dense" id="name" label="Folder name" type="text" fullWidth/>
                    {f()}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default FormDialog;