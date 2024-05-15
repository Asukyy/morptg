import React from 'react';
import { TextField, Button, Link, Typography, Box, styled } from '@mui/material';

const themeColors = {
  primary: "#08D9D6",
  secondary: "#FF2E63",
  background: "#252A34",
  text: "#FFFFFF"
};

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  margin: '0 auto',
  backgroundColor: themeColors.background,
  padding: '20px',
  borderRadius: '10px',
  color: themeColors.text,
});

const LoginForm = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.background }}>
      <StyledForm>
        <TextField
          label="Nom d'utilisateur"
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{ style: { color: themeColors.text } }}
        />
        <TextField
          label="Mot de passe"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{ style: { color: themeColors.text } }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '20px', backgroundColor: themeColors.primary }}
        >
          Connexion
        </Button>
        <Typography sx={{ color: themeColors.text, marginTop: '10px' }}>
          <Link href="/inscription" underline="hover">
            Pas encore inscrit ? Inscrivez-vous ici
          </Link>
        </Typography>
      </StyledForm>
    </Box>
  );
};

export default LoginForm;
