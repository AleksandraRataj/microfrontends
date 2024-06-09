import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AuthenticationApp from "./components/AuthenticationApp";
import MarketingApp from "./components/MarketingApp";
import Layout from './components/Layout';

import {StylesProvider, createGenerateClassName} from "@material-ui/core";

const generateClassName = createGenerateClassName({
    productionPrefix: 'container',
});

export default () => {
    return (
        <StylesProvider generateClassName>
            <BrowserRouter>
                <Layout>
                    {/*<AuthenticationApp/>*/}
                    <MarketingApp/>
                </Layout>
            </BrowserRouter>
        </StylesProvider>
    );
}