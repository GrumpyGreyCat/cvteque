import { useState } from 'react';
import './jobSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import JobCard from '../components/JobCard';
// Import the live data hooks from your updated mockData file
import { useMockJobs, useIsDatabaseLoading } from '../data/mockData';

export default function JobSearch() {
    // 1. Initialize live states from our global database cache
    const mockJobs = useMockJobs();
    const isLoading = useIsDatabaseLoading();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 5;

    // 2. Guardrail: Hold rendering until Symfony background fetches complete
    if (isLoading) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Chargement des offres d'emploi...</h2>
            </div>
        );
    }

    // 3. Defensive Filtering: Guard against missing or undefined properties from PostgreSQL data entries
    const filteredJobs = mockJobs.filter(job => {
        const searchLower = searchTerm.toLowerCase();
        
        return (
            (job.title?.toLowerCase().includes(searchLower) || false) ||
            (job.company?.toLowerCase().includes(searchLower) || false) ||
            (job.location?.toLowerCase().includes(searchLower) || false) ||
            (job.desc?.toLowerCase().includes(searchLower) || false)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    // Dynamic metrics calculation for stats row counters
    const totalJobsCount = mockJobs.length;
    // Extract unique companies using an ES6 Set map
    const totalCompaniesCount = new Set(mockJobs.map(job => job.company)).size;

    return (
        <div className="page-container">
            <HeaderBanner 
                title="Recherche d'entreprises" 
                subtitle="Trouvez les offres qui correspondent à vos besoins" 
            />

            <div className="stats-row">
                <div className="stat-box">Plus de {totalCompaniesCount} entreprises</div>
                <div className="stat-box">Plus de {totalJobsCount} postes</div>
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