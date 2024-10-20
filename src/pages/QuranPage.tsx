"use client"

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChapters } from '../api';
import { Search, Moon, Sun, Book } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";

interface Chapter {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: string;
  translated_name: {
    name: string;
  }
}

const QuranPage: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlace, setFilterPlace] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadChapters = async () => {
      const chaptersData = await fetchChapters();
      setChapters(chaptersData);
      setFilteredChapters(chaptersData);
    };
    loadChapters();
  }, []);

  useEffect(() => {
    const filtered = chapters.filter(chapter =>
      (chapter.name_simple.toLowerCase().includes(searchTerm.toLowerCase()) ||
       chapter.translated_name.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPlace === 'all' || chapter.revelation_place.toLowerCase() === filterPlace)
    );
    setFilteredChapters(filtered);
  }, [searchTerm, filterPlace, chapters]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-[#f2f1ec]'}`}>
      <div className="container mx-auto p-4 transition-colors duration-300">
        <header className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-[#365b6d]'}`}>
              The Noble Quran
            </h1>
            <Button onClick={toggleDarkMode} className={`rounded-full p-3 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-[#365b6d] text-white'}`}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <Input
                type="text"
                placeholder="Search chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 py-3 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <Select
              options={[
                { value: 'all', label: 'All Places' },
                { value: 'meccan', label: 'Meccan' },
                { value: 'medinan', label: 'Medinan' },
              ]}
              onChange={(value) => setFilterPlace(value)}
              placeholder="Filter by place"
              className="rounded-full"
            />
          </div>
        </header>
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {filteredChapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to={`/surah/${chapter.id}`}
                  className={`block p-6 rounded-2xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-[#365b6d] hover:bg-[#f8f8f8]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{chapter.name_simple}</h2>
                    <span className={`text-lg font-medium px-4 py-1 rounded-full ${
                      darkMode ? 'bg-[#bcac88] text-gray-900' : 'bg-[#f2f1ec] text-[#bcac88]'
                    }`}>{chapter.id}</span>
                  </div>
                  <p className="text-right text-3xl mb-3 font-arabic">{chapter.name_arabic}</p>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{chapter.translated_name.name}</p>
                  <div className={`flex justify-between text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="flex items-center">
                      <Book className="w-4 h-4 mr-2" />
                      {chapter.verses_count} verses
                    </span>
                    <span className="capitalize px-3 py-1 rounded-full bg-opacity-20 bg-[#bcac88]">
                      {chapter.revelation_place}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuranPage;
