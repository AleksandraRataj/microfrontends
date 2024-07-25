import React from "react";
import { Provider, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    deleteUser,
    getUserDetails,
    listUsers,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
} from './actions/userActions';

import { addToCart, removeFromCart, savePaymentMethod, saveShippingAddress } from './actions/cartActions';

import {
    createProduct,
    createProductReview,
    deleteProduct,
    listProductDetails,
    listProducts,
    listTopProducts,
    updateProduct,
} from './actions/productActions';

import { createOrder, deliverOrder, getOrderDetails, listMyOrders, listOrders, payOrder } from './actions/orderActions';

import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer,
} from './reducers/orderReducers';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

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

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userLogin"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            ignoredActionPaths: ['register', 'rehydrate'],
            ignoredPaths: ['register', 'rehydrate'],
        },
        thunk,
    }),
    preloadedState: initialState,
    initialState: initialState,
    devTools: composeWithDevTools(applyMiddleware()),
});

const persistor = persistStore(store);
const selectAuth = (state) => state.userLogin;
const selectCart = (state) => state.cart;
const selectProductList = (state) => state.productList;
const selectProductDetails = (state) => state.productDetails;
const selectUserRegister = (state) => state.userRegister;
const selectUserDetails = (state) => state.userDetails;
const selectUserUpdateProfile = (state) => state.userUpdateProfile;
const selectUserList = (state) => state.userList;
const selectUserUpdate = (state) => state.userUpdate;
const selectUserDelete = (state) => state.userDelete;
const selectOrderCreate = (state) => state.orderCreate;
const selectOrderDetails = (state) => state.orderDetails;
const selectOrderPay = (state) => state.orderPay;
const selectOrderListMy = (state) => state.orderListMy;
const selectOrderDeliver = (state) => state.orderDeliver;
const selectProductDelete = (state) => state.productDelete;
const selectProductCreate = (state) => state.productCreate;
const selectProductUpdate = (state) => state.productUpdate;
const selectOrderList = (state) => state.orderList;
const selectProductReviewCreate = (state) => state.productReviewCreate;
const selectProductTopRated = (state) => state.productTopRated;

export function useStore() {
    const auth = useSelector(selectAuth);
    const cart = useSelector(selectCart);
    const productList = useSelector(selectProductList);
    const productDetails = useSelector(selectProductDetails);
    const userRegister = useSelector(selectUserRegister);
    const userDetails = useSelector(selectUserDetails);
    const userUpdateProfile = useSelector(selectUserUpdateProfile);
    const userList = useSelector(selectUserList);
    const userUpdate = useSelector(selectUserUpdate);
    const userDelete = useSelector(selectUserDelete);
    const orderCreate = useSelector(selectOrderCreate);
    const orderDetails = useSelector(selectOrderDetails);
    const orderPay = useSelector(selectOrderPay);
    const orderListMy = useSelector(selectOrderListMy);
    const orderDeliver = useSelector(selectOrderDeliver);
    const productDelete = useSelector(selectProductDelete);
    const productCreate = useSelector(selectProductCreate);
    const productUpdate = useSelector(selectProductUpdate);
    const orderList = useSelector(selectOrderList);
    const productReviewCreate = useSelector(selectProductReviewCreate);
    const productTopRated = useSelector(selectProductTopRated);

    return {
        auth,
        cart,
        productList,
        productDetails,
        userRegister,
        userDetails,
        userUpdateProfile,
        userList,
        userUpdate,
        userDelete,
        orderCreate,
        orderDetails,
        orderPay,
        orderListMy,
        orderDeliver,
        productDelete,
        productCreate,
        productUpdate,
        orderList,
        productReviewCreate,
        productTopRated,
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

export function StoreProvider({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
