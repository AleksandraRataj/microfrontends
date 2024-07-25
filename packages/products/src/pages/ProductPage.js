import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Box,
    Alert,
} from '@mui/material';
import Rating from '../components/Rating';
import Message from '../components/Message';

const ProductPage = ({
                         listProductDetails,
                         createProductReview,
                         productDetails,
                         userLogin,
                         productReviewCreate
                     }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id: productId } = useParams(); // useParams hook to get productId

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const { loading, error, product } = productDetails;
    const { userInfo } = userLogin;
    const { success: successProductReview, loading: loadingProductReview, error: errorProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch(listProductDetails(productId));
            dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
        }
        if (!product._id || product._id !== productId) {
            dispatch(listProductDetails(productId));
            dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' });
        }
    }, [dispatch, productId, successProductReview, product._id]);

    const addToCartHandler = (e) => {
        history.push(`/cart/${productId}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId, { rating, comment }));
    };

    return (
        <Container>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            ) : (
                <Box sx={{ width: '80%', margin: '30px auto' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardContent sx={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography variant='h3'>{product.name}</Typography>
                                <Rating sx={{ mt: 2 }} value={product.rating} text={`${product.numReviews} reviews`} />
                                <Typography variant='h4' sx={{ mt: 1 }}>${product.price}</Typography>
                                <Typography variant='body1' sx={{ mt: 1 }}>{product.description}</Typography>
                                <Typography sx={{ mt: 1 }} >Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Typography>
                                {product.countInStock > 0 && (
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel>Quantity</InputLabel>
                                        <Select
                                            value={qty}
                                            onChange={
                                            (e) => {
                                                console.log(e.target.value)
                                                setQty(e.target.value)
                                            }
                                            }
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <MenuItem key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                                <Button
                                    onClick={addToCartHandler}
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    disabled={product.countInStock === 0}
                                    style={{backgroundColor: 'green', color: 'white'}}
                                >
                                    {product.countInStock > 0 ? 'Add To Cart' : 'Sold Out'}
                                </Button>
                            </CardContent>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12}>
                            <Typography sx={{ mb: 2 }} variant='h5'>Reviews</Typography>

                            {product.reviews.length === 0 && <Typography sx={{ mb: 2 }} variant='body1'>No reviews</Typography>}
                            {product.reviews.map((review) => (
                                <Card key={review._id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant='h6'>{review.name}</Typography>
                                        <Rating value={review.rating} />
                                        <Typography variant='body2'>{review.createdAt.substring(0, 10)}</Typography>
                                        <Typography variant='body1'>{review.comment}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>Write your review</Typography>
                                    {successProductReview && (
                                        <Message variant='success'>Review submitted successfully</Message>
                                    )}
                                    {loadingProductReview && <CircularProgress />}
                                    {errorProductReview && (
                                        <Message variant='danger'>{errorProductReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <InputLabel>Rating</InputLabel>
                                                <Select
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <MenuItem value=''>Select...</MenuItem>
                                                    <MenuItem value='1'>1 - Poor</MenuItem>
                                                    <MenuItem value='2'>2 - Fair</MenuItem>
                                                    <MenuItem value='3'>3 - Good</MenuItem>
                                                    <MenuItem value='4'>4 - Very Good</MenuItem>
                                                    <MenuItem value='5'>5 - Excellent</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                label='Comment'
                                                multiline
                                                required
                                                fullWidth
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                sx={{ mt: 2 }}
                                            />
                                            <Button
                                                type='submit'
                                                variant='contained'
                                                color='primary'
                                                sx={{ mt: 2 }}
                                                disabled={loadingProductReview}
                                                style={{backgroundColor: 'green', color: 'white'}}
                                            >
                                                Submit
                                            </Button>
                                        </form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review
                                        </Message>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    )
}

export default ProductPage;
