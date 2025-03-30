'use client';

import { Brain, Maximize2, Minimize2, Send, Sparkles, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import AiResponse from './AiResponse';
import { getUserAssessment } from '@/utils/firebase/assessment/read';
import { formatObjectToText } from '@/utils/util';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ChatPopup = ({ isOpen, onClose, isMinimized, onMinimize }) => {
  const user=useSelector(state=>state.user)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI career assistant. How can I help you today?",
      isAi: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [assessmentAns,setAssessmentAns] = useState([]) 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      isAi: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const aiResponse = {
        id: messages.length + 2,
        text: data.response,
        isAi: true,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: 'Oops! Something went wrong. Please try again.',
          isAi: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  
  // useEffect(()=>{
  //   (async () => {
  //     try {
  //       const res = await getUserAssessment({ uid: user?.uid });
  //       // console.log("res:::", res);
  //       console.log('foramted text::',formatObjectToText(res));
  //       setAssessmentAns(formatObjectToText(res))} catch (err) {
  //       toast.error(err?.message);
  //     }
  //   })()
  // },[user])
  return (
    <div
      className={`fixed right-0 md:right-4 ${
        isMinimized ? 'bottom-4 w-72 h-12' : 'bottom-4 w-full md:w-1/2 lg:w-2/3 h-[600px]'
      } bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 z-50`}
    >
      {/* Chat Header */}
      <div className="absolute top-0 left-0 right-0 bg-white rounded-t-2xl border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-violet-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Virtual AI Assistant
              </h3>
              {!isMinimized && (
                <p className="text-xs text-gray-500">
                  Ask me anything about your career
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMinimize}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="absolute top-[73px] bottom-[73px] left-0 right-0 overflow-y-auto bg-gray-50">
            <div className="space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isAi ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                      message.isAi
                        ? 'bg-white shadow-sm'
                        : 'bg-violet-600 text-white'
                    }`}
                  >
                    <AiResponse>

                    {message.text}
                    </AiResponse>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <div
                        className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl border-t border-gray-200">
            <div className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPopup;
