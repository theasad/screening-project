import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { CreateNewFolderOutlined as FolderCreateIcon, CloudUploadOutlined as FileUploadIcon } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
    root: {
        height: 380,
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3)
    },
});

const actions = [
    { icon: <FolderCreateIcon />, name: 'Create New Folder' },
    { icon: <FileUploadIcon />, name: 'Upload New File' }
];

class SpeedDialTooltipOpen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }


    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));


    };

    handleItemClick =()=> {
        this.props.addFolderModalHandler()
        console.log(this.props);
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    icon={<MenuIcon />}
                    onBlur={this.handleClose}
                    onClick={this.handleClick}
                    onClose={this.handleClose}
                    onFocus={this.handleOpen}
                    onMouseEnter={this.handleOpen}
                    onMouseLeave={this.handleClose}
                    open={open}
                >
                    {actions.map(action => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={this.handleItemClick}
                        />
                    ))}
                </SpeedDial>
            </div>
        );
    }
}

SpeedDialTooltipOpen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeedDialTooltipOpen);
