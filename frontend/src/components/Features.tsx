import React from 'react';
import { Leaf, Search, MessageCircle, Book } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Dosha Analysis",
    description: "Discover your unique body constitution through our comprehensive Dosha analysis."
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Ayurvedic Search",
    description: "Access ancient Ayurvedic knowledge with our intelligent search engine."
  },
  {
    icon: <MessageCircle className="h-8 w-8" />,
    title: "AyurBot",
    description: "Get instant answers to your Ayurvedic health queries from our AI assistant."
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Knowledge Hub",
    description: "Explore our curated collection of Ayurvedic wisdom and practices."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-center text-[#4F7942] mb-16">
          Discover Our Core Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#F4E7D1] p-6 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-[#4F7942] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-serif font-bold text-[#4F7942] mb-2">{feature.title}</h3>
              <p className="text-[#5A7184]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}