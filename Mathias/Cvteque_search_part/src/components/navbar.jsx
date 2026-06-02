import logo from '../assets/hexagone_logo.png'
import etudiant from '../assets/test_icon.svg'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to='/' className="logo-and-title-part">
                <img src={logo} className="logo" alt="Hexagone logo" />
                <h4 className="title">Hexagone</h4>
            </Link>
            
            <div className="link-part">
                {/* on utilise Link to au lieu de a href */}
                <Link to='/etudiants'>
                    <img src={etudiant} className="logo" alt="Icone d'etudiant"/>Etudiants
                </Link>
                
                <Link to='/emplois'>
                    <img src={etudiant} className="logo" alt="Icone d'etudiant"/>Emplois
                </Link>
                
                <Link to='/partenaires'>
                    <img src={etudiant} className="logo" alt="Icone d'etudiant"/>Partenaires
                </Link>
                
                <Link to="/login" className="login-btn">Connexion</Link>
            </div>
        </nav>
    )
}