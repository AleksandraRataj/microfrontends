import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AuthenticationApp from "./components/AuthenticationApp";
import MarketingApp from "./components/MarketingApp";
import Header from './components/Header';
import Footer from './components/Footer';

import {StylesProvider, createGenerateClassName} from "@material-ui/core";

const generateClassName = createGenerateClassName({
    productionPrefix: 'container',
});

export default () => {
    return (
        <StylesProvider generateClassName>
            <BrowserRouter>
                <Header/>
                {/*<AuthenticationApp/>*/}
                <MarketingApp/>
                <Footer/>
            </BrowserRouter>
        </StylesProvider>
    );
}