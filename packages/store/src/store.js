import React from "react";
import axios from 'axios';
import {Provider, useSelector} from "react-redux";
import {applyMiddleware, combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    deleteUser,
    getUserDetails,
    listUsers,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
} from './actions/userActions'

import {addToCart, removeFromCart, savePaymentMethod, saveShippingAddress} from './actions/cartActions'

import {
    createProduct,
    createProductReview,
    deleteProduct,
    listProductDetails,
    listProducts,
    listTopProducts,
    updateProduct,
} from './actions/productActions'

import {createOrder, deliverOrder, getOrderDetails, listMyOrders, listOrders, payOrder,} from './actions/orderActions';

import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productUpdateReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderDeliver: orderDeliverReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
});


const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk];

const store = configureStore({
    reducer: reducer,
    initialState: initialState,
    devTools: composeWithDevTools(applyMiddleware(...middleware))
});

export function useStore() {
    const state = useSelector((state) => state);

    return {
        state,
        login,
        logout,
        register,
        getUserDetails,
        updateUserProfile,
        listUsers,
        deleteUser,
        updateUser,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        listProducts,
        listProductDetails,
        deleteProduct,
        createProduct,
        updateProduct,
        createProductReview,
        listTopProducts,
        createOrder,
        getOrderDetails,
        payOrder,
        listMyOrders,
        listOrders,
        deliverOrder,
    };
}

export function StoreProvider({children}) {
    return <Provider store={store}>{children}</Provider>;
}