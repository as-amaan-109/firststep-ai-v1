'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Shield,
  HelpCircle,
  MessageSquare,
  Brain,
  Maximize2,
  Minimize2,
  X,
  Send,
  Sparkles,
  Bell
} from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import UserDropdown from '../UserDropdown';
import { useSelector } from 'react-redux';
import FloatingChatButton from './FloatingChatButton';
import ChatPopup from './ChatPopup';


const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const user = useSelector(state=>state.user)
  
  const router = useRouter();
  const pathname = usePathname();  

  const toggleChat = () => {
    if (!isChatOpen) {
      setIsChatOpen(true);
      setIsChatMinimized(false);
    } else {
      setIsChatMinimized(!isChatMinimized);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative text-gray-500 hover:text-gray-600">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile Dropdown */}
              {user?<UserDropdown userDetails={user}/>:""}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>

        {/* Floating Chat Button */}
        <FloatingChatButton
          onClick={toggleChat}
          isOpen={isChatOpen}
          isMinimized={isChatMinimized}
        />

        {/* Chat Popup */}
        <ChatPopup
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          isMinimized={isChatMinimized}
          onMinimize={() => setIsChatMinimized(!isChatMinimized)}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
