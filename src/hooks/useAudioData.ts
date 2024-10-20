import { useCallback } from 'react';



import { useSelector } from 'react-redux';



import { RootState } from '../redux/store';



import { getVerseAudioUrl } from '../utils/audio';







interface AudioData {



  audioUrl: string;



}







const useAudioData = (chapterId: number, verseNumber: number): AudioData => {



  const reciterId = useSelector((state: RootState) => state.audioPlayer.reciterId);







  const getAudioData = useCallback(



    (chapterId: number, verseNumber: number): AudioData => {



      const audioUrl = getVerseAudioUrl(chapterId, verseNumber, reciterId);







      return {



        audioUrl,



      };



    },



    [reciterId]



  );







  return getAudioData(chapterId, verseNumber);



};







export default useAudioData;








