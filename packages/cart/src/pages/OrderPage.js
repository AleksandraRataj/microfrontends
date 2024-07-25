import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, List, ListItem, Card, Button, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderPage = ({
                         match,
                         history,
                         getOrderDetails,
                         payOrder,
                         deliverOrder,
                         orderDetails,
                         userLogin,
                         orderPay,
                         orderDeliver
}) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const { order, loading, error } = orderDetails;

    const { userInfo } = userLogin;

    const { loading: loadingPay, success: successPay } = orderPay;

    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: 'ORDER_PAY_RESET' });
            dispatch({ type: 'ORDER_DELIVER_RESET' });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, successPay, successDeliver, order]);

    const successPaymentHandler = () => {
        dispatch(payOrder(orderId, {
            id: 'fake-payment-id',
            status: 'COMPLETED',
            update_time: new Date().toISOString(),
            payer: { email_address: 'fake@example.com' }
        }));
    };

    const deliverHandler = () => {
        history.push('/products');
        // dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <Button
                component={Link}
                to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
                variant="contained"
                color="primary"
                style={{ margin: '20px 0' }}
            >
                Go Back
            </Button>
            <Typography variant="h4">Order {order._id}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Shipping</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Name: ${order.user.name}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Email: `}>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`} />
                        </ListItem>
                        <ListItem>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListItem>
                        <ListItem>
                            <Typography variant="h5">Payment Method</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Method: ${order.paymentMethod}`} />
                        </ListItem>
                        <ListItem>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListItem>
                        <ListItem>
                            <Typography variant="h5">Order Items</Typography>
                        </ListItem>
                        {order.orderItems.length === 0 ? (
                            <Message>Your order is empty</Message>
                        ) : (
                            <List>
                                {order.orderItems.map((item, index) => (
                                    <ListItem key={index}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <ListItemAvatar>
                                                    <Avatar src={item.image} alt={item.name} variant="rounded" />
                                                </ListItemAvatar>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <ListItemText primary={`${item.qty} x R${item.price} = R${item.qty * item.price}`} />
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </List>
                </Grid>
                {/* Right Order Summary */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h5">Order Summary</Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>R{order.itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>R{order.shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>R{order.taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography><strong>Total</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography><strong>R{order.totalPrice}</strong></Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            {!order.isPaid && (
                                <ListItem>
                                    {loadingPay && <Loader />}
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={successPaymentHandler}
                                    >
                                        Pay Now (Fake Payment)
                                    </Button>
                                </ListItem>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListItem>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={deliverHandler}
                                    >
                                        Go back to products
                                    </Button>
                                </ListItem>
                            )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderPage;
