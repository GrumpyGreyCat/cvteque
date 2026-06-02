import logo from '../assets/hexagone_logo.png'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDatabase } from '../context/DataContext'

export default function Navbar() {
    const navigate = useNavigate();
    
    // Récupération de l'utilisateur connecté et de la fonction de déconnexion globale
    const { currentUser, logoutUser } = useDatabase();

    const handleLogout = () => {
        logoutUser();      // Supprime le localStorage et réinitialise l'état global React
        navigate('/login'); // Redirige instantanément vers la page de login
    };

    return (
        <nav className="navbar">
            <Link to='/' className="logo-link">
              <div className="logo-and-title-part">
                <img src={logo} className="logo" alt="Hexagone logo" />
                <h4 className="title">Hexagone</h4>
              </div>
            </Link>
            
            <div className="link-part">
                <Link to='/etudiants'>Etudiants</Link>
                <Link to='/emplois'>Emplois</Link>
                <Link to='/partenaires'>Partenaires</Link>
                
                {/* Condition d'affichage dynamique selon l'état de la session */}
                {currentUser ? (
                    <div className="user-session-zone" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Link to='/profil' className="profile-nav-link" style={{ fontWeight: '500' }}>
                            Mon Profil ({currentUser.name})
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="login-btn logout-btn"
                            style={{ 
                                cursor: 'pointer',
                                backgroundColor: '#d32f2f', // Rouge discret pour marquer la déconnexion
                                border: 'none'
                            }}
                        >
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="login-btn">Connexion</Link>
                )}
            </div>
        </nav>
    )
}