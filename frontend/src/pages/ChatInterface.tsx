import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import "./ChatInterface.css";
import { useAuth } from '../contexts/AuthContext';
import '../i18n/config';

const BACKEND_URL = 'http://localhost:5000';

// Define types
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
  prakriti?: Prakriti;
} | null;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SourceDocument {
  source: string;
  page: string;
  content: string;
}

interface QueryResponse {
  result: string;
  source_documents?: SourceDocument[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  const scrollToBottom = (): void => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: t('welcome')
        }
      ]);
    }
  }, [t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputValue
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Create a chat session object that matches the backend's expectations
      const chatSession = {
        user_id: user?.id || 'anonymous',
        message: inputValue,
        consultation_history: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          type: msg.role === 'user' ? 'question' : 'answer'
        }))
      };

      console.log('Sending chat session:', chatSession); // Debug log
      
      const response = await axios.post(`${BACKEND_URL}/api/chat`, chatSession);
      console.log('Received response:', response.data); // Debug log
      
      if (response.data && response.data.response) {
        const botMessage: Message = {
          role: 'assistant',
          content: response.data.response
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error in chat request:', error); // Debug log
      
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error)) {
        console.log('Axios error response:', error.response?.data); // Debug log
        
        // Extract the validation error details from FastAPI's response
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          // FastAPI validation errors come as an array
          errorMessage = detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join('\n');
        } else if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 422) {
          errorMessage = 'Invalid request format. Please check your input.';
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      const botErrorMessage: Message = {
        role: 'assistant',
        content: `I apologize, but I encountered an error:\n${errorMessage}\nPlease try again.`
      };
      
      setMessages(prevMessages => [...prevMessages, botErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-[#F4E7D1] to-white py-8">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-content loading">
                <div className="dot-typing"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t('chat.placeholder')}
            disabled={isLoading}
            className="query-input"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()} 
            className="send-button"
          >
            {t('chat.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;