const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

router.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Utilisateur WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];
            const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

            if (isMatch) {
                res.json({ success: true, userId: user.id });
            } else {
                res.json({ success: false, message: 'Mot de passe incorrect' });
            }
        } else {
            res.json({ success: false, message: 'Utilisateur non trouvé' });
        }

        connection.end();
    } catch (error) {
        console.error('Erreur SQL :', error.sqlMessage);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion' });
    }
});


router.post('/inscription', async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;

    if (!nom || !email || !mot_de_passe) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'INSERT INTO Utilisateur (nom, email, mot_de_passe, points, skin_selectionne) VALUES (?, ?, ?, 0, NULL)',
            [nom, email, hashedPassword]
        );

        await connection.end();

        if (result.affectedRows === 1) {
            res.status(201).json({ success: true, message: 'Utilisateur créé avec succès' });
        } else {
            res.status(500).json({ success: false, message: 'Erreur lors de la création de l\'utilisateur' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l\'inscription' });
    }
});

module.exports = router;
