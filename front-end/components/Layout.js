import React, { Fragment } from 'react'
import Header from './Header'
import { Container, CssBaseline, withStyles } from '@material-ui/core';
import ActionButton from './ActionButton'
import Breadcrumbs from '../components/Breadcrumbs'
import AddFolder from '../components/AddFolder'
const useStyles = (theme => ({
    innerContainer: {
        marginTop: '5rem'
    }
}));

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddModalOpen: false
        }
    }
    addFolderModalHandler = () => {
        this.setState({
            isAddModalOpen: !this.state.isAddModalOpen,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth="lg" >
                    <Header classes={classes} />
                    <div className={classes.innerContainer}>
                        <Breadcrumbs breadCrumItems={this.props.breadCrumItems} />
                        {this.props.children}
                    </div>
                    <ActionButton addFolderModalHandler={this.addFolderModalHandler} />
                    <AddFolder handleClose={this.addFolderModalHandler} open={this.state.isAddModalOpen} />
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(useStyles)(Layout)