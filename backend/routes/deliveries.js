const express = require('express');
const db = require('../db/db.js'); // Database connection
const router = express.Router();

// 1. Track Delivery Status of a Specific Order
router.get('/delivery/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        // Query to get delivery information for a specific order
        const deliveryQuery = `
            SELECT d.delivery_address, d.status, d.updated_at
            FROM deliveries d
            WHERE d.order_id = $1;
        `;
        const deliveryResult = await db.query(deliveryQuery, [orderId]);

        if (deliveryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Delivery information not found for this order.' });
        }

        // Return delivery information
        res.status(200).json(deliveryResult.rows[0]);

    } catch (error) {
        console.error('Error fetching delivery status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Update Delivery Information (Address or Status)
router.put('/delivery/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { deliveryAddress, status } = req.body;

    try {
        // Update delivery address and/or status for the given order
        const updateQuery = `
            UPDATE deliveries
            SET delivery_address = COALESCE($1, delivery_address),
                status = COALESCE($2, status),
                updated_at = NOW()
            WHERE order_id = $3
            RETURNING delivery_address, status, updated_at;
        `;
        const updateResult = await db.query(updateQuery, [deliveryAddress, status, orderId]);

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'Delivery information not found for this order.' });
        }

        // Return the updated delivery information
        res.status(200).json(updateResult.rows[0]);

    } catch (error) {
        console.error('Error updating delivery information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
