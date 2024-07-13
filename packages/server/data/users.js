const bcrypt = require('bcryptjs')

const users = [
	// Admin user
	{
		name: 'Aleksandra Rataj',
		email: 'aleksandrarataj2@gmail.com',
		password: bcrypt.hashSync('12345', 10),
		isAdmin: true,
	},
	// Standard users
	{
		name: 'Belle Doe',
		email: 'belle@eg.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
	{
		name: 'Mike Doe',
		email: 'mike@eg.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
]

module.exports =  users
