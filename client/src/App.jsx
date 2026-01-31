import React from 'react'
import Navbar from './component/Navbar'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
import VerifyEmail from './component/VerifyEmail'

const App = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </div>
  )
}

export default App
