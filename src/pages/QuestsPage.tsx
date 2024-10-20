import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";

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
    <div className="container mx-auto px-4 py-16 max-w-4xl bg-gradient-to-b from-[#f2f1ec] to-white min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#365b6d] to-[#bcac88]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quran Learning Quests
      </motion.h1>
      
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
    <Card className="bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-[#365b6d]">{quest.title}</h2>
        <p className="text-gray-600 mb-4">{quest.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-[#bcac88] mr-2" />
            <span className="text-[#365b6d]">Difficulty: {quest.difficulty}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-[#bcac88] mr-2" />
            <span className="text-[#365b6d]">Est. Time: {quest.estimatedTime}</span>
          </div>
        </div>
        
        <div className="bg-[#f2f1ec] p-3 rounded-md flex items-center mb-4">
          <Compass className="w-5 h-5 text-[#365b6d] mr-2" />
          <span className="font-medium text-[#365b6d]">Reward: {quest.reward}</span>
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
          <button className="w-full bg-[#365b6d] text-white py-2 px-4 rounded hover:bg-[#2a4a5a] transition duration-300">
            Start Quest
          </button>
        ) : quest.progress === 100 ? (
          <button className="w-full bg-[#bcac88] text-white py-2 px-4 rounded cursor-not-allowed flex items-center justify-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Completed
          </button>
        ) : (
          <button className="w-full bg-[#365b6d] text-white py-2 px-4 rounded hover:bg-[#2a4a5a] transition duration-300">
            Continue Quest
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestsPage;
