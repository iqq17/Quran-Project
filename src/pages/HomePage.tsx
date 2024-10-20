"use client"

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Award, Users, Compass, Moon, Sun, Mic, Headphones } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { fetchRandomVerse, fetchUserProgress } from '../api';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
  >
    <Link to={link} className="block p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-[#f2f1ec] rounded-full text-[#365b6d] mr-4">{icon}</div>
        <h2 className="text-xl font-semibold text-[#365b6d]">{title}</h2>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  </motion.div>
);

interface RandomVerse {
  text: string;
  translation: string;
  reference: string;
}

interface UserProgress {
  chaptersRead: number;
  versesMemorized: number;
}

const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [randomVerse, setRandomVerse] = useState<RandomVerse>({ text: '', translation: '', reference: '' });
  const [userProgress, setUserProgress] = useState<UserProgress>({ chaptersRead: 0, versesMemorized: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const verse = await fetchRandomVerse();
        setRandomVerse(verse);
        const progress = await fetchUserProgress();
        setUserProgress(progress);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-[#f2f1ec] to-[#e2e1dc]'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}
          >
            Al-Raajih: Qira'at Ashr
          </motion.h1>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Book className="w-6 h-6" />}
            title="Read Quran"
            description="Access the full Quran with translations and multiple Qira'at."
            link="/quran"
          />
          <FeatureCard
            icon={<Mic className="w-6 h-6" />}
            title="AI Voice Assistant"
            description="Get real-time feedback on your Qira'at recitation."
            link="/recitation"
          />
          <FeatureCard
            icon={<Award className="w-6 h-6" />}
            title="Learning Paths"
            description="Personalized Qira'at Ashr learning journeys."
            link="/learning-paths"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Community"
            description="Join recitation circles and collaborative sessions."
            link="/community"
          />
          <FeatureCard
            icon={<Compass className="w-6 h-6" />}
            title="Progress Tracking"
            description="Monitor your Qira'at learning progress across all ten readings."
            link="/progress"
          />
          <FeatureCard
            icon={<Headphones className="w-6 h-6" />}
            title="Audio Library"
            description="Listen to expert recitations in all ten Qira'at."
            link="/audio-library"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#365b6d]">Verse of the Day</h2>
              <p className="text-lg mb-3 text-gray-800 font-arabic text-right">
                {randomVerse.text}
              </p>
              <p className="text-sm text-gray-600">
                {randomVerse.translation}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                {randomVerse.reference}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#365b6d]">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Chapters Read</span>
                    <span className="text-sm font-medium">{userProgress.chaptersRead}/114</span>
                  </div>
                  <Progress value={userProgress.chaptersRead} max={114} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Verses Memorized</span>
                    <span className="text-sm font-medium">{userProgress.versesMemorized}/6236</span>
                  </div>
                  <Progress value={userProgress.versesMemorized} max={6236} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
