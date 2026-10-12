import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Offers from './components/Offers';
import About from './components/About';
import FunExpertise from './components/FunExpertise';
import Games from './components/Games';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import OfferModal from './components/OfferModal';
import Admin from './components/Admin';

function App() {
  const [isAdminView, setIsAdminView] = useState(
    window.location.hash === '#admin' || window.location.pathname === '/admin'
  );
  const [isOfferOpen, setIsOfferOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin' || window.location.pathname === '/admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Auto trigger pop-up after 2 seconds (only on main website)
  useEffect(() => {
    if (isAdminView) return;
    const timer = setTimeout(() => {
      setIsOfferOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAdminView]);

  const handleOpenOffer = () => setIsOfferOpen(true);
  const handleCloseOffer = () => setIsOfferOpen(false);

  // Agar user Admin route par ho to Admin page render karein
  if (isAdminView) {
    return <Admin onBackToHome={() => { window.location.hash = ''; setIsAdminView(false); }} />;
  }

  return (
    <div className="bg-[#FDFBF7] text-[#1E293B] min-h-screen font-sans selection:bg-[#FF007F] selection:text-white relative">
      <Navbar onOpenOffer={handleOpenOffer} />
      <Hero onOpenOffer={handleOpenOffer} />
      <Offers onOpenOffer={handleOpenOffer} />
      <About />
      <FunExpertise />
      <Games onOpenOffer={handleOpenOffer} />
      <Gallery />
      <Contact />

      {/* Discrete Admin Link at the very bottom */}
      <footer className="py-6 bg-slate-950 text-center border-t border-slate-900 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Anchor Shubham Atre. All rights reserved.</p>
        <button
          onClick={() => { window.location.hash = 'admin'; setIsAdminView(true); }}
          className="mt-2 text-slate-600 hover:text-amber-400 transition-colors underline"
        >
          Staff / Admin Portal
        </button>
      </footer>

      {/* Front Pop-up Modal */}
      <OfferModal isOpen={isOfferOpen} onClose={handleCloseOffer} />
    </div>
  );
}

export default App;
