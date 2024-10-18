import React from 'react';
import { Compass, Star, CheckCircle, Clock } from 'lucide-react';

const QuestsPage: React.FC = () => {
  // Mock data for quests (replace with API call)
  const quests = [
    {
      id: 1,
      title: "The Journey of Prophet Muhammad",
      description: "Embark on a quest to learn about the life of Prophet Muhammad (PBUH) through Quranic verses.",
      difficulty: "Intermediate",
      estimatedTime: "2 weeks",
      reward: "750 points + 'Prophet's Companion' badge",
      progress: 35,
    },
    {
      id: 2,
      title: "Stories of the Prophets",
      description: "Discover the tales of various prophets mentioned in the Quran and their lessons.",
      difficulty: "Beginner",
      estimatedTime: "3 weeks",
      reward: "500 points + 'Storyteller' badge",
      progress: 0,
    },
    {
      id: 3,
      title: "Quranic Arabic Mastery",
      description: "Master key Arabic words and phrases used frequently in the Quran.",
      difficulty: "Advanced",
      estimatedTime: "4 weeks",
      reward: "1000 points + 'Arabic Scholar' badge",
      progress: 80,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quests</h1>
      
      <div className="grid gap-6">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
};

const QuestCard: React.FC<{ quest: any }> = ({ quest }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{quest.title}</h2>
      <p className="text-gray-600 mb-4">{quest.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span>Difficulty: {quest.difficulty}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-blue-500 mr-2" />
          <span>Est. Time: {quest.estimatedTime}</span>
        </div>
      </div>
      
      <div className="bg-purple-50 p-3 rounded-md flex items-center mb-4">
        <Compass className="w-5 h-5 text-purple-500 mr-2" />
        <span className="font-medium">Reward: {quest.reward}</span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{quest.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${quest.progress}%` }}
          ></div>
        </div>
      </div>
      
      {quest.progress === 0 ? (
        <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
          Start Quest
        </button>
      ) : quest.progress === 100 ? (
        <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed flex items-center justify-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Completed
        </button>
      ) : (
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Continue Quest
        </button>
      )}
    </div>
  );
};

export default QuestsPage;