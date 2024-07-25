import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import UserListPage from "./pages/UserListPage";
import AdminProductListPage from "./pages/AdminProductListPage";
import UserEditPage from "./pages/UserEditPage";
import OrderListPage from "./pages/OrderListPage";

const generateClassName = createGenerateClassName({
    productionPrefix: 'admin',
});

export default ({history}) => {
    const {
        auth,
        userList,
        userDelete,
        userDetails,
        userUpdate,
        productList,
        productDelete,
        productCreate,
        productUpdate,
        productDetails,
        orderList,
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

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route path='/admin/userlist' render={(props) => (
                        <UserListPage
                            history={props.history}
                            userLogin={auth}
                            userList={userList}
                            listUsers={listUsers}
                            userDelete={userDelete}
                            deleteUser={deleteUser}
                        />
                    )}
                    />
                    <Route path='/admin/user/:id/edit' render={(props) => (
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
                        path='/admin/products'
                        render={(props) => (
                            <AdminProductListPage
                                history={props.history}
                                match={props.match}
                                state={state}
                                listProducts={listProducts}
                                deleteProduct={deleteProduct}
                                productList={productList}
                                userLogin={auth}
                                productDelete={productDelete}
                            />
                        )}
                    />
                    <Route
                        path='/admin/products/:pageNumber'
                        component={AdminProductListPage}
                    />
                    <Route path='/admin/orderlist' component={(props) => (
                        <OrderListPage
                            history={props.history}
                            userLogin={auth}
                            orderList={orderList}
                            listOrders={listOrders}
                        />
                    )}/>
                </Switch>
            </StylesProvider>
        </Router>
    )
}