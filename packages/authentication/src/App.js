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
    const {state, register, login, getUserDetails, updateUserProfile, listMyOrders} = useStore();
    const {userRegister, userLogin, userDetails, userUpdateProfile, orderListMy} = state;

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
                            userLogin={userLogin}
                            login={login}
                        />
                    )}/>
                    <Route path='/authentication/profile' render={(props) => (
                        <ProfilePage
                            history={props.history}
                            userLogin={userLogin}
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