import './jobSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import JobCard from '../components/JobCard';
import { mockJobs } from '../data/mockData';

export default function JobSearch() {
    return (
        <div className="page-container">
            <HeaderBanner 
                title="Recherche de d'entreprises" 
                subtitle="Trouvez les offres qui correspondent à vos besoins" 
            />

            <div className="stats-row">
                <div className="stat-box">Plus de X entreprises</div>
                <div className="stat-box">Plus de X postes</div>
                <div className="stat-box"></div>
            </div>

            <div className="search-bar-container">
                <input type="text" placeholder="rechercher par domaines, nom, ..." className="main-search-input" />
            </div>

            <div className="job-list">
                {mockJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="pagination">
                <span>1 2 3 ... 431</span>
            </div>
        </div>
    );
}