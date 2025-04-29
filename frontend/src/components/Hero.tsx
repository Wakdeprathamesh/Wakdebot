import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1920"
          alt="Ayurvedic herbs background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4F7942] mb-6">
          Your Personalized<br />Ayurvedic Journey<br />Starts Here
        </h1>
        <p className="text-xl text-[#5A7184] mb-8 max-w-2xl">
          Discover your Dosha, explore Ayurvedic wisdom, and experience AI-powered health guidance.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/dosha-analysis')}
            className="bg-[#4F7942] text-white px-8 py-3 rounded-full hover:bg-[#3E5F34] transition-all transform hover:scale-105 shadow-lg flex items-center"
          >
            Start My Dosha Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button
            onClick={() => navigate('/chatbot')}
            className="bg-[#D4A373] text-white px-8 py-3 rounded-full hover:bg-[#BC8F66] transition-all transform hover:scale-105 shadow-lg flex items-center"
          >
            Chat with AyurBot
            <MessageCircle className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}