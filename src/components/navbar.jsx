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
                <a href="#">Rechercher</a>
                <a href="#">Écoles</a>
                <a href="#">Entreprises</a>
                <Link to="/login" className="login-btn">Connexion</Link>
            </div>
        </nav>
    )
}