"use client"
import React from 'react';
import { Brain, Compass, Rocket } from 'lucide-react';

const FeatureSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How FirstStep AI Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform guides you through every step of your career journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "AI Assessment",
              description: "Take our comprehensive personality and interest assessment powered by AI algorithms."
            },
            {
              icon: Compass,
              title: "Career Explorer",
              description: "Discover matching careers based on your unique skills and interests."
            },
            {
              icon: Rocket,
              title: "Personal Roadmap",
              description: "Get a customized learning path to achieve your career goals."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors">
                <feature.icon className="w-7 h-7 text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;