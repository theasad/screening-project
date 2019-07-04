import React from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {
    const { message, variant } = props;
    const { enqueueSnackbar } = useSnackbar();

    function hide(key) {
        console.log("Trigger for closing snackbar.");
    }


    enqueueSnackbar(message, {
        variant: variant,
        onClose: hide,
    })
    return (<h1 style={{ display: 'none' }}>Snackbar Loading...</h1>)

}

export default function SnackBar(props) {
    return <SnackbarProvider maxSnack={3}>
        <MyApp handleSnackBarClose={props.handleSnackBarClose} message={props.message} variant={props.variant} />
    </SnackbarProvider>
}


