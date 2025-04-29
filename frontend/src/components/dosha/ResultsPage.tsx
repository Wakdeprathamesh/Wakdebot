// ResultsPage.tsx
import React from 'react';
import { Download, Mail, Share2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { DoshaResult } from '../../types/dosha';

type ResultsPageProps = {
  result: DoshaResult;
  isLoading?: boolean;
  error?: string | null;
};

export function ResultsPage({ result }: ResultsPageProps) {
  const data = [
    { name: 'Vata', value: result.vataPercentage },
    { name: 'Pitta', value: result.pittaPercentage },
    { name: 'Kapha', value: result.kaphaPercentage }
  ];

  const COLORS = ['#4F7942', '#D4A373', '#5A7184'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-serif font-bold text-[#4F7942] mb-8 text-center">
          Your Dosha Analysis Results
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-[#4F7942] mb-4">
              Your Constitution: {result.constitution}
            </h3>
            <div className="space-y-2 mb-6">
              <p className="text-[#5A7184]">Dosha Distribution:</p>
              <ul className="space-y-1">
                <li className="text-[#4F7942]">
                  Vata: {result.vataPercentage.toFixed(1)}%
                </li>
                <li className="text-[#D4A373]">
                  Pitta: {result.pittaPercentage.toFixed(1)}%
                </li>
                <li className="text-[#5A7184]">
                  Kapha: {result.kaphaPercentage.toFixed(1)}%
                </li>
              </ul>
            </div>
            <p className="text-[#5A7184] mb-6">
              Understanding your dosha constitution helps create a balanced lifestyle that's uniquely suited to your nature.
            </p>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 bg-[#4F7942] text-white px-6 py-3 rounded-lg hover:bg-[#3E5F34] transition-colors">
                <Download className="h-5 w-5" />
                Download Full Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-[#D4A373] text-white px-6 py-3 rounded-lg hover:bg-[#BC8F66] transition-colors">
                <Mail className="h-5 w-5" />
                Email Report
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-[#4F7942] text-[#4F7942] px-6 py-3 rounded-lg hover:bg-[#F4E7D1] transition-colors">
                <Share2 className="h-5 w-5" />
                Share Results
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Diet Recommendations', items: result.recommendations.diet },
            { title: 'Exercise Recommendations', items: result.recommendations.exercise },
            { title: 'Lifestyle Recommendations', items: result.recommendations.lifestyle }
          ].map((section, index) => (
            <div key={index} className="bg-[#F4E7D1]/30 p-6 rounded-xl">
              <h4 className="font-serif font-bold text-[#4F7942] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item: string, i: number) => (
                  <li key={i} className="text-[#5A7184] flex items-start gap-2">
                    <span className="text-[#4F7942]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}