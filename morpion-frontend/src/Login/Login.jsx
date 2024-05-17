import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Créez un contexte d'authentification global

const themeColors = {
  primary: "#08D9D6",
  secondary: "#FF2E63",
  background: "#252A34",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nouvelle variable d'état pour stocker le message d'erreur
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/login', { email, mot_de_passe: motDePasse });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setAuthState({ token: response.data.token, authenticated: true });
        navigate('/matchmaking');
      } else {
        setErrorMessage(response.data.message); // Définir le message d'erreur
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Erreur lors de la connexion'); // Définir le message d'erreur
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: themeColors.background,
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>Connexion</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          sx={{ 
            input: { color: '#fff' }, 
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: themeColors.primary } },
            '& .MuiInputLabel-root': { color: '#fff' },
          }}
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <TextField
          fullWidth
          label="Mot de passe"
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          sx={{ 
            input: { color: '#fff' }, 
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: themeColors.primary } },
            '& .MuiInputLabel-root': { color: '#fff' },
          }}
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        {errorMessage && (
          <Typography variant="body2" sx={{ color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: '20px',
            backgroundColor: themeColors.primary,
            color: '#fff',
            '&:hover': {
              backgroundColor: themeColors.secondary,
            }
          }}
        >
          Connexion
        </Button>
      </form>
      <Typography
        component={Link}
        to="/inscription"
        sx={{ color: '#fff', textDecoration: 'underline', marginTop: '20px' }}
      >
        Créer un compte
      </Typography>
    </Box>
  );
};

export default Login;
