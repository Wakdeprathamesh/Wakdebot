import React from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wellness Enthusiast",
    text: "AyurMarg has transformed my approach to health. The personalized Dosha insights are incredibly accurate!"
  },
  {
    name: "Michael Chen",
    role: "Yoga Instructor",
    text: "The integration of AI with traditional Ayurvedic wisdom is brilliant. My students love the personalized recommendations!"
  },
  {
    name: "Priya Patel",
    role: "Health Coach",
    text: "AyurMarg makes Ayurvedic principles accessible and practical for modern life. A must-have wellness companion!"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[#F4E7D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-center text-[#4F7942] mb-16">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-serif font-bold text-[#4F7942]">{testimonial.name}</h4>
                  <p className="text-sm text-[#5A7184]">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-[#5A7184]">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}