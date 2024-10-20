import React, { useEffect, useState } from 'react';







import { useParams, Link } from 'react-router-dom';







import { fetchTafsir } from '../api';







import { ArrowLeft } from 'lucide-react';







import { motion } from 'framer-motion';















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







        







        if (tafsirData && tafsirData.length > 0 && tafsirData[0].text) {







          setTafsirText(tafsirData[0].text);







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







  }, [surahNumber]);















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







        <div className="text-center text-red-500 bg-white p-8 rounded-lg shadow-lg">







          <h2 className="text-2xl font-bold mb-4">Error</h2>







          <p>{error}</p>







        </div>







      </div>







    );







  }















  const formatTafsirText = (text: string) => {



    // Replace Arabic text with bold styling



    return text.replace(/[\u0600-\u06FF]+/g, (match) => `<span class="font-bold text-xl">${match}</span>`);



  };















  return (







    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#f2f1ec] to-[#e2e1dc] py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
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
              dangerouslySetInnerHTML={{ __html: formatTafsirText(tafsirText) }} 
              className="leading-relaxed space-y-6"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TafsirPage;


















