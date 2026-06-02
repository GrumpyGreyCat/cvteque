import { useState } from 'react';
import './talentSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import FilterSidebar from '../components/FilterSidebar';
import StudentCard from '../components/StudentCard';
import { mockStudents } from '../data/mockData';

export default function TalentSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 10;

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
        setCurrentPage(1);
    };

    const filteredStudents = mockStudents.filter(student => {
        const searchLower = searchTerm.toLowerCase();
        
        const matchSearch = student.name.toLowerCase().includes(searchLower) || 
                            student.school.toLowerCase().includes(searchLower);
                            
        const matchLocation = student.location.toLowerCase().includes(location.toLowerCase());
        
        const matchSkills = selectedSkills.every(skill => student.skills.includes(skill));

        return matchSearch && matchLocation && matchSkills;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    return (
        <div className="page-container">
            <HeaderBanner title="Recherche de talents" subtitle="Trouvez les profils qui correspondent à vos besoins" />

            <div className="search-bar-container">
                <input 
                    type="text" 
                    placeholder="rechercher par écoles, compétences, nom, ..." 
                    className="main-search-input"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="talent-layout">
                <FilterSidebar 
                    location={location} 
                    setLocation={setLocation} 
                    selectedSkills={selectedSkills}
                    toggleSkill={toggleSkill}
                />
                <div className="talent-grid">
                    {currentStudents.length === 0 && <p>Aucun talent trouvé.</p>}
                    
                    {currentStudents.map(student => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </div>
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