import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	CircularProgress, Alert,
} from '@mui/material'

import Message from '../components/Message'
import Loader from '../components/Loader'

const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET';

const ProductEditPage = ({
							 match,
							 history,
							 productDetails,
							 listProductDetails,
							 productUpdate,
							 updateProduct,

}) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const { loading, error, product } = productDetails

	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			dispatch(listProductDetails(productId))
			history.push('/admin/productlist')
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setImage(product.image)
				setBrand(product.brand)
				setCountInStock(product.countInStock)
				setCategory(product.category)
				setDescription(product.description)
			}
		}
	}, [successUpdate, dispatch, history, product, productId])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				countInStock,
				category,
				description,
			})
		)
	}

	return (
		<>
			<Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
				<Button variant='outlined' color='primary' sx={{ mb: 3 }}>
					Go Back
				</Button>
			</Link>
			<Container maxWidth='sm'>
				<Typography variant='h4' component='h1' gutterBottom>
					Edit Product
				</Typography>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
						<CircularProgress />
					</Box>
				) : error ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
						<Alert severity="error">{error}</Alert>
					</Box>
				) : (
					<Box component='form' onSubmit={submitHandler}>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='name'
							label='Name'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='price'
							label='Price'
							type='number'
							inputProps={{ min: '0', step: '0.01' }}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='image'
							label='Image URL'
							name='image'
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<input
							accept='image/*'
							style={{ display: 'none' }}
							id='image-file'
							type='file'
							onChange={uploadFileHandler}
						/>
						<label htmlFor='image-file'>
							<Button variant='contained' component='span' sx={{ mt: 2 }}>
								Choose File
							</Button>
						</label>
						{uploading && <CircularProgress />}
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='brand'
							label='Brand'
							name='brand'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='countInStock'
							label='Count In Stock'
							type='number'
							inputProps={{ min: '0', step: '1' }}
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='category'
							label='Category'
							name='category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='description'
							label='Description'
							name='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3 }}>
							Update
						</Button>
					</Box>
				)}
			</Container>
		</>
	)
}

export default ProductEditPage
