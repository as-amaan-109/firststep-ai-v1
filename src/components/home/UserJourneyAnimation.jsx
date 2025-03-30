"use client"

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Code, 
  Database,
  Globe,
  ChefHat,
  Utensils,
  Star,
  ClipboardCheck,
  LightbulbIcon,
  GraduationCap,
  Award,
  Terminal
} from 'lucide-react';

const UserJourneyAnimation = () => {
  const [phase, setPhase] = useState('assessment');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showPaths, setShowPaths] = useState([false, false, false]);

  // Career data structure
  const careerPaths = {
    it: {
      title: "Software Development",
      paths: [
        {
          title: "Software Developer",
          description: "Build innovative applications",
          skills: ["Full Stack", "Cloud Computing", "Problem Solving"],
          icon: Terminal,
          level: "Entry → Senior: 2-5 years"
        },
        {
          title: "AI Engineer",
          description: "Create intelligent systems",
          skills: ["Machine Learning", "Python", "Data Science"],
          icon: Brain,
          level: "Mid → Senior: 3-6 years"
        },
        {
          title: "DevOps Engineer",
          description: "Streamline development",
          skills: ["CI/CD", "Cloud", "Automation"],
          icon: Database,
          level: "Mid → Senior: 3-5 years"
        }
      ]
    }
  };

  // Questions for assessment
  const questions = [
    {
      text: "What interests you most?",
      options: ["Technology & Innovation", "Software Development"]
    },
    {
      text: "Where do you see yourself?",
      options: ["Building Solutions", "Creating Systems"]
    }
  ];

  useEffect(() => {
    const runAnimation = async () => {
      // Reset state
      setShowPaths([false, false, false]);
      setAnalysisProgress(0);
      setQuestionIndex(0);
      setPhase('assessment');

      // Assessment phase
      await new Promise(r => setTimeout(r, 2000));
      setQuestionIndex(1);
      await new Promise(r => setTimeout(r, 2000));

      // Analysis phase
      setPhase('analysis');
      for (let i = 0; i <= 100; i += 2) {
        setAnalysisProgress(i);
        await new Promise(r => setTimeout(r, 30));
      }
      await new Promise(r => setTimeout(r, 500));

      // Results phase
      setPhase('it-path');
      for (let i = 0; i < 3; i++) {
        await new Promise(r => setTimeout(r, 300));
        setShowPaths(prev => prev.map((show, idx) => idx === i ? true : show));
      }

      // Wait before restarting
      await new Promise(r => setTimeout(r, 5000));
      runAnimation();
    };

    runAnimation();
  }, []);

  const renderAssessment = () => (
    <div className={`transition-all duration-700 ${
      phase === 'assessment' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
          <ClipboardCheck className="w-6 h-6 text-violet-600" />
        </div>
        <h3 className="text-xl font-bold">Quick Assessment</h3>
      </div>
      
      <div className="space-y-6">
        <div className="text-lg text-gray-700 font-medium">
          {questions[questionIndex]?.text}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {questions[questionIndex]?.options.map((option, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border-2 border-violet-200 bg-violet-50
                transition-all duration-300 transform hover:scale-105"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className={`transition-all duration-700 ${
      phase === 'analysis' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <div className="text-center space-y-6">
        <Brain className="w-16 h-16 text-violet-600 mx-auto animate-bounce" />
        <p className="text-lg text-gray-700">Analyzing your preferences...</p>
        <div className="w-64 h-2 bg-violet-100 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${analysisProgress}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderCareerPath = (type) => (
    <div className={`transition-all duration-700 ${
      phase === `${type}-path` ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
          <Code className="w-6 h-6 text-violet-600" />
        </div>
        <h3 className="text-xl font-bold">Career Paths</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {careerPaths[type].paths.map((path, idx) => {
          const PathIcon = path.icon;
          return (
            <div 
              key={idx}
              className={`transform transition-all duration-500 ${
                showPaths[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="p-4 rounded-lg bg-violet-50 border border-violet-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                  <PathIcon className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="font-medium text-gray-800 mb-2">{path.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                <div className="space-y-2">
                  <div className="text-xs text-violet-600 flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    {path.level}
                  </div>
                  {path.skills.map((skill, i) => (
                    <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                      <Award className="w-3 h-3 text-violet-400" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-lg p-6 min-h-[450px]">
      <div className="absolute inset-0 p-6 flex items-center justify-center">
        {phase === 'assessment' && renderAssessment()}
        {phase === 'analysis' && renderAnalysis()}
        {phase === 'it-path' && renderCareerPath('it')}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-gray-500">
        <LightbulbIcon className="w-4 h-4 text-violet-600 animate-pulse" />
        AI Analysis in Progress
      </div>
    </div>
  );
};

export default UserJourneyAnimation;