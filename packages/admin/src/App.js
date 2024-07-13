import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import UserListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import UserEditPage from "./pages/UserEditPage";
import OrderListPage from "./pages/OrderListPage";
import ProductEditPage from "./pages/ProductEditPage";

const generateClassName = createGenerateClassName({
    productionPrefix: 'admin',
});

export default ({history}) => {
    const {
        state,
        listUsers,
        deleteUser,
        getUserDetails,
        updateUser,
        listProducts,
        deleteProduct,
        createProduct,
        listProductDetails,
        updateProduct,
        listOrders
    } = useStore();
    const {
        userLogin,
        userList,
        userDelete,
        userDetails,
        userUpdate,
        productList,
        productDelete,
        productCreate,
        productUpdate,
        productDetails,
        orderList
    } = state;

    console.log(history.location)

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route exact path='/admin/userlist' render={(props) => (
                        <UserListPage
                            history={props.history}
                            userLogin={userLogin}
                            userList={userList}
                            listUsers={listUsers}
                            userDelete={userDelete}
                            deleteUser={deleteUser}
                        />
                    )}
                    />
                    <Route exact path='/admin/user/:id/edit' render={(props) => (
                        <UserEditPage
                            match={props.match}
                            history={props.history}
                            userDetails={userDetails}
                            getUserDetails={getUserDetails}
                            userUpdate={userUpdate}
                            updateUser={updateUser}
                        />
                    )}/>
                    <Route
                        exact
                        path='/admin/productlist'
                        render={(props) => (
                            <ProductListPage
                                match={props.match}
                                history={props.history}
                                productList={productList}
                                userLogin={userLogin}
                                productDelete={productDelete}
                                productCreate={productCreate}
                                listProducts={listProducts}
                                deleteProduct={deleteProduct}
                                createProduct={createProduct}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/admin/productlist/:pageNumber'
                        render={(props) => (
                            <ProductListPage
                                match={props.match}
                                history={props.history}
                                productList={productList}
                                userLogin={userLogin}
                                productDelete={productDelete}
                                productCreate={productCreate}
                                listProducts={listProducts}
                                deleteProduct={deleteProduct}
                                createProduct={createProduct}
                            />
                        )}
                    />
                    <Route path='/admin/product/:id/edit'
                           render={(props) => (
                               <ProductEditPage
                                   match={props.match}
                                   history={props.history}
                                   productDetails={productDetails}
                                   listProductDetails={listProductDetails}
                                   productUpdate={productUpdate}
                                   updateProduct={updateProduct}
                               />
                           )}
                    />
                    <Route path='/admin/orderlist' component={(prop) => (
                        <OrderListPage
                            history={props.history}
                            userLogin={userLogin}
                            orderList={orderList}
                            listOrders={listOrders}
                        />
                    )}/>
                </Switch>
            </StylesProvider>
        </Router>
    )
}