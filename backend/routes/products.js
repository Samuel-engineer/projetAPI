const express = require('express');
const db = require('../db/db'); // Assure-toi d'importer ta connexion à la base de données

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  const { name, description, image, price, stock } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO products (name, description, image, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, image, price, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, image, price, stock } = req.body;

  try {
    // Effectuer la mise à jour du produit dans la base de données
    const result = await db.query(
      'UPDATE products SET name = $1, description = $2, image = $3, price = $4, stock = $5 WHERE id = $6 RETURNING *',
      [name, description, image, price, stock, id]
    );

    // Si aucun produit n'est mis à jour (id non trouvé), renvoyer une erreur
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    // Renvoyer le produit mis à jour
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
