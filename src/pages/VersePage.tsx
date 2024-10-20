import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchVerseText } from '../api';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft } from 'lucide-react';

interface Verse {
  text_uthmani: string;
  verse_key: string;
}

const VersePage: React.FC = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { chapterId, verseId } = useParams<{ chapterId: string; verseId: string }>();

  useEffect(() => {
    const loadVerse = async () => {
      if (chapterId && verseId) {
        try {
          setLoading(true);
          const fetchedVerse = await fetchVerseText(Number(chapterId), Number(verseId));
          setVerse(fetchedVerse);
        } catch (err) {
          setError('Failed to load verse. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    loadVerse();
  }, [chapterId, verseId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!chapterId || !verseId || !verse) return <div className="text-center py-8">Verse not found</div>;

  return (
    <div className="verse-page container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Surah {chapterId}, Verse {verseId}</h1>
          <p dir="rtl" lang="ar" className="arabic-text text-3xl mb-4">{verse.text_uthmani}</p>
          <Link to={`/chapter/${chapterId}`}>
            <Button className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Surah
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VersePage;
