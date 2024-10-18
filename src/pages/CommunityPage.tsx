import React, { useState } from 'react';
import { MessageSquare, Users, Search } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'groups'>('forum');

  // Mock data (replace with API calls)
  const forumTopics = [
    { id: 1, title: "Tips for memorizing long surahs", author: "QuranLover123", replies: 15, lastActivity: "2 hours ago" },
    { id: 2, title: "Understanding the context of Surah Al-Kahf", author: "TafsirEnthusiast", replies: 8, lastActivity: "1 day ago" },
    { id: 3, title: "Best resources for learning Quranic Arabic", author: "ArabicLearner", replies: 22, lastActivity: "3 hours ago" },
  ];

  const studyGroups = [
    { id: 1, name: "Beginners Tajweed", members: 50, description: "Learn the basics of Tajweed with fellow beginners" },
    { id: 2, name: "Tafsir Discussion", members: 75, description: "Weekly discussions on Quranic tafsir" },
    { id: 3, name: "Memorization Support", members: 100, description: "Support and motivation for Quran memorization" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'forum' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('forum')}
          >
            Forum
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'groups' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('groups')}
          >
            Study Groups
          </button>
        </div>
      </div>
      
      {activeTab === 'forum' ? (
        <ForumSection topics={forumTopics} />
      ) : (
        <StudyGroupsSection groups={studyGroups} />
      )}
    </div>
  );
};

const ForumSection: React.FC<{ topics: any[] }> = ({ topics }) => {
  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search topics..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700">
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {topics.map((topic) => (
          <div key={topic.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>By: {topic.author}</span>
              <span>{topic.replies} replies</span>
              <span>Last activity: {topic.lastActivity}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Create New Topic
      </button>
    </div>
  );
};

const StudyGroupsSection: React.FC<{ groups: any[] }> = ({ groups }) => {
  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search study groups..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button className="bg-green-600 text-white p-2 rounded-r-md hover:bg-green-700">
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
            <p className="text-gray-600 mb-3">{group.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                <Users className="w-4 h-4 inline mr-1" />
                {group.members} members
              </span>
              <button className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 transition duration-300">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
        Create New Study Group
      </button>
    </div>
  );
};

export default CommunityPage;