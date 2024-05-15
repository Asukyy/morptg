import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Grid from './Grid/Grid';
import Store from './Store/Store';
import Friends from './Friends/Friends';
import Pvp from './Pvp/Pvp';
import PvB from './PvB/PvB';
import BvB from './BvB/BvB';
import Login from './Login/Login';
import Inscription from './Inscription/Inscription';
import { CssBaseline, Container, Box, styled } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppContainer = styled(Box)({
  backgroundColor: '#252A34', // Définir le fond de page global
  minHeight: '100vh', // Pour s'assurer que le contenu couvre toute la hauteur de la fenêtre
});

function App() {
    return (
        <Router>
            <CssBaseline /> {/* Réinitialisation des styles par défaut du navigateur */}
            <AppContainer sx={{ display: 'flex' }}>
                <Sidebar />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                >
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/grid" element={<Grid />} />
                            <Route path="/store" element={<Store />} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/matchmaking" element={<Pvp />} />
                            <Route path="/pvb" element={<PvB />} />
                            <Route path="/bvb" element={<BvB />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/inscription" element={<Inscription />} />
                        </Routes>
                    </Container>
                </Box>
            </AppContainer>
        </Router>
    );
}

function Home() {
    return <h1>Bienvenue dans le jeu de morpion</h1>;
}

export default App;
