import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import MemorizationPage from './pages/MemorizationPage';
import ProgressPage from './pages/ProgressPage';
import ChallengesPage from './pages/ChallengesPage';
import QuestsPage from './pages/QuestsPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/memorization" element={<MemorizationPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;