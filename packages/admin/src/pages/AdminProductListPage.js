import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import {
	Container,
	Button,
	Grid,
	Typography,
	CircularProgress,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton, Box, Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const AdminProductListPage = ({
   listProducts,
   deleteProduct,
   productList,
   userLogin,
   productDelete,
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { pageNumber = 1 } = useParams();

	const { loading, error, products, page, pages } = productList;

	const { userInfo } = userLogin;

	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}

		dispatch(listProducts('', pageNumber));
	}, [dispatch, history, userInfo, successDelete, pageNumber]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = (e) => {
		e.preventDefault();

		history.push(`/products/admin/product/create`);
	};

	return (
		<Container>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h4">Products</Typography>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={createProductHandler}
					>
						Create Product
					</Button>
				</Grid>
			</Grid>
			{loadingDelete && <Loader />}
			{errorDelete && <Message severity="error">{errorDelete}</Message>}
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<Alert severity="error">{error}</Alert>
				</Box>
			) : (
				<>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.map((product) => (
									<TableRow key={product._id}>
										<TableCell>{product._id}</TableCell>
										<TableCell>{product.name}</TableCell>
										<TableCell>{product.price}</TableCell>
										<TableCell>{product.category}</TableCell>
										<TableCell>
											<IconButton
												component={RouterLink}
												to={`/admin/product/${product._id}/edit`}
												color="primary"
												size="small"
											>
												<EditIcon />
											</IconButton>
										</TableCell>
										<TableCell>
											<IconButton
												color="secondary"
												size="small"
												onClick={() => deleteHandler(product._id)}
											>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</Container>
	);
};

export default AdminProductListPage;
