import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AuthenticationApp from "./components/AuthenticationApp";
import MarketingApp from "./components/MarketingApp";
import Header from './components/Header';


export default () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <AuthenticationApp/>
                <MarketingApp/>
            </div>
        </BrowserRouter>
    );
}