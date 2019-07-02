import React from 'react'
import { withRouter } from 'next/router';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Layout from '../components/Layout.js';
import axios from 'axios'
import Head from 'next/head'
import Config from '../Config.js'
import { withStyles } from '@material-ui/styles';
import Folders from '../components/Folders';
import Loader from '../components/Loader';
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
        margin: 5,
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
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            folders: [],
            slug: this.props.router.query.slug,
            breadCrumItems: {
                parents: [],
                active: { name: "Folders" }
            }
        }
    }
    componentDidMount() {
        this.fetchFolderDetails(this.state.slug)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.router.query.slug !== this.props.router.query.slug) {
            const slug = nextProps.router.query.slug;
            this.fetchFolderDetails(slug);
        }
    }

    fetchFolderDetails = async (slug) => {
        this.setState({ isLoading: true });
        this._isMounted = true;
        const api_url = `${Config.API_BASE_URL}${slug}`;
        await axios.get(api_url)
            .then(response => {
                const response_data = response.data;
                const child_folders = response_data.child_folders;
                const breadcrumb_folders = response_data.breadcrumb_folders;
                if (this._isMounted) {
                    this.setState({
                        folders: child_folders,
                        isLoading: false,
                        slug: slug,
                        breadCrumItems: breadcrumb_folders
                    });
                }
            }).catch(error => {
                // handle error
                console.log(error.message);
            })
    };

    componentWillUnmount() {
        this._isMounted = false;
    }


    handlerFolderForm = (data) => {
        this.setState({
            ...this.state,
            folders: [data, ...this.state.folders]
        })
    };

    renderContent() {
        const { folders, isLoading, breadCrumItems } = this.state;
        if (isLoading) {
            return (
                <Layout breadCrumItems={breadCrumItems}>
                    <Head><title>Home-Loading folder</title></Head>
                    <Loader />
                </Layout>
            );
        } else {
            return <Layout handlerFolderForm={this.handlerFolderForm} breadCrumItems={breadCrumItems}>
                <Head><title>Home-{breadCrumItems.active.name}</title></Head>
                <Folders folders={folders} />
            </Layout>
        }
    }

    render() {
        return (this.renderContent())
    }
}

export default withStyles(useStyles)(withRouter(Details));
