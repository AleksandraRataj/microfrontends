import React, {lazy, Suspense, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {createGenerateClassName, StylesProvider} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {useStore} from 'store/StoreApp';

import Header from './components/Header';
import Footer from './components/Footer';

const AuthenticationAppLazy = lazy(() => import('./microfrontends/AuthenticationApp'));
const AdminAppLazy = lazy(() => import('./microfrontends/AdminApp'));
const MarketingAppLazy = lazy(() => import('./microfrontends/MarketingApp'));
const ProductsAppLazy = lazy(() => import('./microfrontends/ProductsApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'container',
});

const useStyles = makeStyles(() => ({
    '@global': {
        'body': {
            margin: '0',
        },
    },
    layout: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    content : {
        minHeight: '100%',
        flexGrow: '1',
    }
}));

const Loading = () => <Box justifyContent="center" sx={{ display: 'flex' }}>
    <CircularProgress />
</Box>

export default () => {
    const styles = useStyles();
    const {state, logout} = useStore();

    const {userLogin} = state;

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div className={styles.layout}>
                    <Header
                        userLogin={userLogin}
                        logout={logout}
                    />
                    <div className={styles.content}>
                        <Suspense fallback={<Loading/>}>
                            <Switch>
                                <Route path="/admin" component={AdminAppLazy}/>
                                <Route path="/authentication" component={AuthenticationAppLazy}/>
                                <Route path="/marketing" component={MarketingAppLazy}/>
                                <Route path="/products" component={ProductsAppLazy}/>
                                <Route exact path="/" component={MarketingAppLazy}/>
                            </Switch>
                        </Suspense>
                    </div>
                    <Footer/>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}