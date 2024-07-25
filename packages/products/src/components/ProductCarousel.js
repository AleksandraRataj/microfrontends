import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	carouselContainer: {
		width: '70%',
		margin: 'auto',
		position: 'relative',
		backgroundColor: 'hsla(0,0%,96%,0.5)'
	},
	arrowButton: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		color: 'white',
		border: 'none',
		padding: '10px',
		cursor: 'pointer',
		zIndex: 1,
	},
	leftArrow: {
		left: 0,
	},
	rightArrow: {
		right: 0,
	}
}));

const CustomRightArrow = ({ onClick }) => {
	const styles = useStyles();
	return (
		<button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={onClick}>
			&gt;
		</button>
	);
};

const CustomLeftArrow = ({ onClick }) => {
	const styles = useStyles();
	return (
		<button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={onClick}>
			&lt;
		</button>
	);
};

const ProductCarousel = ({ listTopProducts, productTopRated }) => {
	const styles = useStyles();
	const dispatch = useDispatch();

	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return loading ? (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<CircularProgress />
		</Box>
	) : error ? (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Alert severity="error">{error}</Alert>
		</Box>
	) : (
		<Box sx={{ bgcolor: 'hsla(0,0%,96%,0.5)', p: 2, position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}>
			<Carousel
				responsive={responsive}
				autoPlay={true}
				autoPlaySpeed={3000}
				infinite={true}
				className={styles.carouselContainer}
				customRightArrow={<CustomRightArrow />}
				customLeftArrow={<CustomLeftArrow />}
			>
				{products.map((product) => (
					<div key={product._id} style={{ position: 'relative' }}>
						<Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
							<Box
								component="img"
								src={product.image}
								alt={product.name}
								sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: 3 }}
							/>
							<Box sx={{ position: 'absolute', bottom: 20, left: 20, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)', p: 2, borderRadius: 1 }}>
								<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
									{product.name}
								</Typography>
								<Typography variant="body2" sx={{ opacity: 0.9 }}>
									${product.price}
								</Typography>
							</Box>
						</Link>
					</div>
				))}
			</Carousel>
		</Box>
	);
};

export default ProductCarousel;
