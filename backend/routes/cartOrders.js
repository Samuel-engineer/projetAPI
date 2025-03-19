const express = require('express');
const db = require('../db/db.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route pour compléter la commande
router.post('/complete', async (req, res) => {
    const { items } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token manquant ou invalide' });
    }

    try {
        // Vérifier et décoder le token JWT pour obtenir l'ID de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Assurez-vous que JWT_SECRET est défini dans vos variables d'environnement
        
        // Commencer une transaction
        await db.query('BEGIN');

        // Enregistrement de la commande (simplifié)
        await db.query('INSERT INTO cart (items, created_at, user_id) VALUES ($1, NOW(), $2)', [JSON.stringify(items), decodedToken.id]);

        // Finir la transaction
        await db.query('COMMIT');
        res.status(201).json({ message: 'Commande validée avec succès' });
    } catch (error) {
        await db.query('ROLLBACK');

        // Gestion des erreurs selon le type d'erreur
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token invalide' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expiré' });
        }

        console.error('Erreur lors de la validation de la commande:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour vérifier les stocks et mettre à jour les produits
router.post('/verify', async (req, res) => {
    const { items } = req.body;

    try {
        // Commencer une transaction
        await db.query('BEGIN');

        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                const item = items[key];

                const result = await db.query('SELECT stock FROM products WHERE id = $1', [item.product_id]);
                const currentStock = result.rows[0].stock;

                if (currentStock < item.quantity) {
                    // Si le stock est insuffisant, rollback et renvoyer une erreur
                    await db.query('ROLLBACK');
                    return res.status(400).json({ error: 'Stock insuffisant pour le produit : ' + item.product_id });
                }

                // Mettre à jour le stock si suffisant
                await db.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
            }
        }

        // Committer la transaction une fois toutes les mises à jour effectuées
        await db.query('COMMIT');
        return res.status(200).json({ message: 'Stock vérifié et mis à jour avec succès' });
    } catch (error) {
        // Rollback en cas d'erreur
        await db.query('ROLLBACK');
        console.error('Erreur lors de la vérification du stock:', error);
        return res.status(500).json({ error: 'Erreur serveur lors de la vérification des stocks' });
    }
});

module.exports = router;
