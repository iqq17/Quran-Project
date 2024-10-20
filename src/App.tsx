import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import ChapterPage from './pages/ChapterPage';
import VersePage from './pages/VersePage';
import RecitationPage from './pages/RecitationPage';
import LearningPathsPage from './pages/LearningPathsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import CommunityPage from './pages/CommunityPage';
import ProgressPage from './pages/ProgressPage';
import TafsirPage from './pages/TafsirPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/chapter/:chapterId" element={<ChapterPage />} />
            <Route path="/verse/:chapterId/:verseId" element={<VersePage />} />
            <Route path="/recitation" element={<RecitationPage />} />
            <Route path="/learning-paths" element={<LearningPathsPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/tafsir/:surahNumber/:verseNumber?" element={<TafsirPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
