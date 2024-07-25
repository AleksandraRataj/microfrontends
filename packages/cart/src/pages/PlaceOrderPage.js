import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, List, ListItem, Card, Button, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderPage = ({ history, cart, createOrder, orderCreate }) => {
    const dispatch = useDispatch();

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 150);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/cart/order/${order._id}`);
            dispatch({ type: 'USER_DETAILS_RESET' });
            dispatch({ type: 'ORDER_CREATE_RESET' });
        }
    }, [history, success, dispatch, order]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    };

    return (
        <React.Fragment>
            <CheckoutSteps step1 step2 step3 step4 />
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <List>
                            <ListItem>
                                <Typography variant="h5">Shipping</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`${cart.shippingAddress.address}, ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`} />
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Method: ${cart.paymentMethod}`} />
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">Order Items</Typography>
                            </ListItem>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <List>
                                    {cart.cartItems.map((item, index) => (
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
                                                    <ListItemText primary={`${item.qty} x $${item.price} = $${item.qty * item.price}`} />
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </List>
                    </Grid>
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
                                            <Typography>${itemsPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Shipping</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>${shippingPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography>Tax</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>${taxPrice}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography><strong>Total</strong></Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography><strong>${totalPrice}</strong></Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    {error && <Message variant="danger">{error}</Message>}
                                </ListItem>
                                <ListItem>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={cart.cartItems.length === 0}
                                        onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default PlaceOrderPage;
