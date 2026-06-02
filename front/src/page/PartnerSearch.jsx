import { useState } from 'react';
import './PartnerSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import PartnerCard from '../components/PartnerCard';
// Import the live data hooks from your updated mockData file
import { useMockPartners, useMockStudents, useIsDatabaseLoading } from '../data/mockData';

export default function PartnerSearch() {
    // 1. Initialize live states from our global database cache
    const mockPartners = useMockPartners();
    const mockStudents = useMockStudents(); // Imported to grab the total count of registered students
    const isLoading = useIsDatabaseLoading();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // 2. Guardrail: Hold rendering until Symfony background fetches complete
    if (isLoading) {
        return (
            <div className="page-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Chargement des partenaires...</h2>
            </div>
        );
    }

    // 3. Simple pagination logic operating safely on your live database array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPartners = mockPartners.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(mockPartners.length / itemsPerPage);

    // Dynamic extraction of unique student fields/years or default counts for your stats
    const totalSchools = mockPartners.length;
    const totalStudents = mockStudents.length;

    // Creation du titre avec deux couleurs
    const bannerTitle = (
        <>Ecoles <span style={{ color: '#f0a500' }}>Partenaires</span></>
    );

    return (
        <div className="page-container">
            <HeaderBanner title={bannerTitle} subtitle="" />

            <div className="stats-row">
                <div className="stat-box">
                    <span className="stat-number">{totalSchools}</span><br/>
                    écoles partenaires
                </div>
                <div className="stat-box">
                    <span className="stat-number">{totalStudents}</span><br/>
                    étudiants inscrits
                </div>
                <div className="stat-box">
                    Dans plus de <span className="stat-number">3</span> domaines
                </div>
            </div>

            <div className="partner-list">
                {currentPartners.length === 0 ? (
                    <p style={{ textAlign: 'center', width: '100%', margin: '40px 0' }}>Aucun partenaire enregistré pour le moment.</p>
                ) : (
                    currentPartners.map(partner => (
                        <PartnerCard key={partner.id} partner={partner} />
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button 
                            key={number} 
                            onClick={() => setCurrentPage(number)}
                            className={currentPage === number ? 'page-btn active' : 'page-btn'}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}