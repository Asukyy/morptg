const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const difficulteRouter = require('./../routes/Difficulte/Difficulte');

app.get('/api/test', (req, res) => {
    res.json({ message: 'Le serveur fonctionne correctement!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(difficulteRouter);
