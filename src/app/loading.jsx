'use client';

import React from 'react';

const CircularLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin-slow border-t-purple-600"></div>
        <div className="absolute inset-2 border-4 border-purple-100 rounded-full"></div>
      </div>
    </div>
  );
};

export default CircularLoader;
