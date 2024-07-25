import React from 'react';
import {Router, Route, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

const generateClassName = createGenerateClassName({
    productionPrefix: 'authentication',
});

export default ({history}) => {
    const {userRegister, auth, userDetails, userUpdateProfile, orderListMy, register, login, getUserDetails, updateUserProfile, listMyOrders} = useStore();

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route path='/authentication/signup' render={(props) => (
                        <SignupPage
                            location={props.location}
                            history={props.history}
                            userRegister={userRegister}
                            register={register}
                        />
                    )}/>
                    <Route path='/authentication/login' render={(props) => (
                        <LoginPage
                            location={props.location}
                            history={props.history}
                            userLogin={auth}
                            login={login}
                        />
                    )}/>
                    <Route path='/authentication/profile' render={(props) => (
                        <ProfilePage
                            history={props.history}
                            userLogin={auth}
                            userDetails={userDetails}
                            getUserDetails={getUserDetails}
                            userUpdateProfile={userUpdateProfile}
                            updateUserProfile={updateUserProfile}
                            listMyOrders={listMyOrders}
                            orderListMy={orderListMy}
                        />
                    )}/>
                </Switch>
            </StylesProvider>
        </Router>
    );
}