import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, styled } from "@mui/material";
import TicTacToe from "../TicTacToe/TicTacToe";

const themeColors = {
    primary: "#08D9D6",
    secondary: "#FF2E63",
    background: "#252A34",
  };

  const CustomCard = styled(Card)(({ theme }) => ({
    backgroundColor: themeColors.secondary,
    color: "#fff",
    borderRadius: "10px",
    transition: "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: themeColors.primary,
    },
  }));

  const PvB = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [difficulties, setDifficulties] = useState([]);
    const [showGame, setShowGame] = useState(false); // Nouvel état pour afficher le jeu

    const fetchDifficulties = async () => {
      try {
        const response = await fetch('http://localhost:5001/difficulte');
        const data = await response.json();
        setDifficulties(data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des difficultés :', error);
      }
    };

    useEffect(() => {
      fetchDifficulties();
    }, []);

    const handleDifficultySelect = (difficultyId) => {
      setSelectedDifficulty(difficultyId);
    };

    const handleValidate = () => {
      console.log("Difficulté sélectionnée :", selectedDifficulty);
      setShowGame(true); // Afficher le jeu après validation
    };

    return (
      <div style={{ backgroundColor: themeColors.background, padding: "20px" }}>
        {!showGame ? (
          <>
            <h1 style={{ color: "#fff" }}>PvB</h1>
            <Grid container spacing={3}>
              {difficulties.map((difficulty) => (
                <Grid item key={difficulty.ID} xs={12} sm={6} md={4}>
                  <CustomCard
                    sx={{
                      backgroundColor: selectedDifficulty === difficulty.ID ? themeColors.primary : themeColors.secondary,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDifficultySelect(difficulty.ID)}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2" sx={{ color: "#fff" }}>
                        {difficulty.Nom}
                      </Typography>
                      <Typography color="text.secondary" sx={{ color: "#fff" }}>
                        {difficulty.Description}
                      </Typography>
                    </CardContent>
                  </CustomCard>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: themeColors.primary,
                color: "#fff",
              }}
              disabled={selectedDifficulty === null}
              onClick={handleValidate}
            >
              Valider
            </Button>
          </>
        ) : (
          <TicTacToe />
        )}
      </div>
    );
  };

  export default PvB;
