import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    lifestyle: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Call the signup function directly with the form data
       await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: parseInt(formData.age),
        lifestyle: formData.lifestyle
      });
      
      // Navigation is handled in the signup function in AuthContext
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4E7D1] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#4F7942]">Create Your Account</h2>
            <p className="text-[#5A7184] mt-2">Begin your personalized Ayurvedic wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#5A7184]" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#5A7184]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#5A7184]" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#5A7184]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#5A7184]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#5A7184]" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="lifestyle" className="block text-sm font-medium text-[#5A7184] mb-2">
                  Lifestyle
                </label>
                <select
                  id="lifestyle"
                  name="lifestyle"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                  required
                >
                  <option value="">Select lifestyle</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="moderately-active">Moderately Active</option>
                  <option value="active">Active</option>
                  <option value="very-active">Very Active</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-[#4F7942] focus:ring-[#4F7942] border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-[#5A7184]">
                I agree to the{' '}
                <a href="#" className="text-[#4F7942] hover:text-[#3E5F34]">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4F7942] text-white py-2 px-4 rounded-lg hover:bg-[#3E5F34] transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#5A7184]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#4F7942] hover:text-[#3E5F34] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}