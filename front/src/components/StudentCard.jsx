import { Link } from 'react-router-dom';
import './studentCard.css';

export default function StudentCard({ student }) {
    return (
        <div className="student-card">
            <h3>{student.name}</h3>
            <span className="school-info">{student.school} <br/> {student.location}</span>
            <p className="desc">{student.desc}</p>
            <div className="skills-container">
                {student.skills.map((skill, index) => (
                    <span key={index} className="skill-pill">{skill}</span>
                ))}
            </div>
            <div className="card-actions">
                <a 
                    href={`mailto:${student.email}?subject=Prise de contact - Hexagone`} 
                    className="btn-contact"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
                >
                    Contacter
                </a>
                {/* On remplace le bouton par un lien qui pointe vers l'id de l'etudiant */}
                <Link to={`/etudiant/${student.id}`} className="btn-profile" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                    Voir profil
                </Link>
            </div>
        </div>
    );
}