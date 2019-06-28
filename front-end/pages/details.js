import React from 'react'
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../components/Layout.js';
import axios from 'axios'
import Head from 'next/head'
import Config from '../Config.js'
import { withStyles } from '@material-ui/styles';
import Folders from '../components/Folders.js';

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
            folders: [],
            slug: this.props.router.query.slug
        }
    }
    componentWillMount() {
        this.fetchFolderDetails(this.state.slug)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.router.query.slug !== this.props.router.query.slug) {
            const slug = nextProps.router.query.slug
            this.setState({ slug: slug });
            this.fetchFolderDetails(slug);
        }
    }

    fetchFolderDetails = async (slug) => {
        console.log(this.props)
        this.setState({ isLoading: true });
        const api_url = `${Config.API_BASE_URL}${slug}`
        await axios.get(api_url)
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
                    folders: child_folders,
                    isLoading: false,
                    slug: slug
                });
            }).catch(error => {
                // handle error
                console.log(error.message);
            })
    }

    render() {
        const { folders, isLoading } = this.state
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
                <Folders folders={folders} />
            </Layout>
        )
    }
}

export default withStyles(useStyles)(withRouter(Details));
