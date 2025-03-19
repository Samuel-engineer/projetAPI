const express = require('express');
const db = require('../db/db'); // Assure-toi d'importer ta connexion à la base de données

const router = express.Router();


// Récupérer le panier d'un utilisateur par ID
router.get('/', async (req, res) => {
  
  try {
    
    // Requête pour obtenir le panier de l'utilisateur
    const result = await db.query('SELECT * FROM cart');

    if (result.rows.length === 0) {
      // Si aucun panier n'est trouvé pour l'utilisateur
      return res.status(404).json({ message: 'Aucun panier trouvé pour cet utilisateur.' });
    }

    // Renvoyer le panier trouvé
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération du panier:', err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du panier.' });
  }
});




// Create a new order
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT - Mettre à jour le statut d'une commande (panier) par son cartId
router.put('/:cartId', async (req, res) => {
  const { cartId } = req.params;    // Récupère l'ID de la commande depuis l'URL
  const { status } = req.body;      // Récupère le nouveau statut depuis le corps de la requête

  try {
    // Requête SQL pour mettre à jour le statut de la commande
    const result = await db.query(
      'UPDATE cart SET status = $1 WHERE id = $2 RETURNING *',[status, cartId]);

    // Si aucun panier n'est trouvé pour cet ID
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    // Si tout s'est bien passé, renvoyer la commande mise à jour
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // Gestion des erreurs
    res.status(400).json({ error: err.message });
  }
});


// DELETE - Supprimer une commande par son ID
router.delete('/:cartId', async (req, res) => {
  const { cartId } = req.params;  // Récupère l'ID du panier à supprimer

  try {
    // Requête SQL pour supprimer la commande
    const result = await db.query(
      'DELETE FROM cart WHERE id = $1 RETURNING *',
      [cartId]
    );

    // Vérifier si une commande a été supprimée
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    // Renvoyer une réponse de succès après la suppression
    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (err) {
    // En cas d'erreur
    res.status(400).json({ error: err.message });
  }
});




module.exports = router;
