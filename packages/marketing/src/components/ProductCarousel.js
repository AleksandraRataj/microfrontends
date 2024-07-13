import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

const ProductCarousel = ({productTopRated, listTopProducts}) => {
	const { loading, error, products } = productTopRated;

	useEffect(
		() => {
			listTopProducts();
		}, []
	)

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-light'>
			{products.map((product) => (
				<Carousel.Item key={product._id} interval={2000}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} (R{product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel;
