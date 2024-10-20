import React, { useEffect, useState } from 'react';







import { useParams, Link } from 'react-router-dom';







import { fetchTafsir } from '../api';







import { ArrowLeft } from 'lucide-react';







import { motion } from 'framer-motion';







import { Card, CardContent } from "../components/ui/card";







import { Button } from "../components/ui/button";















interface TafsirItem {
  id: number;
  verse_key: string;
  text: string;
}

const TafsirPage: React.FC = () => {







  const { surahNumber, verseNumber } = useParams<{ surahNumber: string; verseNumber: string }>();







  const [tafsirText, setTafsirText] = useState<string>('');







  const [loading, setLoading] = useState(true);







  const [error, setError] = useState<string | null>(null);















  useEffect(() => {







    const fetchData = async () => {







      if (!surahNumber) {







        setError('Invalid surah number');







        setLoading(false);







        return;







      }















      try {







        setLoading(true);







        const tafsirData = await fetchTafsir(Number(surahNumber));







        console.log('Tafsir data:', tafsirData);
        
        if (tafsirData && tafsirData.tafsirs && tafsirData.tafsirs.length > 0) {
          if (verseNumber) {
            const verseTafsir = tafsirData.tafsirs.find((t: TafsirItem) => t.verse_key === `${surahNumber}:${verseNumber}`);
            if (verseTafsir) {
              setTafsirText(verseTafsir.text);
            } else {
              setTafsirText('No tafsir available for this specific verse.');
            }
          } else {
            // If no verseNumber, concatenate all tafsir texts
            setTafsirText(tafsirData.tafsirs.map((t: TafsirItem) => t.text).join('\n\n'));
          }
        } else {
          setTafsirText('No tafsir text available for this surah.');
        }
      } catch (error) {
        console.error('Error fetching tafsir data:', error);
        setError(`Failed to fetch tafsir data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };















    fetchData();







  }, [surahNumber, verseNumber]);















  if (loading) {







    return (







      <div className="flex justify-center items-center min-h-screen bg-gray-50">







        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>







      </div>







    );







  }















  if (error) {







    return (







      <div className="flex justify-center items-center min-h-screen bg-gray-50">







        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>







    );







  }















  return (







    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#f2f1ec] to-[#e2e1dc] py-16 px-4 sm:px-6 lg:px-8"
    >
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <Link 
            to={`/surah/${surahNumber}`} 
            className="inline-flex items-center text-[#365b6d] hover:text-[#bcac88] transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={24} className="mr-3" />
            <span className="text-lg font-medium">Back to Surah</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-[#365b6d] mb-6">
            Tafsir for Surah {surahNumber}
            {verseNumber && <span className="text-[#bcac88]">, Verse {verseNumber}</span>}
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <div 
              dangerouslySetInnerHTML={{ __html: tafsirText }} 
              className="leading-relaxed space-y-6"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TafsirPage;


















