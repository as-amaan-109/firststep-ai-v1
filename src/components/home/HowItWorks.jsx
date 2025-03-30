"use client"

import React from 'react';
import { CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-violet-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold">Simple Steps to Your Perfect Career</h2>
            <p className="text-xl text-gray-600">
              Our platform makes it easy to discover and pursue your ideal career path
            </p>
            
            <div className="space-y-6">
              {[
                "Complete the AI-powered assessment",
                "Explore matching career options",
                "Get your personalized roadmap",
                "Track your progress and growth"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-lg text-gray-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <img 
              src="/assets/counselling.png"
              alt="How it works"
              className="rounded-2xl"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "600px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;