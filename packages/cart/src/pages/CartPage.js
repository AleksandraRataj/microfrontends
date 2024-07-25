import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Grid,
	Typography,
	List,
	ListItem,
	ListItemText,
	Avatar,
	FormControl,
	Select,
	MenuItem,
	Button,
	Card,
	CardContent,
	CardActions
} from '@mui/material';

import Message from '../components/Message';

const CartPage = ({ match, location, history, cart, addToCart, removeFromCart}) => {
	const dispatch = useDispatch();

	const productId = match.params.id

	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const { cartItems } = cart

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	const checkoutHandler = () => {
		history.push('/cart/shipping')
	}

	return (
		<Grid container spacing={3} sx={{ width: '80%', margin: 'auto' }}>
			<Grid item md={8}>
				<Typography variant="h4" gutterBottom>
					Shopping Cart
				</Typography>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/products'>Go back to products</Link>
					</Message>
				) : (
					<List>
						{cartItems.map((item) => (
							<ListItem key={item.product}>
								<Grid container spacing={2} alignItems="center">
									<Grid item md={2}>
										<Link to={`/product/${item.product}`}>
											<Avatar
												variant="rounded"
												src={item.image}
												alt={item.name}
												sx={{ width: '100%', height: 'auto' }}
											/>
										</Link>
									</Grid>
									<Grid item md={3}>
										<Link to={`/product/${item.product}`}>
											<ListItemText primary={item.name} />
										</Link>
									</Grid>
									<Grid item md={2}>
										<Typography>${item.price}</Typography>
									</Grid>
									<Grid item md={2}>
										<FormControl fullWidth>
											<Select
												value={item.qty}
												onChange={(e) =>
													dispatch(addToCart(item.product, Number(e.target.value)))
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<MenuItem key={x + 1} value={x + 1}>
														{x + 1}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item md={2}>
										<Button
											style={{
												backgroundColor: '#f44336',
												color: '#fff',
												padding: '6px 16px',
												fontSize: '14px',
												'&:hover': {
													backgroundColor: '#d32f2f'
												}
											}}
											onClick={() => removeFromCartHandler(item.product)}
										>
											Remove
										</Button>
									</Grid>
								</Grid>
							</ListItem>
						))}
					</List>
				)}
			</Grid>
			<Grid item md={4}>
				<Card>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
						</Typography>
						<Typography variant="h6">
							${addDecimals(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							Proceed to Checkout
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
};

export default CartPage;
