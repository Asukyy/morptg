const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}


router.get('/difficulte', async (req, res) => {

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Difficulte');
        connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Erreur SQL :', error.sqlMessage);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des difficultés' });
    }

});

module.exports = router;

