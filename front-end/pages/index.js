import React from 'react'
import Layout from '../components/Layout.js';
import axios from 'axios';
import FolderLink from '../components/Folder'
import { Button, Box, Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';
import Config from '../Config.js'

const useStyles = (theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: 'auto',
    },
    paper: {
        textAlign: 'left',
    },
    gridItem: {
        margin: theme.spacing(0.75),
        padding: 0 + '!important'
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 'calc(100vh - 70px)'
    }
}));

class Index extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            folders: [],
            isLoading: false,
        };
    }



    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get(Config.API_BASE_URL)
            .then(response => {
                const folders = response.data;
                this.setState({ folders: folders, isLoading: false });
            }).catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {
        const { folders, isLoading } = this.state;
        const { classes } = this.props;
        if (isLoading) {
            return (
                <Layout>
                    <Head><title>Home-mDrive</title></Head>
                    <Grid container>
                        <div className={classes.loader}>
                            <CircularProgress color="secondary" />
                        </div>
                    </Grid>
                </Layout>
            );
        }
        return (
            <Layout>
                <Head><title>Home-mDrive</title></Head>
                <Grid container className={classes.root} spacing={1}>
                    {folders.map(folder => (
                        <Grid item key={folder.slug} className={classes.gridItem}>
                            <Paper className={classes.paper}>
                                <FolderLink classes={classes} folder={folder} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Layout>
        );
    }
}

export default withStyles(useStyles)(Index)