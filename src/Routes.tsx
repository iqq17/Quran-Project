import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuranPage from './pages/QuranPage';
import MemorizationPage from './pages/MemorizationPage';
import ProgressPage from './pages/ProgressPage';
import ChallengesPage from './pages/ChallengesPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SurahPage from './pages/SurahPage';
import TafsirPage from './pages/TafsirPage';
import TodoPage from './pages/TodoPage';
import QuranLearningHub from './pages/QuranLearningHub';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quran" element={<QuranPage />} />
      <Route path="/surah/:surahNumber" element={<SurahPage />} />
      <Route path="/tafsir/:surahNumber/:verseNumber" element={<TafsirPage />} />
      <Route path="/memorization" element={<MemorizationPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/learning-hub" element={<QuranLearningHub />} />
    </Routes>
  );
};

export default AppRoutes;
