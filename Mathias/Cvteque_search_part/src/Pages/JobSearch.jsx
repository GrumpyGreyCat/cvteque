import { useState } from 'react';
import './jobSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import JobCard from '../components/JobCard';
import { mockJobs } from '../data/mockData';

export default function JobSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 5;

    const filteredJobs = mockJobs.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        
        return (
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.location.toLowerCase().includes(searchLower) ||
            job.desc.toLowerCase().includes(searchLower)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    return (
        <div className="page-container">
            <HeaderBanner 
                title="Recherche d'entreprises" 
                subtitle="Trouvez les offres qui correspondent à vos besoins" 
            />

            <div className="stats-row">
                <div className="stat-box">Plus de X entreprises</div>
                <div className="stat-box">Plus de X postes</div>
                <div className="stat-box"></div>
            </div>

            <div className="search-bar-container">
                <input 
                    type="text" 
                    placeholder="rechercher par domaines, nom, ..." 
                    className="main-search-input"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="job-list">
                {currentJobs.length === 0 && <p>Aucune offre trouvée.</p>}
                
                {currentJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination" style={{ textAlign: 'center', marginTop: '30px' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button 
                            key={number} 
                            onClick={() => setCurrentPage(number)}
                            style={{
                                margin: '0 5px',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: currentPage === number ? '#2b4c7e' : '#ddd',
                                color: currentPage === number ? 'white' : 'black',
                                cursor: 'pointer'
                            }}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}