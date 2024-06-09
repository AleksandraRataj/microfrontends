import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {StylesProvider, createGenerateClassName} from "@material-ui/core";

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
    productionPrefix: 'marketing',
});

export default () => {
    return <div>
        <StylesProvider generateClassName>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/pricing' component={Pricing}/>
                </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>
}