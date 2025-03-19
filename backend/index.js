require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Placeholder route
app.get('/', (req, res) => {
  res.send('E-commerce API running!');
});

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const cartRoutes = require('./routes/cartOrders');
app.use('/api/cartOrders', cartRoutes);


const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);


const adminRoutes = require('./routes/admin.js');
app.use('/api/admin', adminRoutes);

const authenticateToken = require('./middlewares/middlewares.js');
app.post('/api/orders', authenticateToken, orderRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});