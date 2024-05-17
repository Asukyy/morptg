import React, { useContext } from 'react';
import './Sidebar.css';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthState({ token: null, authenticated: false });
        navigate('/login');
    };

    return (
        <div className='aaaa'>
            <Drawer variant="permanent" anchor="left">
                <List>
                    <ListItem>
                        <ListItemText primary="Modes de jeu" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/matchmaking">
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Player vs Player" />
                    </ListItem>
                    <ListItem button component={Link} to="/pvb">
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Player vs Bot" />
                    </ListItem>
                    <ListItem button component={Link} to="/bvb">
                        <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
                        <ListItemText primary="Bot vs Bot" />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="Autres" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/store">
                        <ListItemIcon><StoreIcon /></ListItemIcon>
                        <ListItemText primary="Magasin" />
                    </ListItem>
                    <ListItem button component={Link} to="/friends">
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Amis" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Paramètres" />
                    </ListItem>
                    {authState.authenticated ? (
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Se déconnecter" />
                        </ListItem>
                    ) : (
                        <ListItem button component={Link} to="/login">
                            <ListItemIcon><LockIcon /></ListItemIcon>
                            <ListItemText primary="Connexion" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
