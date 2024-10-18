import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Award, Users, Compass } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quran Learning Platform</h1>
      <p className="text-xl mb-8">Embark on a journey of knowledge, memorization, and community.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard
          icon={<Book className="w-12 h-12 mb-4 text-green-600" />}
          title="Interactive Quran"
          description="Explore all 114 surahs with audio recitations, translations, and tafsir."
          link="/quran"
        />
        <FeatureCard
          icon={<Award className="w-12 h-12 mb-4 text-green-600" />}
          title="Gamified Learning"
          description="Earn points, badges, and level up as you progress in your Quranic journey."
          link="/progress"
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 mb-4 text-green-600" />}
          title="Community"
          description="Connect with fellow learners, join study groups, and participate in challenges."
          link="/community"
        />
        <FeatureCard
          icon={<Compass className="w-12 h-12 mb-4 text-green-600" />}
          title="Quests"
          description="Embark on exciting quests to enhance your Quranic knowledge and memorization."
          link="/quests"
        />
      </div>
      
      <Link to="/quran" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">
        Start Learning
      </Link>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; link: string }> = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      {icon}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default HomePage;