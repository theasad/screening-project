import React from 'react'
import { withRouter } from 'next/router';
import { Button, Box, Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../components/Layout.js';
import axios from 'axios'
import Head from 'next/head'
import Config from '../Config.js'
import { withStyles } from '@material-ui/styles';
import FolderLink from '../components/Folder'
import { Router } from '../routes'

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

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            active_folder: {},
            child_folders: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({ isLoading: true });
        const api_url = `${Config.API_BASE_URL}${this.props.router.query.slug}`
        axios.get(api_url)
            .then(response => {
                const response_data = response.data;
                const child_folders = response_data.child_folders;
                console.log(response)
                this.setState({
                    active_folder: {
                        'name': response_data.name,
                        'slug': response_data.slug,
                        'id': response_data.id,
                    },
                    child_folders: child_folders,
                    isLoading: false
                });
            }).catch(error => {
                // handle error
                console.log(error.message);
            })
    }

    handleClick(slug) {
        // With route name and params
        Router.pushRoute('folder', { slug: slug })
        // // With route URL
        // Router.pushRoute('/blog/hello-world')
    }

    render() {
        const { child_folders, isLoading } = this.state

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
                    {child_folders.map(folder => (
                        <Grid item key={folder.slug} className={classes.gridItem}>
                            <Paper onClick={this.handleClick(folder.slug)} className={classes.paper}>
                                <FolderLink classes={classes} folder={folder} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Layout>
        )
    }
}

export default withStyles(useStyles)(withRouter(Details));
