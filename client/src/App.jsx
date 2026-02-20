import React from 'react'
import Navbar from './component/Navbar'
import Landing from './pages/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './component/Footer'
import VerifyEmail from './component/VerifyEmail'
import Dashboard from './pages/Dashboard'
import UsersPortfolio from './Portfolio/UsersPortfolio'
import BuildingPortfolio from './Portfolio/BuildingPortfolio'
// import PortfolioPreview from './Portfolio/PortfolioPreview'
import ViewPortfolio from './Portfolio/ViewPortfolio'

const App = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isPortfolioPage = location.pathname.startsWith('/portfolio/');
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<h1 className="p-4">404 Not Found</h1>} />
        <Route path='/verify-email' element={<VerifyEmail />} />

        {
          token && (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/my-portfolios' element={<UsersPortfolio />} />
              <Route path='/create-portfolio' element={<BuildingPortfolio />} />
              {/* <Route path="/portfolio/:id" element={<ViewPortfolio />} /> */}
              <Route path="/portfolio/me/:id" element={<ViewPortfolio />} />
            </>
          )
        }
        <Route path="/portfolio/:slug" element={<ViewPortfolio />} />
      </Routes>
      {!isPortfolioPage && <Footer />}
    </div>
  )
}

export default App
