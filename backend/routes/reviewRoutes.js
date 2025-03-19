const express = require('express');
const db = require('../db/db'); // Assure-toi d'importer ta connexion à la base de données
const jwt = require('jsonwebtoken');

const router = express.Router();

// Afficher les avis pour un produit donné
router.get('/products/:productId/review', async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await db.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
    }
});

// Permettre aux utilisateurs de laisser des avis
router.post('/products/:productId/review', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Assurez-vous que JWT_SECRET est défini dans vos variables d'environnement

    const { productId } = req.params;
    const { rating, comment } = req.body;

    const userId = decodedToken.id; // On suppose que l'ID de l'utilisateur est stocké dans req.user après l'authentification
    
    try {
        const result = await db.query(
            'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',[productId, userId, rating, comment]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
    }
});

// Supprimer un avis (sous condition, par exemple si l'utilisateur est le propriétaire de l'avis)
router.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Assurez-vous que JWT_SECRET est défini dans vos variables d'environnement
    const userId = decodedToken.id; // On suppose que l'ID de l'utilisateur est stocké dans req.user après l'authentification


    try {
        // Vérifie si l'avis appartient à l'utilisateur
        const reviewCheck = await db.query('SELECT * FROM reviews WHERE id = $1 AND user_id = $2', [id, userId]);
        
        if (reviewCheck.rowCount === 0) {
            return res.status(403).send('Vous ne pouvez pas supprimer cet avis.');
        }

        // Supprime l'avis
        await db.query('DELETE FROM reviews WHERE id = $1', [id]);
        res.sendStatus(204); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur du serveur');
    }
});

module.exports = router;
