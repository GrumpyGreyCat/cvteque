import { useState } from 'react';
import { Typography, ToggleButton, ToggleButtonGroup, TextField, Button, Paper } from '@mui/material';
import './Login.css';

export default function Login() {
  const [userType, setUserType] = useState('students');

  const handleTypeChange = (event, newType) => {
    if (newType !== null) setUserType(newType);
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="hero-card">
          <Typography variant="h4" className="hero-title">
            Bienvenue sur <br />
            <span className="highlight">Hexagone CVthèque</span>
          </Typography>
          <p className="hero-desc">
            Connectez-vous pour accéder à votre espace personnel et gérer vos profils, 
            rechercher des talents ou publier des offres d’emploi.
          </p>
          <ul className="hero-list">
            <li>Des profils vérifiés, variés et compétents</li>
            <li>Une recherche simplifiée et avancée</li>
            <li>Des écoles partenaires certifiées</li>
          </ul>
        </div>

        <Paper elevation={6} className="form-card">
          <Typography variant="h4" className="form-title">Connexion</Typography>
          
          <ToggleButtonGroup
            value={userType}
            exclusive
            onChange={handleTypeChange}
            fullWidth
            className="toggle-group"
          >
            <ToggleButton value="students" className="toggle-btn">
              <h3>Students</h3>
            </ToggleButton>
            <ToggleButton value="school" className="toggle-btn">
              <h3>School</h3>
            </ToggleButton>
            <ToggleButton value="entreprise" className="toggle-btn">
              <h3>Entreprise</h3>
            </ToggleButton>
          </ToggleButtonGroup>

          <form className="login-form">
            <Typography className="input-label">Email</Typography>
            <TextField 
              fullWidth 
              placeholder="Adresse E-mail" 
              variant="outlined"
              className="custom-input"
            />
            
            <Typography className="input-label">Password</Typography>
            <TextField 
              fullWidth 
              type="password" 
              placeholder="Mot de passe" 
              variant="outlined"
              className="custom-input"
            />

            <Button fullWidth variant="contained" className="login-submit">
              Se Connecter
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}