"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const scrollRef = useRef(null);
  const testimonials = [
    {
      name: "Amaan Syed",
      role: "Software Engineer",
      image: "assets/profile1.png",
      quote: "FirstStep AI helped me discover my passion for coding and guided me through every step."
    },
    {
      name: "Shashank Wagde",
      role: "UX Designer",
      image: "assets/profile2.png",
      quote: "The personalized roadmap was exactly what I needed to transition into design."
    },
    {
      name: "Kshitij Urade",
      role: "Data Scientist",
      image: "assets/profile3.png",
      quote: "Thanks to FirstStep AI, I found my dream career in data science."
    },
    {
      name: "Ajinkya Sugandhe",
      role: "Web Developer",
      image: "assets/profile4.png",
      quote: "With FirstStep AI, I transformed my coding skills into real-world web development expertise!"
    },
    {
      name: "Ajinkya Sugandhe",
      role: "Web Developer",
      image: "assets/profile5.png",
      quote: "Thanks to FirstStep AI, I built the confidence to create stunning websites and powerful applications!"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let scrollAmount = 0;
    const scrollSpeed = 1;
    
    const scrollStep = () => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      requestAnimationFrame(scrollStep);
    };
    
    requestAnimationFrame(scrollStep);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Success Stories</h2>
        
        <div 
          ref={scrollRef} 
          className="relative overflow-x-auto flex space-x-6 snap-x scroll-smooth py-4 px-2 whitespace-nowrap"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="min-w-[320px] md:min-w-[400px] p-6 bg-gradient-to-b from-violet-50 to-white rounded-xl snap-center shadow-lg inline-block flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-justify break-words whitespace-normal leading-relaxed">"{testimonial.quote}"</p>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
