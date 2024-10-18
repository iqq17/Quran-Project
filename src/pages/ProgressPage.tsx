import React from 'react';
import { Award, TrendingUp, Calendar } from 'lucide-react';

const ProgressPage: React.FC = () => {
  // Mock data (replace with actual user data from API)
  const userStats = {
    level: 5,
    points: 1250,
    versesMemorized: 75,
    dailyStreak: 14,
    badges: [
      { id: 1, name: 'First Surah Completed', icon: '🏆' },
      { id: 2, name: '7-Day Streak', icon: '🔥' },
      { id: 3, name: 'Helpful Community Member', icon: '🤝' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Award className="w-8 h-8 text-yellow-500" />}
          title="Current Level"
          value={userStats.level}
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          title="Total Points"
          value={userStats.points}
        />
        <StatCard
          icon={<Calendar className="w-8 h-8 text-blue-500" />}
          title="Daily Streak"
          value={userStats.dailyStreak}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Memorization Progress</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                Verses Memorized
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {userStats.versesMemorized}/6236
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${(userStats.versesMemorized / 6236) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Badges Earned</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {userStats.badges.map((badge) => (
            <div key={badge.id} className="flex items-center p-3 bg-gray-100 rounded-lg">
              <span className="text-3xl mr-3">{badge.icon}</span>
              <span className="font-medium">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: number }> = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default ProgressPage;