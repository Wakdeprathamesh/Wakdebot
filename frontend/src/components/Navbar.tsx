import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-[#4F7942]" />
              <span className="ml-2 text-xl font-serif font-bold text-[#4F7942]">AyurMarg</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#5A7184] hover:text-[#4F7942]">Home</Link>
            <Link to="/chatbot" className="text-[#5A7184] hover:text-[#4F7942]">ChatBot</Link>
            <Link to="/dosha-analysis" className="text-[#5A7184] hover:text-[#4F7942]">Dosha Analysis</Link>
            <Link to="/blogs" className="text-[#5A7184] hover:text-[#4F7942]">Blogs</Link>
            <Link to="/ayurvedic-search" className="text-[#5A7184] hover:text-[#4F7942]">Ayurvedic Search</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-[#5A7184] hover:text-[#4F7942]">Dashboard</Link>
                <button
                  onClick={logout}
                  className="bg-[#4F7942] text-white px-6 py-2 rounded-full hover:bg-[#3E5F34] transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#4F7942] text-white px-6 py-2 rounded-full hover:bg-[#3E5F34] transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}