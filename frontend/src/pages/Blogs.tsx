import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
};

const featuredBlogs: BlogPost[] = [
  {
    id: 1,
    title: "How Ashwagandha Helps with Stress & Anxiety",
    excerpt: "Discover the powerful adaptogenic properties of Ashwagandha and how it can help manage stress and anxiety naturally.",
    category: "Herbs & Remedies",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800",
    readTime: "5 min",
    date: "Mar 15, 2025",
    author: "Dr. Ayush Sharma"
  },
  {
    id: 2,
    title: "Pitta Dosha Diet: Foods to Balance Your Inner Fire",
    excerpt: "Learn about the best foods and dietary practices to maintain balance for Pitta dosha types.",
    category: "Ayurvedic Diet",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800",
    readTime: "7 min",
    date: "Mar 12, 2025",
    author: "Dr. Maya Patel"
  },
  {
    id: 3,
    title: "Morning Routines Based on Ayurveda",
    excerpt: "Transform your mornings with these ancient Ayurvedic practices for optimal health and wellness.",
    category: "Daily Life",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800",
    readTime: "6 min",
    date: "Mar 10, 2025",
    author: "Priya Singh"
  }
];

const categories = [
  { name: "Herbs & Remedies", icon: "🌿" },
  { name: "Ayurvedic Diet", icon: "🍽️" },
  { name: "Mind & Spiritual", icon: "🧘" },
  { name: "Treatments", icon: "🏥" },
  { name: "Ancient Texts", icon: "📜" },
  { name: "Daily Life", icon: "🏡" }
];

export function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E7D1] to-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-[#4F7942]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold text-[#4F7942] mb-6">
              Discover the Science of Ayurveda,<br />One Article at a Time
            </h1>
            <p className="text-xl text-[#5A7184] mb-8 max-w-2xl mx-auto">
              Explore expert insights, ancient wisdom, and modern applications of Ayurveda for a balanced life.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5A7184]" />
                <input
                  type="text"
                  placeholder="Search articles on herbs, remedies, or health concerns..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-[#4F7942]/20 focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-[#4F7942] mb-8 text-center">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-[#5A7184]">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-[#4F7942] mb-8">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <div className="text-sm text-[#4F7942] font-medium mb-2">
                    {blog.category}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#5A7184] mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-[#5A7184] mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-[#5A7184]">
                    <span>{blog.readTime} read</span>
                    <button className="flex items-center text-[#4F7942] font-medium hover:text-[#3E5F34]">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}