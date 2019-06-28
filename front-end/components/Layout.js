import React, { Fragment } from 'react'
import Header from './Header'
import { Container, CssBaseline, withStyles } from '@material-ui/core';
import ActionButton from './ActionButton'
const useStyles = (theme => ({
    innerContainer: {
        marginTop: '5rem'
    }
}));

class Layout extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth="lg" >
                    <Header classes={classes} />
                    <div className={classes.innerContainer}>
                        {this.props.children}
                    </div>
                    <ActionButton />
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(useStyles)(Layout)