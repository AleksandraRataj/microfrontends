import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

import Message from '../components/Message';
import Loader from '../components/Loader';

const UserListPage = ({ history, userList, listUsers, userLogin, userDelete, deleteUser }) => {
	const dispatch = useDispatch();

	const { userInfo } = userLogin;

	const { loading, error, users } = userList;

	const { success: successDelete } = userDelete;

	console.log(userDelete)

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/authentication/login');
		}
	}, [dispatch, userInfo, history, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Admin</TableCell>
								<TableCell>Edit</TableCell>
								<TableCell>Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user._id}>
									<TableCell>{user._id}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</TableCell>
									<TableCell>
										{user.isAdmin ? (
											<CheckIcon style={{ color: 'green' }} />
										) : (
											<CloseIcon style={{ color: 'red' }} />
										)}
									</TableCell>
									<TableCell>
										<IconButton component={Link} to={`/admin/user/${user._id}/edit`} size="small">
											<EditIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton
											color="secondary"
											onClick={() => deleteHandler(user._id)}
											size="small"
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default UserListPage;
