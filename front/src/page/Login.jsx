import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import pour rediriger après connexion
import { Typography, ToggleButton, ToggleButtonGroup, TextField, Button, Paper, Alert } from '@mui/material';
import './Login.css';
import { useDatabase } from '../context/DataContext';

export default function Login() {
  const { loginUser } = useDatabase();
  const [userType, setUserType] = useState('students');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setUserType(newType);
      setError(null); // Réinitialise l'erreur si on change d'onglet
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let loginUrl = 'http://127.0.0.1:8000/api/login';
    if (userType === 'school') loginUrl = 'http://127.0.0.1:8000/api/login-school';
    if (userType === 'entreprise') loginUrl = 'http://127.0.0.1:8000/api/login-company';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects ou espace indisponible.');
      }

      const data = await response.json();
      console.log("Connexion réussie ! Données :", data);

      loginUser({ ...data, type: userType });

      navigate('/profil');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

          {/* Affichage d'un message d'erreur si l'API renvoie un échec */}
          {error && (
            <Alert severity="error" style={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <Typography className="input-label">Email</Typography>
            <TextField 
              fullWidth 
              placeholder="Adresse E-mail" 
              variant="outlined"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            
            <Typography className="input-label">Password</Typography>
            <TextField 
              fullWidth 
              type="password" 
              placeholder="Mot de passe" 
              variant="outlined"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button 
              fullWidth 
              variant="contained" 
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se Connecter'}
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}