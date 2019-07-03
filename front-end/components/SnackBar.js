import {SnackbarProvider, useSnackbar} from 'notistack';
import React from "react";

function MyApp(props) {
    const {message, variant} = props;
    const {enqueueSnackbar} = useSnackbar();
    return (enqueueSnackbar(message, {
        variant: variant,
        autoHideDuration: 1500
    }))

}

export default function SnackBar(props) {
    return <SnackbarProvider maxSnack={3}>
        <MyApp message={props.message} variant={props.variant}/>
    </SnackbarProvider>
}


