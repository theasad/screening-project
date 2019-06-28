import React from 'react'
import { Link } from '../routes'
import { Button, Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Folder as FolderIcon } from '@material-ui/icons'

export default function Folder(props) {
    const useStyles = makeStyles(theme => ({
        folder: {
            padding: theme.spacing(2),
            backgroundColor: '#fff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            color: props.folder.color,
            transition: 'all 0.3s ease-out',
            borderRadius: 4,
            '&:hover': {
                backgroundColor: props.folder.color,
                color: '#fff',
            }
        },
        driveFolderIcon: {
            marginRight: theme.spacing(.50)
        }
    }));
    const classes = useStyles();
    return <div> <FolderIcon className={classes.driveFolderIcon} /> <span>{props.folder.name}</span></div>
    // return <Link route='folder' params={{ slug: props.folder.slug }}>
    //     <a className={classes.folder}>
    //         <FolderIcon className={classes.driveFolderIcon} /> <span>{props.folder.name}</span>
    //     </a>
    // </Link>

};