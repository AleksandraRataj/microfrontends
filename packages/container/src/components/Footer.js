// Footer.js
import React from 'react';

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#f8f9fa',
        padding: theme.spacing(4, 0),
    },
    section: {
        marginBottom: theme.spacing(2),
    },
    link: {
        marginBottom: theme.spacing(1),
        display: 'block',
    },
    copyright: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4} className={classes.section}>
                        <Typography variant="h6" gutterBottom>
                            Company
                        </Typography>
                        <ul>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.section}>
                        <Typography variant="h6" gutterBottom>
                            Resources
                        </Typography>
                        <ul>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.section}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <ul>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body1" className={classes.link}>
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Typography variant="body2" className={classes.copyright}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' Your Company. All rights reserved.'}
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
