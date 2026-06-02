import { useParams } from 'react-router-dom';
import './studentProfile.css';
// Import the live data hooks from your updated mockData file
import { useMockStudents, useMockCvs, useIsDatabaseLoading } from '../data/mockData';

export default function StudentProfile() {
    const { id } = useParams();
    
    // 1. Initialize live states from our global database cache
    const mockStudents = useMockStudents();
    const mockCvs = useMockCvs();
    const isLoading = useIsDatabaseLoading();

    // 2. Guardrail: Hold rendering until Symfony background fetches complete
    if (isLoading) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Chargement du profil...</h2>
            </div>
        );
    }

    // 3. Find matching entities within the synchronized lists
    const student = mockStudents.find(s => s.id === parseInt(id));

    if (!student) {
        return <div className="page-container"><h2>Étudiant introuvable</h2></div>;
    }
    const studentCv = mockCvs.find(cv => cv.student_id === student.id);

    return (
        <div className="page-container">
            <div className="profile-header">
                <div className="profile-header-top">
                    <div>
                        <h2>{student.name}</h2>
                        <span className="profile-year">{student.year}</span>
                    </div>
                    <div className="profile-header-actions">
                        {/* On remplace le <button> par un <a> avec mailto: */}
                        <a 
                            href={`mailto:${student.email}?subject=Contact depuis Hexagone CVthèque`} 
                            className="btn-yellow" 
                            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                        >
                            Contacter
                        </a>

                        {/* Le bouton CV marche déjà normalement car il a le href et le download */}
                        {studentCv && (
                            <a href={studentCv.url} download className="btn-white">Télécharger CV</a>
                        )}
                    </div>
                </div>
                
                <div className="profile-header-info">
                    <span>• {student.school}</span>
                    <span>• {student.location}</span>
                    <span>• {student.year} d'études</span>
                </div>

                <div className="profile-header-desc">
                    <h4>Description</h4>
                    <p>{student.desc}</p>
                </div>
            </div>

            <div className="profile-layout">
                <div className="profile-left-col">
                    <div className="profile-card">
                        <h3>CV</h3>
                        {studentCv ? (
                            <div className="cv-box">
                                <div className="cv-file-info">
                                    <span>{studentCv.name}</span>
                                    <span className="cv-size">{studentCv.size || 'PDF'}</span>
                                </div>
                                <span className="cv-type">Document pdf</span>
                                <a href={studentCv.url} download className="btn-yellow-small">Télécharger</a>
                            </div>
                        ) : (
                            <div className="cv-box cv-empty">
                                <p>Aucun CV disponible pour le moment.</p>
                            </div>
                        )}
                    </div>

                    <div className="profile-card">
                        <h3>Contact</h3>
                        <ul className="contact-list">
                            <li><span className="contact-icon"></span> {student.email}</li>
                            <li><span className="contact-icon"></span> {student.phone}</li>
                            <li><span className="contact-icon"></span> {student.location}</li>
                            <li><span className="contact-icon"></span> {student.linkedin}</li>
                            <li><span className="contact-icon"></span> {student.github}</li>
                        </ul>
                    </div>
                </div>

                <div className="profile-right-col">
                    <div className="profile-card">
                        <h3 className="section-title">Parcours académiques</h3>
                        {student.education && student.education.length > 0 ? (
                            student.education.map((edu, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h4>{edu.title}</h4>
                                        <p>{edu.school}<br/>{edu.dates} • {edu.location}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>Aucun parcours académique renseigné.</p>
                        )}
                    </div>

                    <div className="profile-card">
                        <h3 className="section-title">Expériences professionnelles</h3>
                        {student.experience && student.experience.length > 0 ? (
                            student.experience.map((exp, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <h4>{exp.title}</h4>
                                        <p>{exp.company} • {exp.location}<br/>{exp.dates}</p>
                                        <p className="exp-desc">{exp.desc}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#666', fontStyle: 'italic' }}>Aucune expérience professionnelle renseignée.</p>
                        )}
                    </div>

                    <div className="profile-card">
                        <h3>CV</h3>
                        {studentCv ? (
                            <div className="cv-box">
                                <div className="cv-file-info">
                                    <span>{studentCv.name}</span>
                                </div>
                                <span className="cv-type">Document pdf</span>
                                <a href={studentCv.url} download className="btn-yellow-small">Télécharger</a>
                            </div>
                        ) : (
                            <div className="cv-box cv-empty">
                                <p>Aucun CV disponible pour le moment.</p>
                            </div>
                        )}
                    </div>

                    <div className="profile-card">
                        <h3 className="section-title">Compétences & technologies</h3>
                        <div className="skills-section">
                            <p className="skills-label">Tags sélectionnés ({student.skills ? student.skills.length : 0})</p>
                            <div className="skills-container">
                                {student.skills && student.skills.length > 0 ? (
                                    student.skills.map((skill, index) => (
                                        <span key={index} className="skill-pill">{skill}</span>
                                    ))
                                ) : (
                                    <span style={{ color: '#666', fontStyle: 'italic' }}>Aucune compétence répertoriée</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}