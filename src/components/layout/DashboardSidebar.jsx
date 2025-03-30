import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Brain, Compass, Rocket, Settings, LogOut, ChevronRight, PersonStandingIcon, ScanFaceIcon } from 'lucide-react';

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  
  const menuItems = [
    { 
      icon: Home, 
      label: 'Overview', 
      path: '/dashboard',
      badge: null
    },
    { 
      icon: Brain, 
      label: 'Assessment', 
      path: '/dashboard/assessment',
      // badge: '2'
    },
    { 
      icon: Rocket, 
      label: 'Roadmap', 
      path: '/dashboard/roadmap',
      badge: null
    },
    { 
      icon: ScanFaceIcon, 
      label: 'Talk To AI', 
      path: '/dashboard/avatar',
      badge: null
    }
  ];

  const isActive = (path) => pathname === path;

  // Close sidebar on mobile when clicking a link
  const handleMobileNavigation = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          ${isOpen ? 'w-64' : 'md:w-20'} 
          shadow-lg md:shadow-none z-40`}
      >
        {/* Logo */}
        <Link  href={`/`} className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100">
            <Brain className="w-6 h-6 text-violet-600" />
          </div>
          <span className={`font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent
            transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
            FirstStep
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={handleMobileNavigation}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive(item.path) 
                  ? 'bg-violet-50 text-violet-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <item.icon className={`w-6 h-6 flex-shrink-0 transition-transform duration-200
                ${isActive(item.path) ? 'text-violet-600' : 'text-gray-400 group-hover:text-violet-600'}`} />
              
              <div className={`flex items-center justify-between flex-1 transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                <span className="font-medium whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full flex items-center justify-center
                    ${item.badge === 'New' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-violet-100 text-violet-700'}`}>
                    {item.badge}
                  </span>
                )}
              </div>

              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200
                ${isActive(item.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} 
                ${!isOpen && 'hidden'}`} />
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="border-t border-gray-200" />
        </div>

        {/* Bottom Menu Items */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <Link
            href="/dashboard/settings"
            onClick={handleMobileNavigation}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200 group"
          >
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-violet-600" />
            <span className={`font-medium transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
              Settings
            </span>
          </Link>
          
          <button
            onClick={() => {/* Handle logout */}}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group"
          >
            <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
            <span className={`font-medium transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;