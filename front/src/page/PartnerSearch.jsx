import { useState } from 'react';
import './partnerSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import PartnerCard from '../components/PartnerCard';
import { mockPartners } from '../data/mockData';

export default function PartnerSearch() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // tu pourras ajuster ça

    // logique de pagination simple (pas de filtre cette fois)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPartners = mockPartners.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(mockPartners.length / itemsPerPage);

    // creation du titre avec deux couleurs
    const bannerTitle = (
        <>Ecoles <span style={{ color: '#f0a500' }}>Partenaires</span></>
    );

    return (
        <div className="page-container">
            <HeaderBanner title={bannerTitle} subtitle="" />

            <div className="stats-row">
                <div className="stat-box">
                    <span className="stat-number">X</span><br/>
                    écoles partenaires
                </div>
                <div className="stat-box">
                    <span className="stat-number">X</span><br/>
                    étudiants inscrits
                </div>
                <div className="stat-box">
                    Dans plus de <span className="stat-number">X</span> domaines
                </div>
            </div>

            <div className="partner-list">
                {currentPartners.map(partner => (
                    <PartnerCard key={partner.id} partner={partner} />
                ))}
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