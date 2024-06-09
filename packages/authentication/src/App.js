import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {StylesProvider} from "@material-ui/core";

const AuthComponent = () => <div>
    <h1>Authentication App!</h1>
</div>

export default () => {
    return <div>
        <StylesProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={AuthComponent}/>
                </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>
}