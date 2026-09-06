import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Routes, Route } from 'react-router-dom';
import { PublicHeader } from '../../components/public/PublicHeader';
import { PublicFooter } from '../../components/public/PublicFooter';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { SportsIndexPage } from './SportsIndexPage';
import { FootballPage } from './FootballPage';
import { SwimmingPage } from './SwimmingPage';
import { BasketballPage } from './BasketballPage';
import { SportConceptPage } from './SportConceptPage';
import { ProgramsPage } from './ProgramsPage';
import { ProgramPreviewPage } from './ProgramPreviewPage';
import { CoachesPage } from './CoachesPage';
import { ContactPage } from './ContactPage';
import {
  CoachPreviewPage,
  ParentPreviewPage,
  PlayerPreviewPage,
} from '../product-preview/ProductPreviewPages';
import { OlympicLuxurySplash } from '../../components/splash/OlympicLuxurySplash';

const brand = 'United Olympics Sports';
const brandAr = 'يونايتد أوليمبيكس سبورت';
const splashSessionKey = 'uos:splash-seen';

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080b] text-neutral-100">
      <PublicHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sports" element={<SportsIndexPage />} />
          <Route path="/sports/football" element={<FootballPage />} />
          <Route path="/sports/swimming" element={<SwimmingPage />} />
          <Route path="/sports/basketball" element={<BasketballPage />} />
          <Route path="/sports/tennis" element={<SportConceptPage sportId="tennis" />} />
          <Route path="/sports/gymnastics" element={<SportConceptPage sportId="gymnastics" />} />
          <Route path="/sports/martial-arts" element={<SportConceptPage sportId="martial-arts" />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:programSlug" element={<ProgramPreviewPage />} />
          <Route path="/coaches" element={<CoachesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <PublicFooter />
    </div>
  );
}

export function PublicSite() {
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return window.sessionStorage.getItem(splashSessionKey) !== '1';
    } catch {
      return true;
    }
  });

  const completeSplash = () => {
    try {
      window.sessionStorage.setItem(splashSessionKey, '1');
    } catch {
      /* storage may be unavailable */
    }
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <OlympicLuxurySplash
            onComplete={completeSplash}
            brand={brand}
            brandAr={brandAr}
          />
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/player" element={<PlayerPreviewPage />} />
        <Route path="/parent" element={<ParentPreviewPage />} />
        <Route path="/coach" element={<CoachPreviewPage />} />
        <Route path="*" element={<PublicLayout />} />
      </Routes>
    </>
  );
}

export default PublicSite;
