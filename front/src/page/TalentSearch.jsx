import { useState } from 'react';
import './talentSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import FilterSidebar from '../components/FilterSidebar';
import StudentCard from '../components/StudentCard';
import { useMockStudents, useIsDatabaseLoading } from '../data/mockData';

export default function TalentSearch() {
    const mockStudents = useMockStudents(); 
    const isLoading = useIsDatabaseLoading();

    // 1. CRITICAL FIX: All Hooks must run BEFORE any conditional return lines!
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 14;

    // 2. Safe check for Loading state
    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement de l'application...</div>;
    }

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
        setCurrentPage(1);
    };

    // 3. Defensive Filtering: Guard against undefined/null database attributes
    const filteredStudents = mockStudents.filter(student => {
        const searchLower = searchTerm.toLowerCase();
        
        const matchSearch = (student.name?.toLowerCase().includes(searchLower) || false) || 
                            (student.school?.toLowerCase().includes(searchLower) || false);
                            
        const matchLocation = (student.location?.toLowerCase().includes(location.toLowerCase()) || false);
        
        // Smarter skills filter: If no sidebar skill is active, pass through automatically.
        // Otherwise, cross-reference the student's dynamic skills array safely.
        const matchSkills = selectedSkills.length === 0 || 
                            selectedSkills.every(skill => student.skills?.includes(skill));

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