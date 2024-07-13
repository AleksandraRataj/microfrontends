import React from 'react';
import {Route, Router, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import ProductListScreen from "./pages/ProductListScreen";

const generateClassName = createGenerateClassName({
    productionPrefix: 'products',
});

export default ({history}) => {
    const {state, listProducts, createProduct, deleteProduct} = useStore();
    const {productList, userLogin, productDelete, productCreate} = state;

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>dupa</div>
                <Switch>
                    <Route
                        path='/admin/productlist'
                        exact
                        render={(props) => (
                            <ProductListScreen
                                history={history}
                                match={props.match}
                                state={state}
                                listProducts={listProducts}
                                createProduct={createProduct}
                                deleteProduct={deleteProduct}
                                productList={productList}
                                userLogin={userLogin}
                                productDelete={productDelete}
                                productCreate={productCreate}
                            />
                        )}
                    />
                    {/*<Route*/}
                    {/*    path='/admin/productlist/:pageNumber'*/}
                    {/*    component={ProductListScreen}*/}
                    {/*    exact*/}
                    {/*/>*/}
                </Switch>
            </StylesProvider>
        </Router>
    );
}