import React from 'react';
import './Sidebar.css';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (

        <div className='aaaa'>
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem>
                    <ListItemText primary="Modes de jeu" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/grid"> {/* Lien vers la page Grid */}
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Player vs Player" />
                </ListItem>
                <ListItem button component={Link} to="/pvb"> {/* Lien vers la page PvB */}
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Player vs Bot" />
                </ListItem>
                <ListItem button component={Link} to="/bvb"> {/* Lien vers la page BvB */}
                    <ListItemIcon><SportsEsportsIcon /></ListItemIcon>
                    <ListItemText primary="Bot vs Bot" />
                </ListItem>

                <ListItem>
                    <ListItemText primary="Autres" />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/store"> {/* Lien vers la page Store */}
                    <ListItemIcon><StoreIcon /></ListItemIcon>
                    <ListItemText primary="Magasin" />
                </ListItem>
                <ListItem button component={Link} to="/friends"> {/* Lien vers la page Friends */}
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Amis" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Paramètres" />
                </ListItem>
                <ListItem button component={Link} to="/login">
                    <ListItemIcon><LockIcon /></ListItemIcon>
                    <ListItemText primary="Connexion" />
                </ListItem>
            </List>
        </Drawer>
    </div>
    );
};

export default Sidebar;
