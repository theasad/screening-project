import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 'calc(100vh - 70px)'
    }
}))

const Loader = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Head><title>Home-mDrive</title></Head>
            <Grid container>
                <div className={classes.loader}>
                    <CircularProgress color="secondary" />
                </div>
            </Grid>
        </React.Fragment>
    );
}

export default Loader