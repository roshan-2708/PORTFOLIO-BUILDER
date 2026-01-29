import React from 'react'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './component/LoginPage'

const App = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path="/" element={<h1 className="p-4">Home Page</h1>} />
        <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
