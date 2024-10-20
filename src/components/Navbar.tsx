import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Mic, Award, Users, Settings, School } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/quran', icon: Book, label: 'Quran' },
    { path: '/recitation', icon: Mic, label: 'Recite' },
    { path: '/learning-paths', icon: Award, label: 'Learn' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/classroom', icon: School, label: 'Classroom' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-[#365b6d] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Al-Raajih</Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-[#bcac88] text-white'
                  : 'hover:bg-[#bcac88] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
