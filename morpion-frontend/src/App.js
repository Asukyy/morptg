import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Store from './Store/Store';
import Friends from './Friends/Friends';
import Pvp from './Pvp/Pvp';
import PvB from './PvB/PvB';
import BvB from './BvB/BvB';
import Login from './Login/Login';
import Header from './Header/Header';
import Inscription from './Inscription/Inscription';
import { CssBaseline, Container, Box, styled } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const AppContainer = styled(Box)({
    backgroundColor: '#252A34',
    minHeight: '100vh',
});

function AppContent() {
    return (
        <>
            <CssBaseline />
            <Header />
            <AppContainer sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Navigate to="/matchmaking" />} />
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
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;
