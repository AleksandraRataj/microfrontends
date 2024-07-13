import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {Link} from 'react-router-dom'
import {Alert, Button, CircularProgress, Container, Grid, Link as MuiLink, TextField, Typography} from '@mui/material';

const LoginScreen = ({location, history, userLogin, login}) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {loading, error, userInfo} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(
        () => {
            if (userInfo) {
                history.push(redirect)
            }
        },
        [history, userInfo, redirect]
    )

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password));
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <CircularProgress/>}
            <form onSubmit={submitHandler}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Sign In
                </Button>
            </form>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    New Customer?{' '}
                    <MuiLink component={Link}
                             to={redirect ? `/authentication/signup?redirect=${redirect}` : '/authentication/signup'}>
                        Register
                    </MuiLink>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginScreen;
