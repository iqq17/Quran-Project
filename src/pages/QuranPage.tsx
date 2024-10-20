"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChapters, fetchChapterVersesWithTranslation, fetchChapterAudio, fetchTafsir, fetchChapterInfo } from '../api';
import { Search, Moon, Sun, Book, Eye, EyeOff, Play, Pause, ChevronLeft } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import AudioPlayer from '../components/AudioPlayer';
import mushafPageBreaks from '../utils/mushafPageBreaks';

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

interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  translations: { text: string }[];
}

interface ChapterInfo {
  id: number;
  name_simple: string;
  name_arabic: string;
  revelation_place: string;
  verses_count: number;
}

const QuranPage: React.FC = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlace, setFilterPlace] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterInfo, setChapterInfo] = useState<ChapterInfo | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [tafsir, setTafsir] = useState<string>('');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

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

  useEffect(() => {
    const loadChapterData = async () => {
      if (selectedChapter) {
        const [info, versesData, audioFile, tafsirData] = await Promise.all([
          fetchChapterInfo(selectedChapter),
          fetchChapterVersesWithTranslation(selectedChapter),
          fetchChapterAudio(selectedChapter),
          fetchTafsir(selectedChapter)
        ]);
        setChapterInfo(info);
        setVerses(versesData);
        setAudioSrc(audioFile.audio_url);
        setTafsir(tafsirData.tafsirs[0]?.text || '');
      }
    };
    loadChapterData();
  }, [selectedChapter]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const memoizedVerses = useMemo(() => verses, [verses]);

  const mushafPages = useMemo(() => {
    if (!selectedChapter || !memoizedVerses.length) return [];
    const pageBreaks = mushafPageBreaks[selectedChapter.toString()];
    if (!pageBreaks) return [];

    return pageBreaks.map((pageBreak, index) => {
      const startVerse = index === 0 ? 0 : pageBreaks[index - 1];
      const endVerse = pageBreak;
      return memoizedVerses.slice(startVerse, endVerse);
    });
  }, [memoizedVerses, selectedChapter]);

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapter(Number(chapterId));
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
          {!selectedChapter && (
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
          )}
        </header>
        
        {!selectedChapter ? (
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
                  <Card 
                    className={`transition-all duration-300 cursor-pointer ${
                      darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-[#365b6d] hover:bg-[#f8f8f8]'
                    }`}
                    onClick={() => setSelectedChapter(chapter.id)}
                  >
                    <CardContent className="p-6">
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button onClick={() => setSelectedChapter(null)} className="mb-4">
              <ChevronLeft className="mr-2" /> Back to Chapters
            </Button>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-[#365b6d]">{chapterInfo?.name_simple}</h1>
                <Select
                  options={chapters.map(chapter => ({ value: chapter.id.toString(), label: chapter.name_simple }))}
                  onChange={handleChapterChange}
                  placeholder="Go to Surah"
                  className="w-48"
                />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-[#bcac88] text-center font-arabic">{chapterInfo?.name_arabic}</h2>
              <div className="flex justify-between text-gray-600 text-lg">
                <p>Revelation Place: <span className="capitalize font-semibold">{chapterInfo?.revelation_place}</span></p>
                <p>Number of Verses: <span className="font-semibold">{chapterInfo?.verses_count}</span></p>
              </div>
            </motion.div>
            
            <div className="flex justify-between items-center mb-12">
              {audioSrc && (
                <div className="flex-1">
                  <AudioPlayer audioSrc={audioSrc} />
                </div>
              )}
              <Button
                onClick={() => setIsReadingMode(!isReadingMode)}
                className={`ml-4 ${isReadingMode ? 'bg-[#365b6d]' : 'bg-[#bcac88]'} hover:opacity-90 transition-opacity duration-200`}
              >
                {isReadingMode ? <Eye size={20} className="mr-2" /> : <EyeOff size={20} className="mr-2" />}
                {isReadingMode ? 'Show Translation' : 'Reading Mode'}
              </Button>
            </div>

            {isReadingMode ? (
              <div className="space-y-12">
                {mushafPages.map((pageVerses, index) => (
                  <Card key={index} className="p-6 bg-white rounded-lg shadow-lg">
                    <CardContent>
                      <h3 className="text-2xl font-semibold mb-4 text-[#365b6d] text-center">Page {index + 1}</h3>
                      <div className="text-right leading-loose">
                        {pageVerses.map((verse) => (
                          <span key={verse.id} className="inline arabic-font text-2xl">
                            {verse.text_uthmani}{' '}
                            <span className="inline-block bg-[#bcac88] text-white rounded-full w-6 h-6 text-center text-sm leading-6 mx-1">
                              {verse.verse_number}
                            </span>
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {memoizedVerses.map((verse) => (
                  <Card key={verse.id} className="p-6 bg-white rounded-lg shadow-lg">
                    <CardContent>
                      <p className="text-right text-3xl mb-4 leading-loose text-[#365b6d] font-arabic">{verse.text_uthmani}</p>
                      <p className="text-lg text-gray-700">{verse.translations[0].text}</p>
                      <div className="mt-4 text-sm text-gray-500">Verse {verse.verse_number}</div>
                      <Link to={`/tafsir/${selectedChapter}/${verse.verse_number}`} className="text-[#bcac88] hover:underline mt-2 inline-block">
                        View Tafsir
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {tafsir && (
              <Card className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <CardContent>
                  <h3 className="text-2xl font-semibold mb-4 text-[#365b6d]">Tafsir</h3>
                  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: tafsir }} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranPage;
