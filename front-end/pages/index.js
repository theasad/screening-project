import React, { useEffect } from 'react'
import Layout from '../components/Layout.js';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';
import Config from '../Config.js'
import Folders from '../components/Folders'
import Loader from '../components/Loader'
import AddFolder from '../components/AddFolder'
import SnackBar from "../components/SnackBar";
import ActionButton from "../components/ActionButton";
import { withRouter } from 'next/router';
import CONFIG from "../Config";

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
    _isMounted = false;

    constructor(props) {

        super(props);

        this.state = {
            folders: [],
            files: [],
            slug: null,
            isLoading: false,
            isAddModalOpen: false,
            isOpenSnackBar: false,
            snackBarVaritant: 'success',
            snackBarMessage: '',
            breadCrumItems: {
                parents: [],
                active: { name: "Folders" }
            }
        };
    }

    fetchFolders = async (slug = null) => {

        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ breadCrumItems: this.getBreadCrumItems(), isLoading: true, isOpenSnackBar: false });
        }
        let API_URL = `${Config.API_BASE_URL}${slug != null ? slug : ''}`;

        await axios.get(API_URL)
            .then(response => {
                const data = response.data;
                if (this._isMounted) {
                    if (data.hasOwnProperty('child_folders')) {
                        this.setState({
                            folders: data.child_folders,
                            isLoading: false,
                            breadCrumItems: data.breadcrumb_folders,
                            slug: slug
                        });
                    } else {
                        this.setState({ folders: data, isLoading: false, breadCrumItems: this.getBreadCrumItems() });
                    }
                }
            }).catch(error => {
                throw error;
            })
    }

    componentDidMount() {
        const slug = this.props.router.query.slug;
        this.fetchFolders(slug);
        if (slug)
            this.getFiles();
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.router.query.slug !== this.props.router.query.slug) {
            const slug = nextProps.router.query.slug;
            this.fetchFolders(slug);
            this.getFiles();
        } else if (this.state.isOpenSnackBar && !nextProps.router.query.slug) {
            this.fetchFolders();
            console.log("000000000000000000000000000")
        }
    }

    // Save Folder

    saveFolder = async (data) => {
        this.setState({ isLoading: true });
        this._isMounted = true;
        await axios.post(Config.API_BASE_URL, data)
            .then(response => {
                if (this._isMounted) {
                    const data = response.data;
                    this.setState({
                        ...this.state,
                        isAddModalOpen: false,
                        folders: [data, ...this.state.folders],
                        isOpenSnackBar: true,
                        snackBarVaritant: 'success',
                        snackBarMessage: "Folder successfully created.",
                        isLoading: false
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlerFolderForm = (data) => {
        this.saveFolder(data)
    }


    // get files
    getFiles = async () => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ breadCrumItems: this.getBreadCrumItems(), isLoading: true, isOpenSnackBar: false });
        }
        let API_URL = `${Config.API_BASE_URL}${this.state.slug}/files`;

        await axios.get(API_URL)
            .then(response => {
                const data = response.data;
                if (this._isMounted) {
                    this.setState({
                        files: data,
                        isLoading: false
                    });
                }
            }).catch(error => {
                throw error;
            })
    }

    // Save file

    handleFileUploadForm = async (formData, filename) => {
        let api_url = `${CONFIG.API_BASE_URL}${this.state.slug}/files/`;
        this._isMounted = true;
        this.setState({ isLoading: true, isOpenSnackBar: false });

        await axios.post(api_url, formData).then(response => {
            if (this._isMounted) {
                const file = response.data;
                this.setState({
                    files: [file, ...this.state.files],
                    isLoading: false,
                    isOpenSnackBar: true,
                    snackBarVaritant: 'success',
                    snackBarMessage: `${filename} successfully uploaded.`,
                });
            }
        }).catch(error => {
            const errors = error.response.data;
            errors.file.forEach((error, i) => {
                this.setState({
                    isLoading: false,
                    isOpenSnackBar: true,
                    snackBarVaritant: 'error',
                    snackBarMessage: `${error} (${filename})`,
                });
            });
            console.log(errors);
        });
    }

    getBreadCrumItems() {
        return {
            parents: [],
            active: { name: "Folders" }
        }

    }

    onFolderClick = () => {
        this.setState({ ...this.state, isOpenSnackBar: false });
    }


    addFolderModalHandler = () => {
        this.setState({
            isOpenSnackBar: false,
            isAddModalOpen: !this.state.isAddModalOpen
        });
    }

    renderAddForm() {
        if (this.state.isAddModalOpen) {
            return <AddFolder opnefolder={this.state.breadCrumItems.active} handlerFolderForm={this.handlerFolderForm}
                handleClose={this.addFolderModalHandler} open={this.state.isAddModalOpen} />
        }
    }

    handleSnackBarClose = () => {
        console.log("Closed Snackbar");
        // this.setState({ isOpenSnackBar: false });
    }

    renderSnackBar() {
        if (this.state.isOpenSnackBar) {
            return <SnackBar handleSnackBarClose={this.handleSnackBarClose} message={this.state.snackBarMessage}
                variant={this.state.snackBarVaritant} open={this.state.isOpenSnackBar} />
        }
    }



    renderContent() {
        const { folders, isLoading, breadCrumItems } = this.state;
        return <Layout breadCrumItems={breadCrumItems} isLoading={isLoading}>
            <Head><title>Home-mDrive</title></Head>
            <Folders onFolderClick={this.onFolderClick} folders={folders} />
            <ActionButton handleFileUploadForm={this.handleFileUploadForm}
                addFolderModalHandler={this.addFolderModalHandler}
                folder={this.state.breadCrumItems.active} />

            {this.renderAddForm()}
            {this.renderSnackBar()}
        </Layout>
    }


    render() {
        return (
            <React.Fragment>
                {this.renderContent()}
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(withRouter(Index))