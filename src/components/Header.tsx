import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#365b6d] text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Quran App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/quran">Quran</Link></li>
          <li><Link to="/memorization">Memorization</Link></li>
          <li><Link to="/learning-hub">Learning Hub</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
