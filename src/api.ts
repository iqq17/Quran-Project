import axios from 'axios';

const API_BASE_URL = 'https://api.quran.com/api/v4';
const TAFSIR_API_BASE_URL = 'https://api.quran-tafseer.com';

export const fetchChapters = async () => {
  const response = await axios.get(`${API_BASE_URL}/chapters`);
  return response.data.chapters;
};

export const fetchChapterVerses = async (chapterId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quran/verses/uthmani`, {
      params: { chapter_number: chapterId },
    });
    console.log('Chapter verses response:', response.data);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
};

export const fetchVerseText = async (chapterId: number, verseId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quran/verses/uthmani`, {
      params: { chapter_number: chapterId, verse_key: `${chapterId}:${verseId}` },
    });
    console.log('Verse text response:', response.data);
    return response.data.verses[0];
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw error;
  }
};

export const fetchChapterVersesWithTranslation = async (chapterId: number) => {
  try {
    let allVerses: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await axios.get(`${API_BASE_URL}/verses/by_chapter/${chapterId}`, {
        params: {
          language: 'en',
          words: false,
          translations: '131',
          fields: 'text_uthmani,verse_key,translations',
          page: page,
          per_page: 50
        }
      });

      allVerses = [...allVerses, ...response.data.verses];
      
      if (!response.data.pagination || response.data.pagination.next_page === null) {
        hasMorePages = false;
      } else {
        page++;
      }
    }

    return allVerses;
  } catch (error) {
    console.error('Error fetching verses with translation:', error);
    throw error;
  }
};

export const fetchSurahVerses = async (chapterNumber: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quran/verses/uthmani`, {
      params: { chapter_number: chapterNumber },
    });
    console.log('Surah verses response:', response.data);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching surah verses:', error);
    return [];
  }
};

export const fetchChapterInfo = async (chapterId: number) => {
  const response = await axios.get(`${API_BASE_URL}/chapters/${chapterId}`);
  return response.data.chapter;
};

export const fetchChapterVersesUthmani = async (chapterId: number) => {
  const response = await axios.get(`${API_BASE_URL}/quran/verses/uthmani`, {
    params: { chapter_number: chapterId }
  });
  return response.data.verses;
};

export const fetchChapterAudio = async (chapterId: number) => {
  const response = await axios.get(`${API_BASE_URL}/chapter_recitations/1/${chapterId}`);
  return response.data.audio_file;
};

export const fetchTafsir = async (chapterNumber: number) => {
  try {
    console.log(`Fetching tafsir for chapter ${chapterNumber}`);
    const response = await axios.get(`${API_BASE_URL}/tafsirs/169/by_chapter/${chapterNumber}`);
    console.log('Tafsir response:', response.data);

    return response.data; // Return the entire response data
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
};

export const fetchChapterTafsir = async (chapterId: number) => {
  try {
    console.log(`Fetching tafsir for chapter ${chapterId}`);
    const response = await axios.get(`${API_BASE_URL}/verses/by_chapter/${chapterId}`, {
      params: {
        language: 'en',
        words: false,
        translations: '131',
        tafsirs: '141',
        fields: 'text_uthmani,verse_key',
        per_page: 50
      }
    });
    console.log('API response status:', response.status);
    console.log('API response data:', response.data);
    if (response.data.verses && response.data.verses.length > 0) {
      console.log(`Received ${response.data.verses.length} verses with tafsir`);
      return response.data.verses;
    } else {
      console.log('No verses with tafsir received from API');
      return [];
    }
  } catch (error) {
    console.error('Error fetching chapter tafsir:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
};

export const fetchChapterTranslation = async (chapterId: number) => {
  const response = await axios.get(`${API_BASE_URL}/quran/translations/131`, {
    params: { chapter_number: chapterId }
  });
  return response.data.translations;
};

export const fetchTafsirForVerse = async (tafsirId: number, suraNumber: number, ayahNumber: number) => {
  try {
    console.log(`Fetching tafsir ${tafsirId} for surah ${suraNumber}, ayah ${ayahNumber}`);
    const response = await axios.get(`${TAFSIR_API_BASE_URL}/tafseer/${tafsirId}/${suraNumber}/${ayahNumber}`);
    console.log('Tafsir response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
};

export const fetchTafsirForSurah = async (tafsirId: number, suraNumber: number) => {
  try {
    console.log(`Fetching tafsir ${tafsirId} for surah ${suraNumber}`);
    const response = await axios.get(`${TAFSIR_API_BASE_URL}/tafseer/${tafsirId}/${suraNumber}/1/${suraNumber === 1 ? 7 : 286}`);
    console.log('Tafsir response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tafsir for surah:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    throw error;
  }
};

export const fetchAyahRecitation = async (ayahKey: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recitations/6/by_ayah/${ayahKey}`);
    if (response.data.audio_files && response.data.audio_files.length > 0) {
      const audioFile = response.data.audio_files[0];
      return `https:${audioFile.url}`;
    } else {
      console.log('No audio file found for this ayah');
      return null;
    }
  } catch (error) {
    console.error('Error fetching ayah recitation:', error);
    throw error;
  }
};

export const fetchRandomVerse = async () => {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const surahInfo = await fetchChapterInfo(randomSurah);
    const randomVerse = Math.floor(Math.random() * surahInfo.verses_count) + 1;
    
    const response = await axios.get(`${API_BASE_URL}/verses/by_key/${randomSurah}:${randomVerse}`, {
      params: {
        language: 'en',
        translations: '131',
      }
    });
    
    return {
      text: response.data.verse.text_uthmani,
      translation: response.data.verse.translations[0].text,
      reference: `Surah ${surahInfo.name_simple} (${randomSurah}:${randomVerse})`
    };
  } catch (error) {
    console.error('Error fetching random verse:', error);
    throw error;
  }
};

export const fetchDailyTafsir = async () => {
  try {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const surahInfo = await fetchChapterInfo(randomSurah);
    const randomVerse = Math.floor(Math.random() * surahInfo.verses_count) + 1;
    
    const response = await axios.get(`${API_BASE_URL}/tafsirs/169/by_ayah/${randomSurah}:${randomVerse}`);
    
    return {
      text: response.data.tafsir.text,
      reference: `Tafsir for Surah ${surahInfo.name_simple} (${randomSurah}:${randomVerse})`
    };
  } catch (error) {
    console.error('Error fetching daily tafsir:', error);
    throw error;
  }
};

export const fetchUserProgress = async () => {
  // This would typically be fetched from a backend service
  // For now, we'll return mock data
  return {
    chaptersRead: 5,
    versesMemorized: 50
  };
};

export const fetchQuranLearningResources = async () => {
  // This would typically be fetched from a backend service
  // For now, we'll return mock data
  return [
    { title: "Understanding Quran - A Comprehensive Guide", link: "https://example.com/quran-guide" },
    { title: "Tafsir Ibn Kathir", link: "https://example.com/tafsir-ibn-kathir" },
    { title: "Learn Tajweed Rules", link: "https://example.com/tajweed-rules" },
    { title: "Quran Vocabulary Builder", link: "https://example.com/quran-vocabulary" },
  ];
};

// Add these new functions to your existing api.ts file

export const fetchLearningPaths = async () => {
  // This would typically be an API call to your backend
  // For now, we'll return mock data
  return [
    {
      id: 1,
      title: "Introduction to Qira'at Ashr",
      description: "Learn the basics of the ten Qira'at",
      level: "Beginner",
      duration: "4 weeks",
      modules: [
        { id: 1, title: "Overview of Qira'at Ashr", completed: false },
        { id: 2, title: "History of Qira'at", completed: false },
        { id: 3, title: "The Ten Readers and Their Transmitters", completed: false },
        { id: 4, title: "Basic Differences in Recitation", completed: false },
      ]
    },
    {
      id: 2,
      title: "Intermediate Qira'at Study",
      description: "Dive deeper into the differences between Qira'at",
      level: "Intermediate",
      duration: "8 weeks",
      modules: [
        { id: 1, title: "Detailed Study of Hafs 'an 'Asim", completed: false },
        { id: 2, title: "Introduction to Warsh 'an Nafi'", completed: false },
        { id: 3, title: "Comparing Hafs and Warsh", completed: false },
        { id: 4, title: "Practice Recitation in Both Styles", completed: false },
      ]
    },
    {
      id: 3,
      title: "Advanced Qira'at Mastery",
      description: "Master all ten Qira'at and their applications",
      level: "Advanced",
      duration: "12 weeks",
      modules: [
        { id: 1, title: "In-depth Study of All Ten Qira'at", completed: false },
        { id: 2, title: "Analytical Comparison of Qira'at", completed: false },
        { id: 3, title: "Impact of Qira'at on Tafsir", completed: false },
        { id: 4, title: "Practical Application and Recitation", completed: false },
      ]
    },
  ];
};

export const updateUserProgress = async (pathId: number, moduleId: number) => {
  // This would typically be an API call to update the user's progress in your backend
  console.log(`Updating progress for path ${pathId}, module ${moduleId}`);
  // For now, we'll just log the update
  return true;
};

// Add this function to your api.ts file

export const getAIFeedback = async (formData: FormData) => {
  try {
    const response = await axios.post('http://localhost:5000/get_feedback', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting AI feedback:', error);
    throw error;
  }
};

// Add these new functions to your existing api.ts file

export const fetchResources = async () => {
  // This would be an API call in a real application
  return [
    { id: '1', title: 'Introduction to Qira\'at', link: 'https://example.com/intro-qiraat' },
    { id: '2', title: 'Tajweed Rules', link: 'https://example.com/tajweed-rules' },
  ];
};

export const addResource = async (resource: { title: string; link: string }) => {
  // This would be an API call in a real application
  return { id: Date.now().toString(), ...resource };
};

export const fetchAssignments = async () => {
  // This would be an API call in a real application
  return [
    {
      id: '1',
      title: 'Qira\'at Practice',
      description: 'Record yourself reciting Surah Al-Fatiha in two different qira\'at styles.',
      dueDate: '2023-07-01',
      submissions: [
        { id: '1', studentName: 'Ahmed', submissionDate: '2023-06-28', content: 'Submission link', grade: null },
        { id: '2', studentName: 'Fatima', submissionDate: '2023-06-29', content: 'Submission link', grade: null },
      ],
    },
  ];
};

export const addAssignment = async (assignment: { title: string; description: string; dueDate: string }) => {
  // This would be an API call in a real application
  return { id: Date.now().toString(), ...assignment, submissions: [] };
};

export const gradeAssignment = async (assignmentId: string, submissionId: string, grade: number) => {
  // This would be an API call in a real application
  console.log(`Grading assignment ${assignmentId}, submission ${submissionId} with grade ${grade}`);
  return true;
};

// Add these new functions to your existing api.ts file

export const fetchDiscussions = async () => {
  // This would be an API call in a real application
  return [
    { id: '1', title: 'Understanding Idgham', content: 'Can someone explain the concept of Idgham in Tajweed?', author: 'User1', date: '2023-06-28', replies: 5 },
    { id: '2', title: 'Differences in Qira\'at', content: 'What are the main differences between Hafs and Warsh?', author: 'User2', date: '2023-06-29', replies: 3 },
  ];
};

export const addDiscussion = async (discussion: { title: string; content: string }) => {
  // This would be an API call in a real application
  return { 
    id: Date.now().toString(), 
    ...discussion, 
    author: 'CurrentUser', 
    date: new Date().toISOString().split('T')[0], 
    replies: 0 
  };
};

export const fetchEvents = async () => {
  // This would be an API call in a real application
  return [
    { id: '1', title: 'Online Qira\'at Workshop', description: 'Join us for a workshop on the basics of Qira\'at Ashr', date: '2023-07-15', attendees: 50 },
    { id: '2', title: 'Tajweed Competition', description: 'Test your Tajweed skills in our annual competition', date: '2023-08-01', attendees: 100 },
  ];
};

export const addEvent = async (event: { title: string; description: string; date: string }) => {
  // This would be an API call in a real application
  return { id: Date.now().toString(), ...event, attendees: 0 };
};
