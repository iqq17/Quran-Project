import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Play, Pause, AlertCircle } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Select } from "../components/ui/select";
import { fetchChapters, fetchChapterVersesWithTranslation, getAIFeedback } from '../api';

const RecitationPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState('');
  const [selectedSurah, setSelectedSurah] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [chapters, setChapters] = useState<any[]>([]);
  const [verses, setVerses] = useState<any[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    const loadChapters = async () => {
      const chaptersData = await fetchChapters();
      setChapters(chaptersData);
    };
    loadChapters();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      const loadVerses = async () => {
        const versesData = await fetchChapterVersesWithTranslation(Number(selectedSurah));
        setVerses(versesData);
      };
      loadVerses();
    }
  }, [selectedSurah]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFeedbackRequest = async () => {
    if (audioBlob && selectedSurah && selectedVerse) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recitation.webm');
      formData.append('surah', selectedSurah);
      formData.append('verse', selectedVerse);
      
      try {
        const feedbackData = await getAIFeedback(formData);
        setFeedback(feedbackData.feedback);
      } catch (error) {
        console.error('Error getting AI feedback:', error);
        setFeedback('Error getting feedback. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#365b6d]"
      >
        Qira'at Ashr Recitation Practice
      </motion.h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Surah</label>
            <Select
              options={chapters.map(chapter => ({ value: chapter.id.toString(), label: chapter.name_simple }))}
              onChange={(value) => setSelectedSurah(value)}
              placeholder="Choose a Surah"
            />
          </div>
          {selectedSurah && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Verse</label>
              <Select
                options={verses.map(verse => ({ value: verse.verse_number.toString(), label: `Verse ${verse.verse_number}` }))}
                onChange={(value) => setSelectedVerse(value)}
                placeholder="Choose a Verse"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mb-8">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-[#365b6d]'} text-white`}
        >
          {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>
        <p className="mt-2">{isRecording ? 'Recording...' : 'Click to start recording'}</p>
      </div>

      {audioBlob && (
        <div className="mb-8">
          <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
          <Button onClick={handleFeedbackRequest} className="mt-4 bg-[#365b6d] text-white">
            Get AI Feedback
          </Button>
        </div>
      )}

      {feedback && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <AlertCircle className="mr-2 text-[#365b6d]" />
              AI Feedback
            </h2>
            <p>{feedback}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecitationPage;
