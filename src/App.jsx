import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './page/Login'
import Landing from './page/Landing'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
