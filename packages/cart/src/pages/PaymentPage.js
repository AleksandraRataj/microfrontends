import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Container,
    Row,
    Col,
    Grid,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button
} from '@mui/material';

import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = ({history, cart, savePaymentMethod}) => {
    const dispatch = useDispatch();

    const {shippingAddress} = cart;

    if (!shippingAddress) {
        history.push('/cart/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));

        history.push('/cart/placeorder');
    };

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <CheckoutSteps step1 step2 step3/>
                    <Typography variant="h4" gutterBottom>
                        Payment Method
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Method</FormLabel>
                            <RadioGroup
                                aria-label="payment method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel value="FakePay" control={<Radio/>}
                                                  label="Fake Payment"/>
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" style={{marginTop: '20px'}}>
                            Continue
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PaymentPage;
