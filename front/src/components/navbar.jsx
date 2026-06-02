import logo from '../assets/hexagone_logo.png'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
                
                <Link to="/login" className="login-btn">Connexion</Link>
            </div>
        </nav>
    )
}