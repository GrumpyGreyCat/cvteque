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
                <button className="btn-contact">Contacter</button>
                <button className="btn-profile">Voir profil</button>
            </div>
        </div>
    );
}