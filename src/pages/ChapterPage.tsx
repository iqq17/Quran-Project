import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchChapterVersesWithTranslation } from '../api';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface Verse {
  text_uthmani: string;
  verse_key: string;
  translations: Array<{ text: string }>;
}

const ChapterPage: React.FC = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { chapterId } = useParams<{ chapterId: string }>();

  useEffect(() => {
    const loadVerses = async () => {
      if (chapterId) {
        try {
          setLoading(true);
          const fetchedVerses = await fetchChapterVersesWithTranslation(Number(chapterId));
          setVerses(fetchedVerses);
          setLoading(false);
        } catch (err) {
          console.error('Error loading verses:', err);
          setError('Failed to load verses. Please try again later.');
          setLoading(false);
        }
      }
    };

    loadVerses();
  }, [chapterId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!chapterId) return <div className="text-center py-8">Chapter not found</div>;

  return (
    <div className="chapter-page container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Surah {chapterId}</h1>
        <div className="verse-list space-y-6">
          {verses.map((verse) => (
            <Card key={verse.verse_key} className="verse-item">
              <CardContent className="p-4">
                <Link to={`/verse/${chapterId}/${verse.verse_key.split(':')[1]}`}>
                  <p dir="rtl" lang="ar" className="arabic-text text-2xl mb-2">{verse.text_uthmani}</p>
                  <p className="translation-text text-gray-700">{verse.translations[0].text}</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/">
            <Button className="bg-[#365b6d] text-white">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Surahs
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ChapterPage;
