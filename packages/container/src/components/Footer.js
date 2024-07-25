import React from 'react';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'fixed',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '40px',
        backgroundColor: '#f8f9fa',
        zIndex: '500',
    },
    copyright: {
        color: theme.palette.text.secondary,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" align="center" className={classes.copyright}>
                {'Warszawa'}
                {' © '}
                {new Date().getFullYear()}
                {' Aleksandra Rataj - Master Thesis. All rights reserved.'}
            </Typography>
        </footer>
    );
};

export default Footer;
