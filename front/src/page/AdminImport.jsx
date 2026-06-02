import { useState } from 'react';
import './adminImport.css';
import HeaderBanner from '../components/HeaderBanner';

export default function AdminImport() {
    const [fileData, setFileData] = useState(null);
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setStatus('idle');
        
        if (file.type !== "application/json") {
            setStatus('error');
            setErrorMessage("Le fichier doit être au format .json");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target.result);
                if (Array.isArray(parsedData)) {
                    setFileData(parsedData);
                } else {
                    throw new Error("Le JSON doit être un tableau.");
                }
            } catch (error) {
                setStatus('error');
                setErrorMessage("Le fichier JSON est mal formaté.");
            }
        };
        reader.readAsText(file);
    };

    const handleStudentChange = (index, field, value) => {
        const newData = [...fileData];
        
        // Gestion speciale pour les competences (on transforme la string en tableau)
        if (field === 'skills') {
            const skillsArray = value.split(',').map(s => s.trim()).filter(s => s !== '');
            newData[index] = { ...newData[index], [field]: skillsArray };
        } else {
            newData[index] = { ...newData[index], [field]: value };
        }
        
        setFileData(newData);
    };

    const removeStudent = (index) => {
        const newData = fileData.filter((_, i) => i !== index);
        setFileData(newData);
        if (newData.length === 0) {
            setFileData(null);
            setFileName('');
        }
    };

    const handleSubmit = () => {
        if (!fileData || fileData.length === 0) return;
        setStatus('loading');

        setTimeout(() => {
            console.log("Données parfaites envoyées à Symfony (BDD) :", fileData);
            setStatus('success');
            setFileData(null);
            setFileName('');
        }, 1500);
    };

    return (
        <div className="page-container">
            <HeaderBanner 
                title="Administration" 
                subtitle="Importation et édition des étudiants en masse" 
            />

            <div className="admin-layout">
                <div className="admin-card upload-section">
                    <h3>Importer le fichier JSON</h3>
                    
                    <div className="file-input-wrapper">
                        <input 
                            type="file" 
                            accept=".json" 
                            onChange={handleFileUpload}
                            className="file-input"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="btn-white">
                            Parcourir...
                        </label>
                        <span className="file-name">{fileName || "Aucun fichier sélectionné"}</span>
                    </div>

                    {status === 'error' && <div className="alert error">{errorMessage}</div>}
                    {status === 'success' && <div className="alert success">Les étudiants ont été insérés dans la base de données !</div>}
                </div>

                {fileData && status !== 'success' && (
                    <div className="admin-card edit-section">
                        <div className="preview-header">
                            <h3>Vérification des données</h3>
                            <span className="badge-count">{fileData.length} profils trouvés</span>
                        </div>
                        
                        <div className="editable-cards-container">
                            {fileData.map((student, index) => (
                                <div key={index} className="editable-student-card">
                                    <div className="card-header-actions">
                                        <h4>{student.name || `Étudiant #${index + 1}`}</h4>
                                        <button className="btn-delete" onClick={() => removeStudent(index)}>Supprimer</button>
                                    </div>
                                    
                                    {/* Grille avec TOUS les champs de la BDD */}
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label>Nom complet</label>
                                            <input type="text" value={student.name || ''} onChange={(e) => handleStudentChange(index, 'name', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Mot de passe (temporaire)</label>
                                            <input type="text" value={student.password || ''} onChange={(e) => handleStudentChange(index, 'password', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Email de connexion</label>
                                            <input type="email" value={student.email || ''} onChange={(e) => handleStudentChange(index, 'email', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Téléphone</label>
                                            <input type="text" value={student.phone || ''} onChange={(e) => handleStudentChange(index, 'phone', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>École actuelle</label>
                                            <input type="text" value={student.school || ''} onChange={(e) => handleStudentChange(index, 'school', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Année d'étude</label>
                                            <input type="text" value={student.year || ''} onChange={(e) => handleStudentChange(index, 'year', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Localisation</label>
                                            <input type="text" value={student.location || ''} onChange={(e) => handleStudentChange(index, 'location', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Compétences (séparées par une virgule)</label>
                                            <input 
                                                type="text" 
                                                value={student.skills ? student.skills.join(', ') : ''} 
                                                onChange={(e) => handleStudentChange(index, 'skills', e.target.value)} 
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Profil LinkedIn</label>
                                            <input type="text" value={student.linkedin || ''} onChange={(e) => handleStudentChange(index, 'linkedin', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Profil GitHub</label>
                                            <input type="text" value={student.github || ''} onChange={(e) => handleStudentChange(index, 'github', e.target.value)} />
                                        </div>
                                        <div className="input-group full-width">
                                            <label>Description du profil</label>
                                            <textarea value={student.description || ''} onChange={(e) => handleStudentChange(index, 'description', e.target.value)} rows="3" />
                                        </div>
                                    </div>
                                    
                                    {/* Résumé des données complexes */}
                                    <div className="complex-data-summary">
                                        <span> {student.education ? student.education.length : 0} diplômes</span>
                                        <span> {student.experience ? student.experience.length : 0} expériences</span>
                                        <span> {student.projects ? student.projects.length : 0} projets</span>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <button 
                            className="btn-yellow submit-btn" 
                            onClick={handleSubmit}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Enregistrement dans la BDD...' : 'Valider et envoyer vers Symfony'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}