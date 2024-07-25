import React from 'react';
import {Route, Router, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import {useStore} from 'store/StoreApp';

import LandingPage from './pages/LandingPage'
import ProductPage from "./pages/ProductPage";
import ProductListPage from "./pages/ProductListPage";
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from "./pages/ProductEditPage";

const generateClassName = createGenerateClassName({
    productionPrefix: 'products',
});

export default ({history}) => {
    const {
        productList,
        auth,
        productDelete,
        productCreate,
        productDetails,
        productUpdate,
        productTopRated,
        productReviewCreate,
        listProducts,
        createProduct,
        deleteProduct,
        listTopProducts,
        listProductDetails,
        updateProduct,
        createProductReview
    } = useStore();

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route exact path='/'>
                        <LandingPage
                            productTopRated={productTopRated}
                            listTopProducts={listTopProducts}
                        />
                    </Route>
                    <Route
                        exact
                        path='/products'
                        render={(props) => (
                            <ProductListPage
                                match={props.match}
                                listProducts={listProducts}
                                productList={productList}
                            />
                        )}
                    />
                    <Route
                        path='/product/:id'
                        render={(props) => (
                            <ProductPage
                                history={props.history}
                                match={props.match}
                                listProductDetails={listProductDetails}
                                createProductReview={createProductReview}
                                productDetails={productDetails}
                                userLogin={auth}
                                productReviewCreate={productReviewCreate}
                            />
                        )}
                    />
                    <Route
                        path='/admin/product/create'
                        render={(props) => (
                            <ProductCreatePage
                                history={props.history}
                                userLogin={auth}
                                createProduct={createProduct}
                                productCreate={productCreate}
                            />
                        )}
                    />
                    <Route
                        path='/admin/product/:id/edit'
                        render={(props) => (
                            <ProductEditPage
                                match={props.match}
                                history={props.history}
                                listProductDetails={listProductDetails}
                                productDetails={productDetails}
                                updateProduct={updateProduct}
                                productUpdate={productUpdate}
                            />
                        )}
                    />
                </Switch>
            </StylesProvider>
        </Router>
    );
}