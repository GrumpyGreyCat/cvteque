import {  Routes, Route } from 'react-router-dom';
import TalentSearch from './Pages/TalentSearch';
import JobSearch from './Pages/JobSearch';
import PartnerSearch from './Pages/PartnerSearch'
import Navbar from './components/navbar'; 

export default function App() {
    return (
      <>
            <Navbar />
            <Routes>
                <Route path="/etudiants" element={<TalentSearch />} />
                <Route path="/emplois" element={<JobSearch />} />
                <Route path="/partenaires" element={<PartnerSearch />} />
            </Routes>
        </>
    );
}