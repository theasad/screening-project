import React, { Fragment } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/CloseOutlined'
function MyApp(props) {
    const { message, variant } = props;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function hide(key) {
        // console.log(key);
        // closeSnackbar(key);
        // props.handleSnackBarClose();
    }


    enqueueSnackbar(message, {
        // persist: true,
        variant: variant,
        onClose: hide,
        // autoHideDuration: 2500,
        // action: key => (
        //     <Button color="secondary" size="small" onClick={() => hide(key)}>
        //         <CloseIcon style={{ color: '#fff' }} />
        //     </Button>
        // ),
        // children: key => {
        //     console.log(key)
        // }
    })
    // closeSnackbar(key);
    return (<h1 style={{ display: 'none' }}>Snackbar Loading...</h1>)

}

export default function SnackBar(props) {
    return <SnackbarProvider maxSnack={3}>
        <MyApp handleSnackBarClose={props.handleSnackBarClose} message={props.message} variant={props.variant} />
    </SnackbarProvider>
}


