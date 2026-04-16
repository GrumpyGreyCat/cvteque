import logo from '../assets/hexagone_logo.png'
import etudiant from '../assets/test_icon.svg'
import './navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-and-title-part">
                <img src={logo} className="logo" alt="Hexagone logo" />
                <h4 className="title">Hexagone</h4>
            </div>
            <div className="link-part">
                <a href='#'><img src={etudiant} className="logo" alt="Icone d'etudiant" />Etudiants</a>
                <a href='#'><img src={etudiant} className="logo" alt="Icone d'etudiant" />Emplois</a>
                <a href='#'><img src={etudiant} className="logo" alt="Icone d'etudiant" />Partenaires</a>
                <a href='#' className="login-btn">Connexion</a>
            </div>
        </nav>
    )
}