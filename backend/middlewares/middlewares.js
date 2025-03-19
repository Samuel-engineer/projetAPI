const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Format: 'Bearer TOKEN'
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};




function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token manquant' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });

        // Vérifiez si l'utilisateur a le rôle d'administrateur
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Accès interdit' });
        }

        req.user = user; // Ajoutez l'utilisateur décodé à la requête
        next();
    });
}

module.exports = authenticateToken;

module.exports = authenticateAdmin;



