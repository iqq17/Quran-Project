import React from 'react';
import { User, Award, Book, Calendar } from 'lucide-react';

const ProfilePage: React.FC = () => {
  // Mock user data (replace with actual user data from API)
  const user = {
    name: "Abdullah Ahmed",
    level: 7,
    points: 3500,
    joinDate: "January 15, 2024",
    versesMemorized: 150,
    badges: [
      { id: 1, name: "30-Day Streak", icon: "🔥" },
      { id: 2, name: "Surah Al-Baqarah Completed", icon: "🏆" },
      { id: 3, name: "Community Helper", icon: "🤝" },
    ],
    recentActivity: [
      { id: 1, action: "Completed daily challenge", date: "2 hours ago" },
      { id: 2, action: "Memorized 5 new verses", date: "Yesterday" },
      { id: 3, action: "Joined 'Tafsir Discussion' group", date: "3 days ago" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-600 text-white p-4 rounded-full mr-4">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">Level {user.level} • {user.points} points</p>
          </div>
        </div>
        <p className="text-gray-600">
          <Calendar className="w-4 h-4 inline mr-2" />
          Joined on {user.joinDate}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Memorization Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span>Verses Memorized</span>
            <span className="font-bold">{user.versesMemorized}/6236</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(user.versesMemorized / 6236) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Badges Earned</h2>
          <div className="grid grid-cols-3 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div className="text-sm">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {user.recentActivity.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Book className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;