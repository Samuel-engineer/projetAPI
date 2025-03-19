
const authenticateAdmin = require('../middlewares/middlewares.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db.js');
const router = express.Router();

// Route pour obtenir tous les produits
router.get('/products', authenticateAdmin, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour ajouter un nouveau produit
router.post('/products', authenticateAdmin, async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Route pour supprimer un produit
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        res.sendStatus(204); // 204 No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;


    try {
        // Update delivery address and/or status for the given order
        const updateQuery = `
            UPDATE products
        SET name = COALESCE($1, name),
            description = COALESCE($2, description),
            price = COALESCE($3, price),
            stock = COALESCE($4, stock),
            image = COALESCE($5, image),
            updated_at = NOW()
        WHERE id = $6
        RETURNING name, description, price, stock, image;

        `;
        const updateResult = await db.query(updateQuery, [name, description, price, stock, id]);

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'products information not found for this order.' });
        }

        // Return the updated delivery information
        res.status(200).json(updateResult.rows[0]);

    } catch (error) {
        console.error('Error updating products information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route de connexion pour les administrateurs
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Vérifier si l'utilisateur est un admin
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Accès interdit' });
        }

        // Créer un token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        return res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
});


// GET - Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    // Requête SQL pour récupérer tous les utilisateurs
    const result = await db.query('SELECT * FROM users');

    // Si aucun utilisateur n'est trouvé
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    }

    // Renvoyer la liste des utilisateurs
    res.status(200).json(result.rows);
  } catch (err) {
    // En cas d'erreur
    res.status(500).json({ error: err.message });
  }
});


// DELETE - Supprimer un utilisateur par son ID
router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;  // Récupère l'ID de l'utilisateur à supprimer

  try {
    // Requête SQL pour supprimer l'utilisateur
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [userId]
    );

    // Vérifier si un utilisateur a été supprimé
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Si l'utilisateur a été supprimé, renvoyer un message de succès
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    // En cas d'erreur
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
