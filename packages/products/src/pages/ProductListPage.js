import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {Grid, Button, Container, Typography, Box, CircularProgress, Alert} from '@mui/material'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const ProductListPage = ({ match, listProducts, productList }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <Container>
            <Typography variant='h3' sx={{ mb: 3 }}>
                Latest Products
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
                <>
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </Container>
    )
}

export default ProductListPage
