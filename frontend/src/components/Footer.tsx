import React from 'react';
import { Leaf, Instagram, Twitter, Youtube, Linkedin, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#4F7942] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8" />
              <span className="ml-2 text-xl font-serif font-bold">AyurMarg</span>
            </div>
            <p className="text-sm opacity-80">
              Bridging Ancient Ayurveda with AI-powered Modern Health Solutions
            </p>
          </div>
          <div>
            <h3 className="font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100">Home</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Dosha Analysis</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Blogs</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Instagram className="h-6 w-6 opacity-80 hover:opacity-100 cursor-pointer" />
              <Twitter className="h-6 w-6 opacity-80 hover:opacity-100 cursor-pointer" />
              <Youtube className="h-6 w-6 opacity-80 hover:opacity-100 cursor-pointer" />
              <Linkedin className="h-6 w-6 opacity-80 hover:opacity-100 cursor-pointer" />
            </div>
          </div>
          <div>
            <h3 className="font-serif font-bold mb-4">Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full text-gray-800 w-full"
              />
              <button className="bg-[#D4A373] px-4 rounded-r-full hover:bg-[#BC8F66]">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          © 2025 AyurMarg. All rights reserved.
        </div>
      </div>
    </footer>
  );
}