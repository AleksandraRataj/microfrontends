import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import ProductCarousel from '../components/ProductCarousel';

const useStyles = makeStyles((theme) => ({
    '@global': {
        a: {
            textDecoration: 'none',
        },
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    buttonWrapper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

export default function LandingPage({productTopRated, listTopProducts}) {
    const styles = useStyles();

    return (
        <main className={styles.content}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                E-commerce Microfrontends App
            </Typography>
            <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
                style={{width: '70%'}}
            >
                This application was designed and developed as part of a master's thesis titled "Comparative Analysis of
                Microfrontends and Monolithic Solutions." The microfrontend architecture was chosen for its modern
                approach to web application design, enabling modularity, flexibility, and easier management of large
                development teams. This application will serve as a platform for conducting comparative research aimed
                at evaluating the performance, scalability, and maintenance of microfrontend systems compared to
                traditional monolithic solutions.
            </Typography>
            <div className={styles.buttonWrapper}>

                <Link to="/products">
                    <Button variant="contained" style={{backgroundColor: 'green', color: 'white'}}>
                        See all products
                    </Button>
                </Link>
            </div>
            <ProductCarousel
                productTopRated={productTopRated}
                listTopProducts={listTopProducts}
            />
        </main>
    );
}
