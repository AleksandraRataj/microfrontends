import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Alert, Box, Button, CircularProgress, Container, Input, TextField, Typography,} from '@mui/material';

const ProductEditPage = ({
   match,
   history,
   listProductDetails,
   updateProduct,
   productDetails,
   productUpdate,
}) => {
    const dispatch = useDispatch();

    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const {loading, error, product} = productDetails;

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: 'PRODUCT_UPDATE_RESET'});

            dispatch(listProductDetails(productId));

            history.push('/admin/products');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setCountInStock(product.countInStock);
                setCategory(product.category);
                setDescription(product.description);
            }
        }
    }, [successUpdate, dispatch, history, product, productId]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();

        formData.append('image', file);

        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const {data} = await axios.post('http://localhost:3000/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                countInStock,
                category,
                description,
            })
        );
    };

    return (
        <React.Fragment>
            <Button component={Link} to='/admin/products' variant="contained" color="primary" sx={{mb: 3}}>
                Go Back
            </Button>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Product
                </Typography>
                {loadingUpdate && <CircularProgress/>}
                {errorUpdate && <Typography color="error">{errorUpdate}</Typography>}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                ) : (
                    <form onSubmit={submitHandler}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Box my={2}>
                            <Input
                                type="file"
                                onChange={uploadFileHandler}
                                inputProps={{accept: 'image/*'}}
                            />
                            {uploading && <CircularProgress/>}
                        </Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Count In Stock"
                            type="number"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}>
                            Update
                        </Button>
                    </form>
                )}
            </Container>
        </React.Fragment>
    );
};

export default ProductEditPage;
