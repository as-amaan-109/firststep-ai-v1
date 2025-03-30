import { MessageSquare } from "lucide-react";


// Floating Chat Button Component
const FloatingChatButton = ({ onClick, isOpen, isMinimized }) => (
  <button 
    onClick={onClick}
    className={`fixed right-4 bottom-4 z-50 ${isOpen && !isMinimized ? 'hidden' : 'flex'} items-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-violet-700 transition-all duration-300`}
  >
    <MessageSquare className="w-5 h-5" />
    <span className="text-sm font-medium">Chat with AI</span>
  </button>
);

export default FloatingChatButton;