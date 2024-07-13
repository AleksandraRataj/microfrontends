import React from 'react';
import {Router, Route, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
    productionPrefix: 'marketing',
});

export default ({history}) => {
    const {state, listTopProducts} = useStore();
    const {productTopRated, } = state;

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route exact path='/pricing' component={Pricing}/>
                    <Route exact path='/'>
                        <Landing
                            productTopRated={productTopRated}
                            listTopProducts={listTopProducts}
                        />
                    </Route>
                </Switch>
            </StylesProvider>
        </Router>
    );
}