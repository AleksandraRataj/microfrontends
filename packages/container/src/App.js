import React from 'react';
import AuthenticationApp from "./components/AuthenticationApp";
import MarketingApp from "./components/MarketingApp";

export default () => {
    return <div>
        <h1>Hi from container!</h1>
        <AuthenticationApp/>
        <MarketingApp/>
    </div>
}