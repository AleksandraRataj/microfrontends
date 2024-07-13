const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const connectDatabase = require('./config/database');

const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')

dotenv.config();

connectDatabase();

const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:8084', 'http://localhost:8086']

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests, etc.)
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    },
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Error middleware for 404
app.use(notFound)

// Error handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
