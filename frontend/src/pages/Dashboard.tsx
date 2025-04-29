import React, { useState } from 'react';
import { 
  User, 
  PieChart as PieChartIcon, 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Heart,
  Activity,
  Moon,
  Battery,
  Edit,
  LogOut,
  ArrowRight,
  Plus,
  Video,
  Users,
  BookmarkPlus,
  Clock,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Mock data for health tracking
const healthData = [
  { date: '2025-03-15', mood: 'Happy', digestion: 'Good', sleep: 'Restful', energy: 'High' },
  { date: '2025-03-14', mood: 'Calm', digestion: 'Moderate', sleep: 'Disturbed', energy: 'Moderate' },
  { date: '2025-03-13', mood: 'Stressed', digestion: 'Poor', sleep: 'Restful', energy: 'Low' },
];

const energyTrendData = [
  { date: 'Mon', level: 8 },
  { date: 'Tue', level: 6 },
  { date: 'Wed', level: 7 },
  { date: 'Thu', level: 9 },
  { date: 'Fri', level: 8 },
  { date: 'Sat', level: 7 },
  { date: 'Sun', level: 8 },
];

const recommendedArticles = [
  {
    title: "Balance Your Pitta with These Cooling Foods",
    category: "Diet & Nutrition",
    readTime: "5 min"
  },
  {
    title: "Evening Routine for Better Sleep",
    category: "Lifestyle",
    readTime: "4 min"
  },
  {
    title: "Managing Stress with Ayurvedic Herbs",
    category: "Remedies",
    readTime: "6 min"
  }
];

const upcomingConsultations = [
  {
    doctor: "Dr. Ayush Sharma",
    date: "March 20, 2025",
    time: "10:00 AM",
    type: "Video"
  },
  {
    doctor: "Dr. Priya Patel",
    date: "March 22, 2025",
    time: "2:30 PM",
    type: "Audio"
  }
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAyurBot, setShowAyurBot] = useState(false);

  console.log(user);

  const doshaData = [
    { name: 'Vata', value: user?.prakriti?.doshas?.vata ?? 0 },
    { name: 'Pitta', value: user?.prakriti?.doshas?.pitta ?? 0 },
    { name: 'Kapha', value: user?.prakriti?.doshas?.kapha ?? 0 }
];


  const DOSHA_COLORS = ['#4F7942', '#D4A373', '#5A7184'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E7D1] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Profile Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
                  
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <h2 className="text-xl font-serif font-bold text-[#4F7942]">{user?.name}</h2>
                <p className="text-[#5A7184]">Pitta-Kapha Type</p>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#4F7942]/10 text-[#4F7942] text-sm rounded-full">Level 3</span>
                  <span className="px-2 py-1 bg-[#D4A373]/10 text-[#D4A373] text-sm rounded-full">12 Badges</span>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-[#4F7942] text-white px-4 py-2 rounded-lg hover:bg-[#3E5F34] transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center justify-center gap-2 border border-[#4F7942] text-[#4F7942] px-4 py-2 rounded-lg hover:bg-[#F4E7D1] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-[#4F7942] mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#5A7184]">Streak</span>
                  <span className="font-bold text-[#4F7942]">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5A7184]">Articles Read</span>
                  <span className="font-bold text-[#4F7942]">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5A7184]">Community Posts</span>
                  <span className="font-bold text-[#4F7942]">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Welcome Message */}
            <div className="bg-[#4F7942] rounded-2xl p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-2">Welcome back, {user?.name}!</h2>
                  <p className="opacity-90">Your Ayurvedic journey continues. Here's your wellness summary for today.</p>
                </div>
                <button 
                  onClick={() => navigate('/dosha-analysis')}
                  className="bg-white text-[#4F7942] px-4 py-2 rounded-lg hover:bg-[#F4E7D1] transition-colors flex items-center gap-2"
                >
                  <PieChartIcon className="h-4 w-4" />
                  Retake Dosha Test
                </button>
              </div>
            </div>

            {/* Dosha Analysis & Health Tracker Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dosha Analysis */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-serif font-bold text-[#4F7942] mb-6">Your Dosha Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={doshaData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {doshaData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DOSHA_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {doshaData.map((dosha, index) => (
                    <div key={dosha.name} className="text-center">
                      <div className="font-bold text-lg" style={{ color: DOSHA_COLORS[index] }}>
                        {dosha.value}%
                      </div>
                      <div className="text-[#5A7184]">{dosha.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health Tracker */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-serif font-bold text-[#4F7942]">Energy Trends</h3>
                  <button className="text-[#4F7942] hover:text-[#3E5F34]">
                    <Calendar className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={energyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="level" stroke="#4F7942" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Daily Health Tracker */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-bold text-[#4F7942]">Daily Health Tracker</h3>
                <button className="text-[#4F7942] hover:text-[#3E5F34] flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Entry
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F4E7D1]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-[#4F7942]" />
                    <span className="font-medium">Mood</span>
                  </div>
                  <select className="w-full bg-white rounded-lg border-0 focus:ring-2 focus:ring-[#4F7942]">
                    <option>Happy</option>
                    <option>Calm</option>
                    <option>Stressed</option>
                  </select>
                </div>
                <div className="p-4 bg-[#F4E7D1]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-[#4F7942]" />
                    <span className="font-medium">Digestion</span>
                  </div>
                  <select className="w-full bg-white rounded-lg border-0 focus:ring-2 focus:ring-[#4F7942]">
                    <option>Good</option>
                    <option>Moderate</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div className="p-4 bg-[#F4E7D1]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="h-5 w-5 text-[#4F7942]" />
                    <span className="font-medium">Sleep</span>
                  </div>
                  <select className="w-full bg-white rounded-lg border-0 focus:ring-2 focus:ring-[#4F7942]">
                    <option>Restful</option>
                    <option>Disturbed</option>
                    <option>Poor</option>
                  </select>
                </div>
                <div className="p-4 bg-[#F4E7D1]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-5 w-5 text-[#4F7942]" />
                    <span className="font-medium">Energy</span>
                  </div>
                  <select className="w-full bg-white rounded-lg border-0 focus:ring-2 focus:ring-[#4F7942]">
                    <option>High</option>
                    <option>Moderate</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Three Column Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Recommended Articles */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-[#4F7942]">Recommended Articles</h3>
                  <button className="text-[#4F7942] hover:text-[#3E5F34]">
                    <BookOpen className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recommendedArticles.map((article, index) => (
                    <div key={index} className="group cursor-pointer">
                      <h4 className="font-medium text-[#5A7184] group-hover:text-[#4F7942] transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-[#5A7184]/70">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Consultations */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-[#4F7942]">Upcoming Consultations</h3>
                  <button className="text-[#4F7942] hover:text-[#3E5F34]">
                    <Video className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-[#4F7942]/10 flex items-center justify-center">
                        {consultation.type === 'Video' ? (
                          <Video className="h-5 w-5 text-[#4F7942]" />
                        ) : (
                          <MessageCircle className="h-5 w-5 text-[#4F7942]" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-[#5A7184]">{consultation.doctor}</h4>
                        <div className="text-sm text-[#5A7184]/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {consultation.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {consultation.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full flex items-center justify-center gap-2 text-[#4F7942] hover:text-[#3E5F34] mt-4">
                    <Plus className="h-4 w-4" />
                    Book Consultation
                  </button>
                </div>
              </div>

              {/* Community Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-[#4F7942]">Community Activity</h3>
                  <button className="text-[#4F7942] hover:text-[#3E5F34]">
                    <Users className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-[#4F7942]/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-[#4F7942]" />
                    </div>
                    <div>
                      <p className="text-[#5A7184]">Your post received 12 likes</p>
                      <span className="text-sm text-[#5A7184]/70">2 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-[#4F7942]/10 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-[#4F7942]" />
                    </div>
                    <div>
                      <p className="text-[#5A7184]">New comment on your question</p>
                      <span className="text-sm text-[#5A7184]/70">5 hours ago</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-[#4F7942] hover:text-[#3E5F34] mt-4">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AyurBot Chat Widget */}
      {showAyurBot ? (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-xl">
          {/* Chat widget content */}
        </div>
      ) : (
        <button
          onClick={() => setShowAyurBot(true)}
          className="fixed bottom-6 right-6 bg-[#4F7942] text-white p-4 rounded-full shadow-lg hover:bg-[#3E5F34] transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}