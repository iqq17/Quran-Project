"use client"































import React, { useState, useEffect } from 'react';































import { Link } from 'react-router-dom';































import { motion } from 'framer-motion';































import { Book, Award, Users, Compass, Moon, Sun, ChevronRight } from 'lucide-react';































import { Button } from "../components/ui/button";































import { Card, CardContent } from "../components/ui/card";































































import { fetchRandomVerse, fetchDailyTafsir, fetchUserProgress } from '../api'; // You'll need to implement these API functions

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}







const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
  >
    <Link to={link} className="block p-6 h-full">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-[#f2f1ec] rounded-full text-[#365b6d] mr-4">{icon}</div>
        <h2 className="text-2xl font-semibold text-[#365b6d]">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  </motion.div>
);







const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyVerse, setDailyVerse] = useState({ text: '', translation: '', reference: '' });
  const [dailyTafsir, setDailyTafsir] = useState({ text: '', reference: '' });
  const [userProgress, setUserProgress] = useState({ chaptersRead: 0, versesMemorized: 0 });
  const [showFullVerse, setShowFullVerse] = useState(false);
  const [showFullTafsir, setShowFullTafsir] = useState(false);

  useEffect(() => {
    const fetchDailyContent = async () => {
      try {
        const verse = await fetchRandomVerse();
        setDailyVerse(verse);
        const tafsir = await fetchDailyTafsir();
        setDailyTafsir(tafsir);
        const progress = await fetchUserProgress();
        setUserProgress(progress);
      } catch (error) {
        console.error('Error fetching daily content:', error);
      }
    };
    fetchDailyContent();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-[#f2f1ec] to-[#e2e1dc]'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold text-center ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}
          >
            Welcome to the Quran Project
          </motion.h1>
          <Button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-[#365b6d] text-white'}`}
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <FeatureCard
            icon={<Book size={24} />}
            title="Read Quran"
            description="Access the full Quran with translations and tafsir."
            link="/quran"
          />
          <FeatureCard
            icon={<Award size={24} />}
            title="Memorization"
            description="Tools and techniques to help you memorize the Quran."
            link="/memorization"
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Community"
            description="Connect with others on your Quranic journey."
            link="/community"
          />
          <FeatureCard
            icon={<Compass size={24} />}
            title="Progress Tracking"
            description="Monitor your reading and memorization progress."
            link="/progress"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardContent>
              <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>Verse of the Day</h2>
              <p className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {showFullVerse ? dailyVerse.text : truncateText(dailyVerse.text, 100)}
              </p>
              {!showFullVerse && dailyVerse.text.length > 100 && (
                <Button 
                  onClick={() => setShowFullVerse(true)}
                  className={`text-[#bcac88] hover:text-[#365b6d] transition-colors duration-200 flex items-center p-0`}
                >
                  Read More <ChevronRight size={16} className="ml-1" />
                </Button>
              )}
              <p className={`text-lg mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {dailyVerse.translation}
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {dailyVerse.reference}
              </p>
            </CardContent>
          </Card>

          <Card className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardContent>
              <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>Tafsir Insight</h2>
              <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {showFullTafsir ? dailyTafsir.text : truncateText(dailyTafsir.text, 150)}
              </p>
              {!showFullTafsir && dailyTafsir.text.length > 150 && (
                <Button 
                  onClick={() => setShowFullTafsir(true)}
                  className={`text-[#bcac88] hover:text-[#365b6d] transition-colors duration-200 flex items-center p-0`}
                >
                  Read More <ChevronRight size={16} className="ml-1" />
                </Button>
              )}
              <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {dailyTafsir.reference}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className={`p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-12`}>
          <CardContent>
            <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>Your Progress</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>{userProgress.chaptersRead}</p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Chapters Read</p>
              </div>
              <div className="text-center">
                <p className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>{userProgress.versesMemorized}</p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Verses Memorized</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link to="/todo">
            <Button className={`px-6 py-3 rounded-full ${darkMode ? 'bg-[#bcac88] text-gray-900' : 'bg-[#365b6d] text-white'} hover:opacity-90 transition-opacity duration-200`}>
              View Your Quran To-Do List
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
