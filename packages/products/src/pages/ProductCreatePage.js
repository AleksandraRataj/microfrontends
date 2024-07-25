import React, {useEffect, useState} from 'react';
import {TextField, Button, Container, Typography, Grid, Box, CircularProgress, Alert} from '@mui/material';
import {useDispatch} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";

const ProductCreatePage = ({ history, userLogin, createProduct, productCreate}) => {
    const dispatch = useDispatch();

    const { userInfo } = userLogin;

    const {
        loading,
        error,
        success,
        product,
    } = productCreate;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        countInStock: '',
        numReviews: '',
        description: '',
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
            createProduct({
                name,
                price,
                image,
                countInStock,
                category,
                description,
            })
        );
    };

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }
        if (success) {
            history.push('/admin/products');
        }
    }, [dispatch, history, userInfo, success]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Create Product
            </Typography>
            {loading && <Loader />}
            {error && <Message severity="error">{error}</Message>}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : (
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                {image && <Typography variant="body2">{image.name}</Typography>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="category"
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="countInStock"
                                    label="Count In Stock"
                                    name="countInStock"
                                    type="number"
                                    value={formData.countInStock}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="numReviews"
                                    label="Number of Reviews"
                                    name="numReviews"
                                    type="number"
                                    value={formData.numReviews}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Create Product
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
        </Container>
    );
}

export default ProductCreatePage;
