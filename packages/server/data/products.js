const products = [
	[
		{
			"user": "666d9e8c97d32cd01add83dd",
			"name": "Aloe Vera",
			"image": "/images/aloe_vera.webp",
			"category": "Succulent",
			"description": "The Aloe Vera is known for its medicinal properties and easy care. Its thick, fleshy leaves contain a soothing gel, making it perfect for skin care and a striking addition to any home.",
			"rating": 4.7,
			"numReviews": 150,
			"price": 12.99,
			"countInStock": 25
		},
		// {
		// 	"name": "Snake Plant",
		// 	"image": "/images/snake_plant.webp",
		// 	"description": "The Snake Plant is a hardy, low-maintenance plant known for its upright, sword-like leaves and its ability to purify air by removing toxins.",
		// 	"category": "Succulent",
		// 	"price": 15.99,
		// 	"countInStock": 40,
		// 	"rating": 4.5,
		// 	"numReviews": 120
		// },
		// {
		// 	"name": "Spider Plant",
		// 	"image": "/images/spider_plant.webp",
		// 	"description": "The Spider Plant is an excellent air purifier with arching green and white-striped leaves. It is easy to care for and produces baby plants that can be propagated.",
		// 	"category": "Air Purifying",
		// 	"price": 8.99,
		// 	"countInStock": 30,
		// 	"rating": 4.6,
		// 	"numReviews": 98
		// },
		// {
		// 	"name": "Peace Lily",
		// 	"image": "/images/peace_lily.webp",
		// 	"description": "The Peace Lily is a beautiful flowering plant known for its elegant white blooms and its ability to thrive in low light, making it perfect for indoor spaces.",
		// 	"category": "Flowering",
		// 	"price": 18.99,
		// 	"countInStock": 20,
		// 	"rating": 4.8,
		// 	"numReviews": 110
		// },
		// {
		// 	"name": "Boston Fern",
		// 	"image": "/images/boston_fern.webp",
		// 	"description": "The Boston Fern is a popular houseplant known for its lush, feathery fronds. It prefers humid environments and indirect light, making it great for bathrooms and kitchens.",
		// 	"category": "Air Purifying",
		// 	"price": 14.99,
		// 	"countInStock": 35,
		// 	"rating": 4.4,
		// 	"numReviews": 85
		// },
		// {
		// 	"name": "Monstera Deliciosa",
		// 	"image": "/images/monstera_deliciosa.webp",
		// 	"description": "The Monstera Deliciosa, also known as the Swiss Cheese Plant, features large, split leaves and is a striking tropical plant that can add a touch of the jungle to your home.",
		// 	"category": "Tropical",
		// 	"price": 22.99,
		// 	"countInStock": 15,
		// 	"rating": 4.9,
		// 	"numReviews": 130
		// },
		// {
		// 	"name": "Fiddle Leaf Fig",
		// 	"image": "/images/fiddle_leaf_fig.webp",
		// 	"description": "The Fiddle Leaf Fig is a popular ornamental tree with large, glossy leaves. It is perfect for bright, sunny rooms and makes a dramatic statement in any home.",
		// 	"category": "Tropical",
		// 	"price": 25.99,
		// 	"countInStock": 10,
		// 	"rating": 4.3,
		// 	"numReviews": 95
		// },
		// {
		// 	"name": "Pothos",
		// 	"image": "/images/pothos.webp",
		// 	"description": "Pothos is an easy-care trailing plant with heart-shaped leaves that can be green or variegated. It is known for its ability to thrive in low light and poor conditions.",
		// 	"category": "Vine",
		// 	"price": 9.99,
		// 	"countInStock": 50,
		// 	"rating": 4.7,
		// 	"numReviews": 140
		// },
		// {
		// 	"name": "ZZ Plant",
		// 	"image": "/images/zz_plant.webp",
		// 	"description": "The ZZ Plant is a hardy, low-light plant known for its waxy, dark green leaves. It is drought-tolerant and can thrive with minimal care, making it perfect for beginners.",
		// 	"category": "Air Purifying",
		// 	"price": 17.99,
		// 	"countInStock": 18,
		// 	"rating": 4.6,
		// 	"numReviews": 100
		// },
		// {
		// 	"name": "Jade Plant",
		// 	"image": "/images/jade_plant.webp",
		// 	"description": "The Jade Plant is a popular succulent known for its thick, fleshy leaves and easy care. It is often considered a symbol of good luck and prosperity.",
		// 	"category": "Succulent",
		// 	"price": 13.99,
		// 	"countInStock": 27,
		// 	"rating": 4.5,
		// 	"numReviews": 75
		// },
		// {
		// 	"name": "Rubber Plant",
		// 	"image": "/images/rubber_plant.webp",
		// 	"description": "The Rubber Plant is a popular houseplant with large, glossy leaves. It can grow quite tall and is known for its ability to purify the air.",
		// 	"category": "Air Purifying",
		// 	"price": 20.99,
		// 	"countInStock": 22,
		// 	"rating": 4.4,
		// 	"numReviews": 88
		// },
		// {
		// 	"name": "Calathea",
		// 	"image": "/images/calathea.webp",
		// 	"description": "The Calathea is a beautiful tropical plant known for its strikingly patterned leaves. It prefers low to medium light and high humidity.",
		// 	"category": "Tropical",
		// 	"price": 16.99,
		// 	"countInStock": 33,
		// 	"rating": 4.7,
		// 	"numReviews": 92
		// },
		// {
		// 	"name": "Philodendron",
		// 	"image": "/images/philodendron.webp",
		// 	"description": "Philodendrons are popular houseplants known for their ease of care and beautiful, heart-shaped leaves. They can be grown as trailing vines or upright plants.",
		// 	"category": "Vine",
		// 	"price": 14.99,
		// 	"countInStock": 29,
		// 	"rating": 4.8,
		// 	"numReviews": 102
		// },
		// {
		// 	"name": "Cactus",
		// 	"image": "/images/cactus.webp",
		// 	"description": "Cacti are hardy, drought-tolerant plants that come in a variety of shapes and sizes. They are perfect for sunny spots and require minimal watering.",
		// 	"category": "Succulent",
		// 	"price": 11.99,
		// 	"countInStock": 45,
		// 	"rating": 4.6,
		// 	"numReviews": 115
		// },
		// {
		// 	"name": "Lucky Bamboo",
		// 	"image": "/images/lucky_bamboo.webp",
		// 	"description": "Lucky Bamboo is known for its unique, bamboo-like stalks and its ability to thrive in water. It is often used in feng shui to attract positive energy.",
		// 	"category": "Air Purifying",
		// 	"price": 12.99,
		// 	"countInStock": 37,
		// 	"rating": 4.5,
		// 	"numReviews": 98
		// },
		// {
		// 	"name": "Lavender",
		// 	"image": "/images/lavender.webp",
		// 	"description": "Lavender is a fragrant herb known for its beautiful purple flowers and calming scent. It can be used in cooking, crafts, and for its essential oils.",
		// 	"category": "Herb",
		// 	"price": 9.99,
		// 	"countInStock": 50,
		// 	"rating": 4.7,
		// 	"numReviews": 145
		// },
		// {
		// 	"name": "Rosemary",
		// 	"image": "/images/rosemary.webp",
		// 	"description": "Rosemary is a versatile herb known for its aromatic leaves and culinary uses. It is easy to grow and can thrive in both pots and garden beds.",
		// 	"category": "Herb",
		// 	"price": 7.99,
		// 	"countInStock": 60,
		// 	"rating": 4.8,
		// 	"numReviews": 130
		// },
		// {
		// 	"name": "Basil",
		// 	"image": "/images/basil.webp",
		// 	"description": "Basil is a popular herb known for its fragrant leaves and essential role in many culinary dishes. It is easy to grow and prefers sunny spots.",
		// 	"category": "Herb",
		// 	"price": 5.99,
		// 	"countInStock": 55,
		// 	"rating": 4.9,
		// 	"numReviews": 120
		// },
		// {
		// 	"name": "Mint",
		// 	"image": "/images/mint.webp",
		// 	"description": "Mint is a fast-growing herb known for its refreshing scent and flavor. It is perfect for teas, desserts, and as a garnish for various dishes.",
		// 	"category": "Herb",
		// 	"price": 6.99,
		// 	"countInStock": 48,
		// 	"rating": 4.6,
		// 	"numReviews": 110
		// },
		// {
		// 	"name": "Thyme",
		// 	"image": "/images/thyme.webp",
		// 	"description": "Thyme is a hardy herb known for its small, aromatic leaves and its use in cooking. It is easy to grow and can thrive in both pots and garden beds.",
		// 	"category": "Herb",
		// 	"price": 5.99,
		// 	"countInStock": 53,
		// 	"rating": 4.5,
		// 	"numReviews": 85
		// },
		// {
		// 	"name": "Orchid",
		// 	"image": "/images/orchid.webp",
		// 	"description": "Orchids are beautiful flowering plants known for their exotic blooms. They require a bit more care but reward with stunning, long-lasting flowers.",
		// 	"category": "Flowering",
		// 	"price": 19.99,
		// 	"countInStock": 19,
		// 	"rating": 4.8,
		// 	"numReviews": 95
		// },
		// {
		// 	"name": "Rose Bush",
		// 	"image": "/images/rose_bush.webp",
		// 	"description": "Rose bushes are beloved for their beautiful and fragrant flowers. They come in various colors and sizes, adding elegance to any garden.",
		// 	"category": "Flowering",
		// 	"price": 24.99,
		// 	"countInStock": 20,
		// 	"rating": 4.7,
		// 	"numReviews": 110
		// },
		// {
		// 	"name": "Clematis",
		// 	"image": "/images/clematis.webp",
		// 	"description": "Clematis is a climbing plant known for its large, colorful flowers. It can add a vertical element to gardens and looks stunning on trellises and fences.",
		// 	"category": "Flowering",
		// 	"price": 15.99,
		// 	"countInStock": 25,
		// 	"rating": 4.6,
		// 	"numReviews": 90
		// },
		// {
		// 	"name": "Maple Tree",
		// 	"image": "/images/maple_tree.webp",
		// 	"description": "Maple trees are known for their stunning fall foliage and syrup-producing sap. They can be a beautiful addition to large gardens and landscapes.",
		// 	"category": "Tree",
		// 	"price": 30.99,
		// 	"countInStock": 10,
		// 	"rating": 4.8,
		// 	"numReviews": 85
		// },
		// {
		// 	"name": "Creeping Thyme",
		// 	"image": "/images/creeping_thyme.webp",
		// 	"description": "Creeping Thyme is a low-growing herb that spreads quickly, making it ideal for ground cover. It produces small, fragrant flowers and is great for rock gardens.",
		// 	"category": "Herb",
		// 	"price": 6.99,
		// 	"countInStock": 40,
		// 	"rating": 4.5,
		// 	"numReviews": 75
		// },
		// {
		// 	"name": "Tomato",
		// 	"image": "/images/tomato.webp",
		// 	"description": "Tomato plants are popular garden staples known for their juicy, flavorful fruits. They require full sun and regular watering to thrive.",
		// 	"category": "Vegetable",
		// 	"price": 4.99,
		// 	"countInStock": 60,
		// 	"rating": 4.7,
		// 	"numReviews": 100
		// },
		// {
		// 	"name": "Strawberry",
		// 	"image": "/images/strawberry.webp",
		// 	"description": "Strawberry plants are beloved for their sweet, red berries. They are easy to grow and can be planted in gardens, pots, or hanging baskets.",
		// 	"category": "Fruit",
		// 	"price": 5.99,
		// 	"countInStock": 50,
		// 	"rating": 4.8,
		// 	"numReviews": 120
		// },
		// {
		// 	"name": "Lettuce",
		// 	"image": "/images/lettuce.webp",
		// 	"description": "Lettuce is a fast-growing leafy green that is perfect for salads. It thrives in cool weather and can be grown in gardens or containers.",
		// 	"category": "Vegetable",
		// 	"price": 3.99,
		// 	"countInStock": 55,
		// 	"rating": 4.6,
		// 	"numReviews": 95
		// },
		// {
		// 	"name": "Carrot",
		// 	"image": "/images/carrot.webp",
		// 	"description": "Carrots are a root vegetable known for their crunchy texture and sweet flavor. They are easy to grow and can be planted directly in the garden.",
		// 	"category": "Vegetable",
		// 	"price": 2.99,
		// 	"countInStock": 70,
		// 	"rating": 4.5,
		// 	"numReviews": 80
		// }
	]
]

module.exports =  products
