const asyncHandler = require('express-async-handler');

const Product  = require('../models/productModel.js')

const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10
	const page = Number(req.query.pageNumber) || 1
	const keyword = req.query.keyword
		? // TODO Fuzzy Search
		  {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	// Check if product exists
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.deleteOne()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

const createProduct = asyncHandler(async (req, res) => {
	const {name, price, image, category, countInStock, numReviews, description} = req.body

	const product = new Product({
		name: name,
		price: price,
		user: req.user._id,
		image: image,
		category: category,
		countInStock: countInStock,
		numReviews: numReviews,
		description: description,
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		category,
		countInStock,
	} = req.body

	const product = await Product.findById(req.params.id)
	if (product) {
		product.name = name
		product.price = price
		product.description = description || product.description
		product.image = image || product.image
		product.category = category || product.category
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		// Calculate overall average review for a product
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
	// Find products and sort by rating in ascending order
	const products = await Product.find({}).sort({ rating: -1 }).limit(10)

	res.json(products)
})

module.exports = {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
}
