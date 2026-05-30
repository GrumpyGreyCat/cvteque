import './talentSearch.css';
import HeaderBanner from '../components/HeaderBanner';
import FilterSidebar from '../components/FilterSidebar';
import StudentCard from '../components/StudentCard';
import { mockStudents } from '../data/mockData';

export default function TalentSearch() {
    return (
        <div className="page-container">
            <HeaderBanner 
                title="Recherche de talents" 
                subtitle="Trouvez les profils qui correspondent à vos besoins" 
            />
            
            <div className="search-bar-container">
                <input type="text" placeholder="rechercher par écoles, compétences, nom, ..." className="main-search-input" />
            </div>

            <div className="talent-layout">
                <FilterSidebar />
                <div className="talent-grid">
                    {mockStudents.map(student => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </div>
            </div>

            <div className="pagination">
                <span>1 2 3 ... 431</span>
            </div>
        </div>
    );
}