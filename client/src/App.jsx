import React from 'react'
import Navbar from './component/Navbar'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import Footer from './component/Footer'
import VerifyEmail from './component/VerifyEmail'
import Dashboard from './pages/Dashboard'

const App = () => {
  const token = localStorage.getItem('token');
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {
          token && (
            <Route path='/dashboard' element={<Dashboard />} />
          )
        }

      </Routes>
      <Footer />
    </div>
  )
}

export default App
