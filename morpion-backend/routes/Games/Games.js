const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Middleware pour simuler un utilisateur connecté
router.use((req, res, next) => {
    req.user = { id: 1 }; // Simuler un utilisateur avec l'ID 1
    next();
});

router.get('/points', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT points FROM Utilisateur WHERE id = ?', [req.user.id]);
        connection.end();
        res.json({ points: rows[0].points });
    } catch (error) {
        console.error('Erreur SQL :', error.sqlMessage);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des points de l\'utilisateur' });
    }
});

module.exports = router;
