import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET';

const ProductListPage = ({
   history,
   match,
   productList,
   userLogin,
   productDelete,
   productCreate,
   listProducts,
   deleteProduct,
   createProduct,
}) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const { loading, error, products, page, pages } = productList;
	const { userInfo } = userLogin;
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
	const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h4">Products</Typography>
				<Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={createProductHandler}>
					Create Product
				</Button>
			</Box>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
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
									<TableCell>Brand</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.map((product) => (
									<TableRow key={product._id}>
										<TableCell>{product._id}</TableCell>
										<TableCell>{product.name}</TableCell>
										<TableCell>R{product.price}</TableCell>
										<TableCell>{product.category}</TableCell>
										<TableCell>{product.brand}</TableCell>
										<TableCell>
											<IconButton component={Link} to={`/admin/product/${product._id}/edit`} color="primary">
												<EditIcon />
											</IconButton>
										</TableCell>
										<TableCell>
											<IconButton color="secondary" onClick={() => deleteHandler(product._id)}>
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
		</>
	);
};

export default ProductListPage;
