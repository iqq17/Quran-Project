import React from 'react';
import { Trophy, Users, Clock } from 'lucide-react';

const ChallengesPage: React.FC = () => {
  // Mock data for challenges (replace with API call)
  const challenges = [
    {
      id: 1,
      title: "30-Day Quran Challenge",
      description: "Memorize one page of the Quran every day for 30 days.",
      participants: 1250,
      daysLeft: 22,
      reward: "500 points + 'Dedicated Learner' badge",
    },
    {
      id: 2,
      title: "Surah Al-Baqarah Sprint",
      description: "Complete the memorization of Surah Al-Baqarah in 60 days.",
      participants: 785,
      daysLeft: 45,
      reward: "1000 points + 'Baqarah Master' badge",
    },
    {
      id: 3,
      title: "Community Tafsir Challenge",
      description: "Participate in daily tafsir discussions for 15 days.",
      participants: 320,
      daysLeft: 10,
      reward: "300 points + 'Tafsir Enthusiast' badge",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Challenges</h1>
      
      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

const ChallengeCard: React.FC<{ challenge: any }> = ({ challenge }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{challenge.title}</h2>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-500 mr-2" />
          <span>{challenge.participants} participants</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-green-500 mr-2" />
          <span>{challenge.daysLeft} days left</span>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-md flex items-center mb-4">
        <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="font-medium">Reward: {challenge.reward}</span>
      </div>
      
      <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Join Challenge
      </button>
    </div>
  );
};

export default ChallengesPage;