import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Book className="mr-2" />
          Quran Learning Platform
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/quran" className="hover:text-green-200">Quran</Link></li>
            <li><Link to="/memorization" className="hover:text-green-200">Memorization</Link></li>
            <li><Link to="/progress" className="hover:text-green-200">Progress</Link></li>
            <li><Link to="/challenges" className="hover:text-green-200">Challenges</Link></li>
            <li><Link to="/quests" className="hover:text-green-200">Quests</Link></li>
            <li><Link to="/community" className="hover:text-green-200">Community</Link></li>
            <li><Link to="/profile" className="hover:text-green-200"><User /></Link></li>
            <li><Link to="/settings" className="hover:text-green-200"><Settings /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;