import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card sx={{ my: 3, p: 3, borderRadius: 2 }}>
            <CardActionArea component={RouterLink} to={`/product/${product._id}`} sx={{ height: '100%' }}>
                <CardMedia component="img" image={product.image} alt={product.name} sx={{ height: 200, objectFit: 'cover' }} />
                <CardContent sx={{ paddingTop: '24px', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <strong>{product.name}</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Box>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        ${product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Product;
