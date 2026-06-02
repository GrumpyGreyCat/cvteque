import { useParams } from 'react-router-dom';
import './studentProfile.css';
import { mockStudents, mockCvs } from '../data/mockData';

export default function StudentProfile() {
    const { id } = useParams();
    
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
                        <button className="btn-yellow">Contacter</button>
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
                                    <span className="cv-size">{studentCv.size}</span>
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
                        {student.education?.map((edu, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>{edu.title}</h4>
                                    <p>{edu.school}<br/>{edu.dates} • {edu.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="profile-card">
                        <h3 className="section-title">Expériences professionnelles</h3>
                        {student.experience?.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>{exp.title}</h4>
                                    <p>{exp.company} • {exp.location}<br/>{exp.dates}</p>
                                    <p className="exp-desc">{exp.desc}</p>
                                </div>
                            </div>
                        ))}
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
                            <p className="skills-label">Tags sélectionnés ({student.skills.length})</p>
                            <div className="skills-container">
                                {student.skills.map((skill, index) => (
                                    <span key={index} className="skill-pill">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}