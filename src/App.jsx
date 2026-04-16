import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './page/Login'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
