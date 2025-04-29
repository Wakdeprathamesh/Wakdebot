import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Doshas = {
  vata: number;
  pitta: number;
  kapha: number;
};

type Recommendations = {
  diet: string[];
  exercise: string[];
  lifestyle: string[];
};

type Prakriti = {
  constitution: string;
  doshas: Doshas;
  recommendations: Recommendations;
  lastUpdated: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  gender?: string;
  age?: number;
  lifestyle?: string;
  prakriti?: Prakriti; // Add prakriti field
} | null;


type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  updatePrakriti: (prakriti: Prakriti) => void;
  logout: () => void;
  isLoading: boolean;
};

type SignupData = {
  name: string;
  email: string;
  gender?: string;
  age?: number;
  lifestyle?: string;
  prakriti?: Prakriti; // Add prakriti field
} | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth token and user
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

    // Function to update Prakriti
    const updatePrakriti = (prakriti: Prakriti) => {
      if (!user) return;
      
      const updatedUser = { ...user, prakriti };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    };
  

  const login = async (email: string, password: string) => {
    try {
      // Make the actual API call if you want to use real data
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      console.log(response);
      
      const userData = {
        id: response.data.user._id, // Ensure correct object structure
        name: response.data.user.name,
        email: response.data.user.email,
        gender: response.data.user.gender,
        age: response.data.user.age,
        lifestyle: response.data.user.lifestyle,
        prakriti: response.data.user.prakriti || null, // Ensure it handles missing prakriti data
      };

      console.log(userData);
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  
  const signup = async (userData: SignupData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);

      console.log("response",response);

      localStorage.setItem("token",response.data.token);
      
      // After successful signup, log the user in
      await login(userData.email, userData.password);
    } catch (error) {
      throw new Error('Signup failed');
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updatePrakriti, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}