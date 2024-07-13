import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Alert, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

const SignupPage = ({ location, history, userRegister, register }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect);
			}
		}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(register(name, email, password))
		}
	}

	return (
		<Container maxWidth="sm">
			<Typography variant="h4" component="h1" gutterBottom>
				Sign Up
			</Typography>
			{message && <Alert severity="error">{message}</Alert>}
			{error && <Alert severity="error">{error}</Alert>}
			{loading && <CircularProgress />}
			<form onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="name"
					label="Name"
					name="name"
					autoComplete="name"
					autoFocus
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
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
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="confirmPassword"
					label="Confirm Password"
					type="password"
					id="confirmPassword"
					autoComplete="current-password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Register
				</Button>
			</form>
			<Grid container justifyContent="flex-end">
				<Grid item>
					Have an Account?{' '}
					<MuiLink component={Link} to={redirect ? `/authentication/login?redirect=${redirect}` : '/authentication/login'}>
						Login
					</MuiLink>
				</Grid>
			</Grid>
		</Container>
	);
}

export default SignupPage;
