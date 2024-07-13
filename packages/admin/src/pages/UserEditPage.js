import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, TextField, Typography, Alert } from '@mui/material';

const USER_UPDATE_RESET = 'USER_UPDATE_RESET';

const UserEditPage = ({
						  match,
						  history,
						  userDetails,
						  getUserDetails,
						  userUpdate,
						  updateUser
					  }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const { loading, error, user } = userDetails;

	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [successUpdate, dispatch, history, user, userId]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Button component={Link} to='/admin/userlist' variant='contained' color='primary' style={{ marginBottom: '20px' }}>
				Go Back
			</Button>
			<Container maxWidth="sm">
				<Typography variant="h4" gutterBottom>
					Edit User
				</Typography>
				{loadingUpdate && <CircularProgress />}
				{errorUpdate && <Alert severity='error'>{errorUpdate}</Alert>}
				{loading ? (
					<CircularProgress />
				) : error ? (
					<Alert severity='error'>{error}</Alert>
				) : (
					<Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
						<FormControl margin="normal" fullWidth>
							<TextField
								label="Name"
								variant="outlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>
						<FormControl margin="normal" fullWidth>
							<TextField
								label="Email Address"
								type="email"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControlLabel
							control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
							label="Is Admin"
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
							Update
						</Button>
					</Box>
				)}
			</Container>
		</>
	);
};

export default UserEditPage;
