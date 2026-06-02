import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import Navbar from './components/navbar'
import Login from './page/Login'
import Landing from './page/Landing'
import TalentSearch from './page/TalentSearch';
import JobSearch from './page/JobSearch';
import PartnerSearch from './page/PartnerSearch'
import StudentProfile from './page/StudentProfile';
import AdminImport from './page/AdminImport'; 
import './App.css'

function App() {
  return (
    <>
    <DataProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/etudiants" element={<TalentSearch />} />
        <Route path="/emplois" element={<JobSearch />} />
        <Route path="/partenaires" element={<PartnerSearch />} />
        <Route path='/login' element={<Login />} />
        <Route path="/etudiant/:id" element={<StudentProfile />} />
        <Route path="/admin" element={<AdminImport />} />
      </Routes>
    </DataProvider>
    </>
  )
}

export default App
