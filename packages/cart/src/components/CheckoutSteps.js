import React from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={step1 ? 0 : step2 ? 1 : step3 ? 2 : step4 ? 3 : 0} alternativeLabel>
                <Step>
                    <StepLabel>
                        {step1 ? (
                            <Button component={Link} to="/login">
                                Sign In
                            </Button>
                        ) : (
                            <Button disabled>Sign In</Button>
                        )}
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        {step2 ? (
                            <Button component={Link} to="/cart/shipping">
                                Shipping
                            </Button>
                        ) : (
                            <Button disabled>Shipping</Button>
                        )}
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        {step3 ? (
                            <Button component={Link} to="/payment">
                                Payment
                            </Button>
                        ) : (
                            <Button disabled>Payment</Button>
                        )}
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel>
                        {step4 ? (
                            <Button component={Link} to="/placeorder">
                                Place Order
                            </Button>
                        ) : (
                            <Button disabled>Place Order</Button>
                        )}
                    </StepLabel>
                </Step>
            </Stepper>
        </Box>
    );
};

export default CheckoutSteps;
