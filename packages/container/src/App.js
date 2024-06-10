import React, {lazy, Suspense, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import Header from './components/Header';
import Footer from './components/Footer';
import Copyrights from './components/Copyrights';

const AuthenticationAppLazy = lazy(() => import('./microfrontends/AuthenticationApp'));
const MarketingAppLazy = lazy(() => import('./microfrontends/MarketingApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'container',
});

const Loading = () => <Box justifyContent="center" sx={{ display: 'flex' }}>
    <CircularProgress />
</Box>

export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <Header isAuthenticated={isAuthenticated} onSignOut={() => setIsAuthenticated(false)}/>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path="/authentication" >
                            <AuthenticationAppLazy
                                onSignIn={()=> setIsAuthenticated(true)}
                            />
                        </Route>
                        <Route path="/" component={MarketingAppLazy}/>
                    </Switch>
                </Suspense>
                <Footer/>
                <Copyrights/>
            </StylesProvider>
        </BrowserRouter>
    );
}