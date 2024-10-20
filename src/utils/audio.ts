export const getVerseAudioUrl = (chapterId: number, verseNumber: number, reciterId: number = 7): string => {

  return `https://verses.quran.com/${reciterId}/${chapterId}/${verseNumber}.mp3`;

};














