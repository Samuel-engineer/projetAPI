const express = require('express');
const db = require('../db/db.js'); // Assure-toi que le chemin vers ton fichier db.js est correct
const router = express.Router();

// Vérifier les niveaux de stock d'un produit
router.get('/:id/stock', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await db.query('SELECT stock FROM products WHERE id = $1', [productId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const stock = result.rows[0].stock;
        res.status(200).json({ stock });
    } catch (error) {
        console.error('Erreur lors de la vérification du stock:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
});

// Mettre à jour le niveau de stock après une commande
router.patch('/:id/stock', async (req, res) => {
    const productId = req.params.id;
    const { quantitySold } = req.body;

    try {
        // Vérifier le stock actuel
        const productResult = await db.query('SELECT stock FROM products WHERE id = $1', [productId]);
        
        if (productResult.rows.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const currentStock = productResult.rows[0].stock;

        // Vérifier si le stock est suffisant
        if (currentStock < quantitySold) {
            return res.status(400).json({ error: 'Stock insuffisant' });
        }

        // Mettre à jour le stock
        const newStock = currentStock - quantitySold;
        await db.query('UPDATE products SET stock = $1 WHERE id = $2', [newStock, productId]);

        res.status(200).json({ message: 'Stock mis à jour', newStock });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du stock:', error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
});

module.exports = router;
