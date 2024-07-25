import React from 'react';
import {Router, Route, Switch} from "react-router-dom";

import {createGenerateClassName, StylesProvider} from "@material-ui/core";

import CartPage from './pages/CartPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'

import {useStore} from 'store/StoreApp';

const generateClassName = createGenerateClassName({
    productionPrefix: 'cart',
});

export default ({history}) => {
    const {
        cart,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        createOrder,
        orderCreate,
        getOrderDetails,
        payOrder,
        deliverOrder,
        orderDetails,
        auth,
        orderPay,
        orderDeliver
    } = useStore();

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <Switch>
                    <Route
                        exact
                        path='/cart/shipping'
                        render={(props) => (
                            <ShippingPage
                                history={props.history}
                                cart={cart}
                                saveShippingAddress={saveShippingAddress}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/cart/payment'
                        render={(props) => (
                            <PaymentPage
                                history={props.history}
                                cart={cart}
                                savePaymentMethod={savePaymentMethod}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/cart/placeorder'
                        render={(props) => (
                            <PlaceOrderPage
                                history={props.history}
                                cart={cart}
                                createOrder={createOrder}
                                orderCreate={orderCreate}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/cart/order/:id'
                        render={(props) => (
                            <OrderPage
                                match={props.match}
                                history={props.history}
                                getOrderDetails={getOrderDetails}
                                payOrder={payOrder}
                                deliverOrder={deliverOrder}
                                orderDetails={orderDetails}
                                userLogin={auth}
                                orderPay={orderPay}
                                orderDeliver={orderDeliver}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/cart/:id?'
                        render={(props) => (
                            <CartPage
                                match={props.match}
                                location={props.location}
                                history={props.history}
                                cart={cart}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        )}
                    />
                </Switch>
            </StylesProvider>
        </Router>
    );
}