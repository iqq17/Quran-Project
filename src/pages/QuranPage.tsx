import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const QuranPage: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Mock data for surahs (replace with actual API call)
  const surahs = [
    { id: 1, name: 'Al-Fatihah', versesCount: 7 },
    { id: 2, name: 'Al-Baqarah', versesCount: 286 },
    // ... add more surahs
  ];

  const handleSurahSelect = (surahId: number) => {
    setSelectedSurah(surahId);
    // Fetch surah details and verses from API
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Implement audio playback logic
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Implement audio muting logic
  };

  return (
    <div className="flex">
      <div className="w-1/4 pr-4 border-r">
        <h2 className="text-2xl font-bold mb-4">Surahs</h2>
        <ul className="space-y-2">
          {surahs.map((surah) => (
            <li
              key={surah.id}
              className={`cursor-pointer p-2 rounded ${
                selectedSurah === surah.id ? 'bg-green-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSurahSelect(surah.id)}
            >
              {surah.name} ({surah.versesCount} verses)
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 pl-4">
        {selectedSurah ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {surahs.find((s) => s.id === selectedSurah)?.name}
            </h2>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              {/* Display verses here */}
              <p className="text-right text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="text-lg">In the name of Allah, the Entirely Merciful, the Especially Merciful.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <button
                onClick={toggleMute}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                {isMuted ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </>
        ) : (
          <p className="text-xl">Select a surah to begin reading and listening.</p>
        )}
      </div>
    </div>
  );
};

export default QuranPage;