import React from 'react'
import Layout from '../components/Layout.js';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';
import Config from '../Config.js'
import Folders from '../components/Folders'
import Loader from '../components/Loader'
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
            breadCrumItems: []
        };
    }


    // abortController = new AbortController();


    fetchParentFolders = async () => {
        this.setState({ isLoading: true });
        await axios.get(Config.API_BASE_URL)
            .then(response => {
                const folders = response.data;
                this.setState({ folders: folders, isLoading: false, breadCrumItems: this.getBreadCrumItems() });
            }).catch(error => {
                console.log("err", error.name);
                if (error.name === "AbortError") return;
                throw error;
            })
    }

    componentDidMount() {
        this.fetchParentFolders();
    }



    // componentWillUnmount() {
    //     this.abortController.abort();
    // }


    handlerFolderForm = (data) => {
        this.setState({
            ...this.state,
            folders: [data, ...this.state.folders]
        })
    }

    getBreadCrumItems() {
        return {
            parents: [],
            active: { name: "Folders" }
        }

    }

    renderContent() {
        const { folders, isLoading, breadCrumItems } = this.state;
        if (isLoading) {
            return (
                <Layout>
                    <Head><title>Home-mDrive</title></Head>
                    <Loader />
                </Layout>
            );
        } else {
            return <Layout handlerFolderForm={this.handlerFolderForm} breadCrumItems={breadCrumItems}>
                <Head><title>Home-mDrive</title></Head>
                <Folders folders={folders} />
            </Layout>
        }
    }

    render() {
        return (this.renderContent())
    }
}

export default withStyles(useStyles)(Index)