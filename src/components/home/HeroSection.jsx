"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import UserJourneyAnimation from "./UserJourneyAnimation";

const AnimatedText = () => {
  const phrases = [
    "Perfect Career",
    "Dream Journey",
    "Future Success",
    "Best Path",
    "True Potential",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true); // Start fade in
      }, 500); // Half of the interval for smooth transition
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block transform transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {phrases[currentIndex]}
    </span>
  );
};

const HeroSection = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const generatedShapes = Array(5)
      .fill(0)
      .map(() => ({
        width: Math.random() * 100 + 100,
        height: Math.random() * 100 + 100,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
        duration: Math.random() * 5 + 5,
      }));
    setShapes(generatedShapes);
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center">
      {/* Background pattern remains same */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />

        {/* Geometric shapes */}
        {shapes.map((shape, i) => (
          <div
            key={i}
            className="absolute transform rotate-45 border-2 border-violet-200/50 rounded-2xl"
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              top: shape.top,
              left: shape.left,
              animation: `float ${shape.duration}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full border border-violet-100">
              <span className="text-violet-600">✨</span>
              <span className="text-gray-600">AI-Powered Career Guidance</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-[56px] font-bold leading-tight">
                Discover Your <br />
                <AnimatedText />
              </h1>

              <p className="text-xl text-gray-600 max-w-xl">
                Let AI guide you to the perfect career path. Transform your
                future with data-driven direction.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-violet-600 text-white rounded-full font-semibold overflow-hidden transform hover:scale-105 transition-all">
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:opacity-100 transition-opacity opacity-0" />
              </button>
              <button className="px-8 py-4 border-2 border-violet-600 text-violet-600 rounded-full font-semibold hover:bg-violet-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Animation Container with proper positioning */}
          <div className="flex-1 flex items-center justify-center w-full max-w-xl ml-auto">
            <div className="w-full pt-8">
              <UserJourneyAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
