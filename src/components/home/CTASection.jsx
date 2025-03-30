"use client"
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Path?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who've discovered their perfect career with FirstStep AI
        </p>
        <button className="px-8 py-4 bg-white text-violet-600 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto group">
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;