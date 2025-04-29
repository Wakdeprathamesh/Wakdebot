import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';

type DoshaHeroProps = {
  onStartTest: () => void;
};

export function DoshaHero({ onStartTest }: DoshaHeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611071536900-9a816247a9a8?auto=format&fit=crop&w=1920"
          alt="Ayurvedic herbs and spices"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4F7942] mb-6 animate-fade-in">
            Discover Your Ayurvedic Blueprint: Find Your Dosha
          </h1>
          <p className="text-xl text-[#5A7184] mb-8">
            Unlock personalized Ayurvedic insights for a balanced lifestyle through our comprehensive Dosha analysis.
          </p>
          <div className="space-y-4">
            <button
              onClick={onStartTest}
              className="bg-[#4F7942] text-white px-8 py-3 rounded-full hover:bg-[#3E5F34] transition-all transform hover:scale-105 shadow-lg flex items-center group"
            >
              Start My Dosha Test
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[#5A7184] flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#4F7942]" />
              Takes less than 5 minutes – Accurate & Private
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            {['Vata', 'Pitta', 'Kapha'].map((dosha) => (
              <div
                key={dosha}
                className="w-24 h-24 rounded-full bg-[#F4E7D1]/80 flex items-center justify-center
                         text-[#4F7942] font-serif font-bold text-lg animate-float"
              >
                {dosha}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}