import React from 'react';
import {Router, Route, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import Signup from './components/Signup'
import Signin from './components/Signin'

const generateClassName = createGenerateClassName({
    productionPrefix: 'authentication',
});

export default ({history, onSignIn}) => {
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route path='/authentication/signup'>
                        <Signup onSignIn={onSignIn}/>
                    </Route>
                    <Route path='/authentication/signin'>
                        <Signin onSignIn={onSignIn}/>
                    </Route>
                </Switch>
            </StylesProvider>
        </Router>
    );
}