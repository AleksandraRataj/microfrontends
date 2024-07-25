import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = ({ history, cart, saveShippingAddress }) => {
    const dispatch = useDispatch();

    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        history.push('/cart/payment');
    };

    return (
        <Container maxWidth="sm">
            <CheckoutSteps step1 step2 />
            <Typography variant="h4" component="h1" gutterBottom>
                Shipping
            </Typography>
            <form onSubmit={submitHandler}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="city"
                        label="City"
                        variant="outlined"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="postalCode"
                        label="Postal Code"
                        variant="outlined"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        id="country"
                        label="Country"
                        variant="outlined"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Continue
                </Button>
            </form>
        </Container>
    );
};

export default ShippingPage;
