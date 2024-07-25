import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	CircularProgress,
	Alert,
	Box
} from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';

const OrderListPage = ({
						   history,
						   orderList,
						   userLogin,
						   listOrders,
}) => {
	const dispatch = useDispatch();

	const { loading, error, orders } = orderList;

	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/authentication/login');
		}
	}, [dispatch, userInfo, history]);

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Orders
			</Typography>
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<Alert severity="error">{error}</Alert>
				</Box>
			) : (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>User</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Total</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>Delivered</TableCell>
								<TableCell>Info</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders.map((order) => (
								<TableRow key={order._id}>
									<TableCell>{order._id}</TableCell>
									<TableCell>{order.user && order.user.name}</TableCell>
									<TableCell>{order.createdAt.substring(0, 10)}</TableCell>
									<TableCell>R{order.totalPrice}</TableCell>
									<TableCell>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<CancelIcon style={{ color: 'red' }} />
										)}
									</TableCell>
									<TableCell>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<CancelIcon style={{ color: 'red' }} />
										)}
									</TableCell>
									<TableCell>
										<Button component={Link} to={`/order/${order._id}`} variant="contained" size="small">
											Details
										</Button>
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

export default OrderListPage;
