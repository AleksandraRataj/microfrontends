import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {createGenerateClassName, StylesProvider} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

import Header from './components/Header';
import Footer from './components/Footer';

import {useStore} from 'store/StoreApp';

const AuthenticationAppLazy = lazy(() => import('./microfrontends/AuthenticationApp'));
const AdminAppLazy = lazy(() => import('./microfrontends/AdminApp'));
const CartAppLazy = lazy(() => import('./microfrontends/CartApp'));
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'hsla(0,0%,96%,0.5)',
    },
    content: {
        flexGrow: '1',
        padding: '100px 0',
    }
}));

const Loading = () => <Box justifyContent="center" sx={{display: 'flex'}}>
    <CircularProgress/>
</Box>

export default ({history}) => {
    const styles = useStyles();

    const {auth, logout} = useStore();

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div className={styles.layout}>
                    <Header
                        auth={auth}
                        logout={logout}
                    />
                    <div className={styles.content}>
                        <Suspense fallback={<Loading/>}>
                            <Switch>
                                <Route path="/authentication" component={AuthenticationAppLazy}/>
                                <Route path="/admin" component={AdminAppLazy}/>
                                <Route path="/cart" component={CartAppLazy}/>
                                <Route path="/" component={ProductsAppLazy}/>
                            </Switch>
                        </Suspense>
                    </div>
                    <Footer/>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}