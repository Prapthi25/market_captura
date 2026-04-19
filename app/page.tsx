
'use client';

import { useState } from 'react';
import CursorEffect from './components/Cursoreffect';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import MarqueeStrip from './components/Marqueestrip';
import ServicesSection from './components/Servicessection';
import BlogsSection from './components/Blogssection';
import WhyUsSection from './components/Whyussection';
import CTASection from './components/Ctasection';
import Footer from './components/Footer';
import GetStartedModal from './components/Getstartedmodal ';
import NewHeroSection from './components/NewHeroSection';

// ── Replace this with your actual logo URL ──
const LOGO_URL = 'https://res.cloudinary.com/dk05wqwo1/image/upload/q_auto/f_auto/v1775669384/WhatsApp_Image_2026-04-07_at_4.58.11_PM_oqiqxo.jpg';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Custom cursor */}
      <CursorEffect />

      {/* Page loader */}
      <Loader />

      {/* Get Started modal */}
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Fixed navbar */}
      <Navbar logoUrl={LOGO_URL} onGetStarted={() => setModalOpen(true)} />

      {/* Main content */}
      <main>
        <NewHeroSection onGetStarted={() => setModalOpen(true)} />
        <HeroSection onGetStarted={() => setModalOpen(true)} />
        <MarqueeStrip />
        <ServicesSection />

        <WhyUsSection />

        <BlogsSection />


        <CTASection onGetStarted={() => setModalOpen(true)} />
      </main>



      <Footer />
    </>
  );
}


