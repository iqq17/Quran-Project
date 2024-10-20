"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChapters, fetchChapterVersesUthmani, fetchChapterInfo } from '../api';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Select } from "../components/ui/select";
import { Mic, MicOff, Play, Pause, ChevronLeft, ChevronRight, Book, Award, RefreshCw } from "lucide-react";

// Remove or comment out these imports if you don't have these components
// import { Skeleton } from "../components/ui/skeleton";
// import { Progress } from "../components/ui/progress";
// import { ScrollArea } from "../components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

interface Chapter {
  id: number;
  name_simple: string;
  name_arabic: string;
}

interface ChapterInfo {
  id: number;
  name_simple: string;
  name_arabic: string;
  revelation_place: string;
  verses_count: number;
}

const MemorizationPage: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [chapterInfo, setChapterInfo] = useState<ChapterInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [activeTab, setActiveTab] = useState('read');

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const chaptersData = await fetchChapters();
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to load chapters. Please try again later.');
      }
    };
    loadChapters();
  }, []);

  const handleChapterSelect = async (chapterId: string) => {
    const id = Number(chapterId);
    setSelectedChapter(id);
    setLoading(true);
    setError(null);
    setCurrentVerseIndex(0);
    try {
      const [versesData, chapterInfoData] = await Promise.all([
        fetchChapterVersesUthmani(id),
        fetchChapterInfo(id)
      ]);
      setVerses(versesData);
      setChapterInfo(chapterInfoData);
    } catch (error) {
      console.error('Error fetching chapter data:', error);
      setError('Failed to load chapter data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      alert("Recording started");
    } catch (error) {
      console.error('Error starting recording:', error);
      alert("Unable to start recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      alert("Recording stopped");
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    }
  };

  const previousVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f1ec] to-[#e2e1dc]">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-12 text-center text-[#365b6d] tracking-wide">Quran Memorization</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Book className="h-8 w-8 text-[#bcac88]" />
                <h2 className="text-2xl font-semibold text-[#365b6d]">Select Surah</h2>
              </div>
              <Select
                options={chapters.map(chapter => ({ value: chapter.id.toString(), label: `${chapter.id}. ${chapter.name_simple}` }))}
                onChange={handleChapterSelect}
                placeholder="Choose a Surah"
              />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Award className="h-8 w-8 text-[#bcac88]" />
                <h2 className="text-2xl font-semibold text-[#365b6d]">Progress</h2>
              </div>
              {chapterInfo && (
                <div className="text-center">
                  <p className="text-lg mb-2">{currentVerseIndex + 1} / {chapterInfo.verses_count} verses</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-[#bcac88] h-2.5 rounded-full" style={{ width: `${(currentVerseIndex + 1) / chapterInfo.verses_count * 100}%` }}></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <RefreshCw className="h-8 w-8 text-[#bcac88]" />
                <h2 className="text-2xl font-semibold text-[#365b6d]">Practice Mode</h2>
              </div>
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab(activeTab === 'read' ? 'record' : 'read')} className="bg-[#bcac88] hover:bg-[#365b6d] text-white">
                  {activeTab === 'read' ? 'Switch to Record' : 'Switch to Read'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'read' ? (
            <motion.div
              key="read"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                <CardContent className="p-6">
                  <div className="h-[300px] w-full rounded-md border p-4 overflow-auto bg-[#f9f9f9]">
                    {verses[currentVerseIndex] && (
                      <div>
                        <p className="text-right text-4xl mb-4 leading-loose text-[#365b6d] font-arabic">
                          {verses[currentVerseIndex].text_uthmani}
                        </p>
                        <p className="text-left text-lg text-gray-600">
                          Verse {verses[currentVerseIndex].verse_key}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button onClick={previousVerse} disabled={currentVerseIndex === 0} className="bg-[#bcac88] hover:bg-[#365b6d] text-white">
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button onClick={nextVerse} disabled={currentVerseIndex === verses.length - 1} className="bg-[#bcac88] hover:bg-[#365b6d] text-white">
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="record"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-6">
                    <Button onClick={isRecording ? stopRecording : startRecording} className={`w-48 h-48 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#bcac88] hover:bg-[#365b6d]'} text-white`}>
                      {isRecording ? <MicOff className="h-16 w-16" /> : <Mic className="h-16 w-16" />}
                    </Button>
                    <p className="text-xl font-semibold text-[#365b6d]">
                      {isRecording ? 'Recording...' : 'Start Recording'}
                    </p>
                    {audioUrl && (
                      <Button onClick={togglePlayback} className="bg-[#bcac88] hover:bg-[#365b6d] text-white">
                        {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                        {isPlaying ? 'Pause' : 'Play'} Recording
                      </Button>
                    )}
                  </div>
                  {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemorizationPage;
