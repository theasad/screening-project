import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {CreateNewFolderOutlined as FolderCreateIcon, CloudUploadOutlined as FileUploadIcon} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from "@material-ui/core/TextField";
import axios from 'axios'

import CONFIG from '../Config'

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
    {icon: <FolderCreateIcon/>, name: 'Create New Folder', code: 'folder'},
    {icon: <FileUploadIcon/>, name: 'Upload New File', code: 'file'}
];

class SpeedDialTooltipOpen extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isDisableFileUpload: true,
            open: false,
            selectedFiles: [],
            folder: this.props.folder.hasOwnProperty('id') ? this.props.folder.id : '',
            slug: this.props.folder.hasOwnProperty('slug') ? this.props.folder.slug : '',
        };
        console.log("---------------------")
        console.log(this.props.folder)
        console.log("---------------------")
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.folder.hasOwnProperty('id') && nextProps.folder.id !== this.props.folder.id) {
            this.setState({
                ...this.state,
                isDisableFileUpload: false,
                folder: nextProps.folder.id,
                slug: nextProps.folder.slug
            })
        }
    }


    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleItemClick = (code) => {
        if (code === 'folder') {
            this.props.addFolderModalHandler();
        } else {
            // let isDisableFileUpload = !this.props.folder.hasOwnProperty('id');
            this.setState({
                ...this.state,
                selectedFiles: []
            });
            this.upload.click();
        }
        console.log(code);
    };

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

    upload_handleChange = (event) => {
        this._isMounted = true;
        console.log('slug-' + this.state.slug);
        const files = event.target.files;
        if (files.length) {
            this.setState({
                ...this.state,
                selectedFiles: files
            });

            for (let file in files) {
                // console.log(file);
            }

            // for (let i = 0; i <= this.state.selectedFiles.length; i++) {
            //     let data = new FormData();
            //     data.append('file', this.state.selectedFiles[i]);
            //     data.append('folder', this.state.folder);
            //     let api_url = `${CONFIG.API_BASE_URL}${this.state.slug}/files/`;
            //     axios.post(api_url, data).then(response => {
            //         console.log(response);
            //     }).then(error => console.log(error))
            // }

            // files.map(file=>{
            //     console.log(file)
            //     let data = new FormData();
            //     data.append('file', file);
            //     data.append('folder', this.state.folder);
            //     let api_url = `${CONFIG.API_BASE_URL}${this.state.slug}/files/`;
            //     axios.post(api_url, data).then(response => {
            //         console.log(response);
            //     }).then(error => console.log(error))
            // });
            this._isMounted = false;
        } else {
            this.setState({
                ...this.state,
                selectedFiles: []
            });
        }
    };


    render() {
        const {classes, folder} = this.props;
        const {open} = this.state;
        console.log("=====================open folder =======================");
        console.log(folder);
        console.log("=====================open folder =======================");
        return (
            <div className={classes.root}>
                {this.state.files}
                <TextField
                    inputRef={(ref) => this.upload = ref}
                    error={false}
                    style={{display: 'none'}}
                    onChange={this.upload_handleChange} autoFocus
                    id="file-upload" label="Upload File"
                    inputProps={{'multiple': true}}
                    type="file" fullWidth/>
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    icon={<MenuIcon/>}
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
                            disabled={action.code === 'file' ? this.state.isDisableFileUpload : false}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => this.handleItemClick(action.code)}
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
