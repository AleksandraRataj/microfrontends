import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {StylesProvider} from "@material-ui/core";

const DashboardComponent = () => <div>
    <h1>Dashboard App!</h1>
</div>

export default () => {
    return <div>
        <StylesProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={DashboardComponent}/>
                </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>
}