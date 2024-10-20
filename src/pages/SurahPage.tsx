import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchChapterInfo, fetchChapterVersesWithTranslation, fetchChapterAudio, fetchAyahRecitation, fetchChapters } from '../api';
import { motion } from 'framer-motion';
import AudioPlayer from '../components/AudioPlayer';
import { Book, Play, Pause, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import mushafPageBreaks from '../utils/mushafPageBreaks'; // We'll create this file

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

interface AudioFile {
  audio_url: string;
}

const MushafPage: React.FC<{ verses: Verse[], pageNumber: number }> = ({ verses, pageNumber }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg p-8 mb-8 mushaf-view"
  >
    <h3 className="text-2xl font-semibold mb-4 text-[#365b6d] text-center">Page {pageNumber}</h3>
    <div className="text-right leading-loose">
      {verses.map((verse, index) => (
        <span key={verse.id} className="inline">
          {verse.text_uthmani}{' '}
          {index < verses.length - 1 && ' '}
        </span>
      ))}
    </div>
  </motion.div>
);

const VerseItem: React.FC<{ verse: Verse; surahNumber: string; isReadingMode: boolean }> = React.memo(
  ({ verse, surahNumber, isReadingMode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const playAudio = async () => {
      if (!audioSrc) {
        try {
          const ayahKey = `${surahNumber}:${verse.verse_number}`;
          const audioUrl = await fetchAyahRecitation(ayahKey);
          if (audioUrl) {
            setAudioSrc(audioUrl);
            if (audioRef.current) {
              audioRef.current.src = audioUrl;
              audioRef.current.play();
              setIsPlaying(true);
            }
          } else {
            console.error('No audio available for this verse');
          }
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      } else if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }
    };

    const stripHtmlTags = (html: string) => {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    };

    if (isReadingMode) {
      return (
        <span className="inline-block">{verse.text_uthmani} </span>
      );
    }

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-[#365b6d]">{verse.verse_key}</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={playAudio}
              className="p-2 bg-[#bcac88] text-white rounded-full hover:bg-[#365b6d] transition-colors duration-200"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <Link 
              to={`/tafsir/${surahNumber}/${verse.verse_number}`} 
              className="p-2 bg-[#bcac88] text-white rounded-full hover:bg-[#365b6d] transition-colors duration-200"
            >
              <Book size={20} />
            </Link>
          </div>
        </div>
        <p className="text-right text-3xl mb-4 leading-loose text-[#365b6d] font-arabic">{verse.text_uthmani}</p>
        {verse.translations && verse.translations.length > 0 && (
          <p className="text-gray-700 text-lg leading-relaxed">{stripHtmlTags(verse.translations[0].text)}</p>
        )}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </div>
    );
  }
);

const SurahPage: React.FC = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const [chapterInfo, setChapterInfo] = useState<ChapterInfo | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [chapters, setChapters] = useState<{ id: number; name_simple: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!surahNumber) {
        setError('Invalid surah number');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [info, versesData, audioFile, chaptersData] = await Promise.all([
          fetchChapterInfo(Number(surahNumber)),
          fetchChapterVersesWithTranslation(Number(surahNumber)),
          fetchChapterAudio(Number(surahNumber)),
          fetchChapters()
        ]);

        setChapterInfo(info);
        setAudioSrc((audioFile as AudioFile).audio_url);
        setVerses(versesData);
        setChapters(chaptersData.map((chapter: any) => ({ id: chapter.id, name_simple: chapter.name_simple })));
      } catch (error) {
        console.error('Error fetching surah data:', error);
        setError('Failed to fetch surah data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surahNumber]);

  const memoizedVerses = useMemo(() => verses, [verses]);

  const mushafPages = useMemo(() => {
    if (!surahNumber || !memoizedVerses.length) return [];
    const pageBreaks = mushafPageBreaks[surahNumber];
    if (!pageBreaks) return [];

    return pageBreaks.map((pageBreak, index) => {
      const startVerse = index === 0 ? 0 : pageBreaks[index - 1];
      const endVerse = pageBreak;
      return memoizedVerses.slice(startVerse, endVerse);
    });
  }, [memoizedVerses, surahNumber]);

  const handleChapterChange = (chapterId: string) => {
    navigate(`/surah/${chapterId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f2f1ec]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#365b6d]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl p-8">{error}</div>;
  }

  if (!chapterInfo) {
    return <div className="text-center text-gray-500 text-xl p-8">No chapter information available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f1ec] to-[#e2e1dc]">
      <div className="max-w-4xl mx-auto px-4 py-12">
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
              <MushafPage key={index} verses={pageVerses} pageNumber={index + 1} />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {memoizedVerses.map((verse) => (
              <VerseItem
                key={verse.id}
                verse={verse}
                surahNumber={surahNumber || ''}
                isReadingMode={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SurahPage);
