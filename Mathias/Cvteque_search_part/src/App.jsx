import {  Routes, Route } from 'react-router-dom';
import TalentSearch from './pages/TalentSearch';
import JobSearch from './pages/JobSearch';
// n'oublie pas d'importer ta navbar, ajuste le chemin si besoin
import Navbar from './components/navbar'; 

export default function App() {
    return (
      <>
            <Navbar />
            <Routes>
                <Route path="/etudiants" element={<TalentSearch />} />
                <Route path="/emplois" element={<JobSearch />} />
            </Routes>
        </>
    );
}