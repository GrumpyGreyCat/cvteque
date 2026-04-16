import logo from '../assets/hexagone_logo.png'
import './navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-and-title-part">
                <img src={logo} className="logo" alt="Hexagone logo" />
                <h4 className="title">Hexagone</h4>
            </div>
            <div className="link-part">
                <a href='#'>Rechercher</a>
                <a href='#'>Écoles</a>
                <a href='#'>Entreprises</a>
                <a href='#' className="login-btn">Connexion</a>
            </div>
        </nav>
    )
}