import './jobCard.css';

export default function JobCard({ job }) {
    return (
        <div className="job-card">
            <div className="job-content">
                <h3>{job.title}</h3>
                <div className="job-tags">
                    <span className="tag-type">{job.type}</span>
                    <span className="tag-company">{job.company} • {job.location} • {job.duration}</span>
                </div>
                <p>{job.desc}</p>
                <span className="job-date">{job.date}</span>
            </div>
            <div className="job-actions">
                <a 
                    href={`mailto:recrutement@entreprise.com?subject=Candidature pour le poste : ${job.title}`} 
                    className="btn-contact"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
                >
                    Postuler
                </a>
                <button className="btn-profile">Voir l'offre</button>
            </div>
        </div>
    );
}