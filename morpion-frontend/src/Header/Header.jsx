import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [userPoints, setUserPoints] = useState(null);
    const { authState } = useContext(AuthContext);

    // useEffect(() => {
    //     const fetchUserPoints = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/points', {
    //                 withCredentials: true,
    //                 headers: {
    //                     Authorization: 'Bearer your-auth-token' // Remplacez par votre logique pour obtenir le token
    //                 }
    //             });
    //             setUserPoints(response.data.points);
    //         } catch (error) {
    //             console.error('Une erreur s\'est produite lors de la récupération des points de l\'utilisateur :', error);
    //         }
    //     };

    //     if (authState.authenticated) {
    //         fetchUserPoints();
    //     }
    // }, [authState]);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#181A1B', height: '57px', borderBottom: '1px solid white' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}></Box>
               greg
            </Toolbar>
        </AppBar>
    );
};

export default Header;
