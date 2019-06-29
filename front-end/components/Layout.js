import React, { Fragment } from 'react'
import Header from './Header'
import { Container, CssBaseline, withStyles } from '@material-ui/core';
import ActionButton from './ActionButton'
import Breadcrumbs from '../components/Breadcrumbs'
import AddFolder from '../components/AddFolder'
import SnackBar from "../components/SnackBar";

const useStyles = (theme => ({
    innerContainer: {
        marginTop: '5rem'
    }
}));

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddModalOpen: false,
            parent: {},
            isLoading: false,
            snackBarVaritant: 'success',
            isOpenSnackBar: false,
            snackBarMessage: ''
        }
    }
    handlerFolderForm = (data) => {
        this.props.handlerFolderForm(data)
    }

    addFolderModalHandler = () => {
        this.setState({
            isAddModalOpen: !this.state.isAddModalOpen,
            parent: this.props.breadCrumItems.active
        })
    }

    handlerFolderForm = (data, isSuccess = false) => {
        let snackBarVaritant = this.state.snackBarVaritant
        let snackBarMessage = 'Failed to creating folder'
        if (isSuccess) {
            snackBarMessage = `Folder successfully created`
            this.setState({ isAddModalOpen: false });
        } else {
            snackBarVaritant = 'error'
        }

        this.setState({
            ...this.state,
            isOpenSnackBar: true,
            snackBarVaritant: snackBarVaritant,
            snackBarMessage
        })
        this.props.handlerFolderForm(data);
    }

    handleSnackBarClose = () => {

        this.setState({
            ...this.state,
            isOpenSnackBar: false,
            snackBarVaritant: 'success',
            snackBarMessage: ""
        })
    }

    renderAddForm() {
        if (this.state.isAddModalOpen) {
            return <AddFolder opnefolder={this.state.parent} handlerFolderForm={this.handlerFolderForm} handleClose={this.addFolderModalHandler} open={this.state.isAddModalOpen} />
        }
    }

    renderSnackBar() {
        if (this.state.isOpenSnackBar) {
            return <SnackBar handleClose={this.handleSnackBarClose} message={this.state.snackBarMessage} variant={this.state.snackBarVaritant} open={this.state.isOpenSnackBar} />
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth="lg" >
                    <Header classes={classes} addFolderModalHandler={this.addFolderModalHandler} />
                    <div className={classes.innerContainer}>
                        <Breadcrumbs breadCrumItems={this.props.breadCrumItems} />
                        {this.props.children}
                    </div>
                    <ActionButton addFolderModalHandler={this.addFolderModalHandler} />
                    {this.renderAddForm()}
                    {this.renderSnackBar()}
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(useStyles)(Layout)