import React, { useEffect, useState } from 'react';















import { Link, useParams } from 'react-router-dom';















import { fetchVerseText } from '../api';































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















          const fetchedVerse = await fetchVerseText(Number(chapterId), Number(verseId));















          setVerse(fetchedVerse);















          setLoading(false);















        } catch (err) {















          setError('Failed to load verse. Please try again later.');















          setLoading(false);















        }















      }















    };































    loadVerse();















  }, [chapterId, verseId]);































  if (loading) return <div>Loading...</div>;















  if (error) return <div>{error}</div>;















  if (!chapterId || !verseId || !verse) return <div>Verse not found</div>;































  return (















    <div className="verse-page">















      <h1>Surah {chapterId}, Verse {verseId}</h1>















      <p dir="rtl" lang="ar" className="arabic-text">{verse.text_uthmani}</p>















      <Link to={`/chapter/${chapterId}`} className="back-link">Back to Surah</Link>















    </div>















  );















};































export default VersePage;






































