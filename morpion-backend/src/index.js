const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

const difficulteRouter = require('./../routes/Difficulte/Difficulte');
const inscriptionRouter = require('./../routes/Login/Login');
const gamesRouter = require('./../routes/Games/Games');

app.use(difficulteRouter);
app.use(inscriptionRouter);
app.use(gamesRouter);

app.get('/api/test', (req, res) => {
    res.json({ message: 'Le serveur fonctionne correctement!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
