import React, { useState } from "react";
import './Inscription.css';
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';

const themeColors = {
  primary: "#08D9D6",
  secondary: "#FF2E63",
  background: "#252A34",
  white: "#ffffff",
};

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [erreurMotDePasse, setErreurMotDePasse] = useState("");
  const [erreurEmail, setErreurEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (motDePasse !== confirmMotDePasse) {
      setErreurMotDePasse("Les mots de passe ne correspondent pas");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(motDePasse)) {
      let errorMessage = "";
      if (motDePasse.length < 8) {
        errorMessage += "Le mot de passe doit contenir au moins 8 caractères. ";
      }
      else if (!/[a-z]/.test(motDePasse)) {
        errorMessage += "Le mot de passe doit contenir au moins une lettre minuscule. ";
      }
      else if (!/[A-Z]/.test(motDePasse)) {
        errorMessage += "Le mot de passe doit contenir au moins une lettre majuscule. ";
      }
      else if (!/\d/.test(motDePasse)) {
        errorMessage += "Le mot de passe doit contenir au moins un chiffre. ";
      }
      else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(motDePasse)) {
        errorMessage += "Le mot de passe doit contenir au moins un caractère spécial. ";
      }
      setErreurMotDePasse(errorMessage.trim());
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/inscription', { nom, email, mot_de_passe: motDePasse });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      setErreurEmail("Cet email existe déjà");
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
      <Typography variant="h4" gutterBottom>Inscription</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          fullWidth
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
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
          label="Email"
          type="email"
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          error={!!erreurEmail}
          helperText={erreurEmail}
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
          type={showPassword ? "text" : "password"}
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          error={!!erreurMotDePasse}
          helperText={erreurMotDePasse}
          sx={{ 
            input: { color: '#fff' }, 
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: themeColors.primary } },
            '& .MuiInputLabel-root': { color: '#fff' },
          }}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: 'inherit' }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )
          }}
        />
        <TextField
          fullWidth
          label="Confirmer le mot de passe"
          type="password"
          value={confirmMotDePasse}
          onChange={(e) => setConfirmMotDePasse(e.target.value)}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: '20px',
            backgroundColor: themeColors.primary,
            color: '#fff',
            '&:hover': {
              backgroundColor: themeColors.secondary,
            },
          }}
        >
          S'inscrire
        </Button>
        <Typography variant="body2" sx={{ marginTop: '10px', color: '#fff' }}>
          Déjà un compte ? <Link to="/login" style={{ color: themeColors.primary, textDecoration: 'underline' }}>Se connecter</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Inscription;
