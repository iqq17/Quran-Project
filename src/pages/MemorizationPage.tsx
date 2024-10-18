import React, { useState } from 'react';
import { Mic, MicOff, Play, Pause } from 'lucide-react';

const MemorizationPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recognition logic here
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Implement audio playback logic here
  };

  const handleSubmitRecitation = () => {
    // Simulate AI feedback (replace with actual API call)
    setFeedback("Great job! Your pronunciation of 'Bismillah' was excellent. Try to slow down slightly on 'Ar-Rahman'.");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Memorization Practice</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Verse</h2>
        <p className="text-right text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="text-lg mb-4">In the name of Allah, the Entirely Merciful, the Especially Merciful.</p>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={togglePlayback}
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full ${
              isRecording ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-opacity-80`}
          >
            {isRecording ? <MicOff /> : <Mic />}
          </button>
        </div>
        
        <button
          onClick={handleSubmitRecitation}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Recitation
        </button>
      </div>
      
      {feedback && (
        <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Memorization Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Start with short surahs or verses and gradually increase difficulty.</li>
          <li>Practice regularly, even if it's just for a few minutes each day.</li>
          <li>Use visualization techniques to associate meanings with the verses.</li>
          <li>Listen to recitations by skilled reciters to improve your pronunciation.</li>
          <li>Review previously memorized verses frequently to reinforce your memory.</li>
        </ul>
      </div>
    </div>
  );
};

export default MemorizationPage;