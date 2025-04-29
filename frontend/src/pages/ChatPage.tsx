import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          content: 'Namaste! I am AyurBot, your personal Ayurvedic wellness assistant. How may I help you today?',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id || 'anonymous',
          message: inputMessage
        }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: data.message_id || Date.now().toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'I apologize, but I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F4E7D1] to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Chat Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4F7942] mb-2">
            AyurBot Consultation
          </h1>
          <p className="text-[#5A7184]">
            Your personal Ayurvedic wellness assistant
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#4F7942] text-white rounded-br-none'
                      : 'bg-[#F4E7D1] text-[#5A7184] rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F4E7D1] text-[#5A7184] rounded-lg rounded-bl-none px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 resize-none border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#4F7942] text-white p-2 rounded-lg hover:bg-[#3E5F34] transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-sm text-[#5A7184]">
          <p>
            Note: This is an AI-powered consultation tool. For serious medical concerns,
            please consult with a qualified Ayurvedic practitioner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 