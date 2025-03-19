const express = require('express');
const db = require('../db/db.js');  // Assuming your database connection is in db.js
const router = express.Router();

// API to get product recommendations based on user's purchase history
router.get('/recommendations/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Step 1: Get the products that the user has purchased
        const purchasedProductsQuery = `
            SELECT DISTINCT oi.product_id
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            WHERE o.user_id = $1;
        `;
        const purchasedProductsResult = await db.query(purchasedProductsQuery, [userId]);
        const purchasedProducts = purchasedProductsResult.rows.map(row => row.product_id);

        if (purchasedProducts.length === 0) {
            return res.status(404).json({ message: 'No purchase history found for user.' });
        }

        // Step 2: Recommend products that the user hasn't bought yet
        const recommendationsQuery = `
            SELECT p.id, p.name, p.description, p.price
            FROM products p
            WHERE p.id NOT IN ($1:csv)
            LIMIT 10;
        `;
        const recommendationsResult = await db.query(recommendationsQuery, [purchasedProducts]);
        const recommendedProducts = recommendationsResult.rows;

        // Step 3: Send recommendations to the user
        res.status(200).json(recommendedProducts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
