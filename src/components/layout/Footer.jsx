"use client";
import React from 'react';
import { Brain, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    product: ['Features', 'How it Works', 'Pricing', 'FAQ'],
    company: ['About Us', 'Careers', 'Blog', 'Contact'],
    resources: ['Career Guide', 'Success Stories', 'Research', 'Support'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  const SocialIcons = [Twitter, Linkedin, Instagram];

  return (
    <footer className="bg-gradient-to-b from-white to-violet-50">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-violet-600" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                FirstStep AI
              </span>
            </Link>
            <p className="text-gray-600 max-w-sm">
              Empowering students to discover their perfect career path through AI-driven guidance 
              and personalized recommendations.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {SocialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 hover:bg-violet-200 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {Object.entries(footerLinks).slice(0, 3).map(([section, links]) => (
            <div key={section} className="space-y-6">
              <h3 className="font-semibold text-gray-900 capitalize">{section}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-200 py-8 my-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Stay Updated with Career Insights
            </h3>
            <p className="text-gray-600">
              Get the latest career guidance tips and industry insights delivered to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-violet-600"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} FirstStep AI. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>By Amaan Syed</span>
            </div>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-600 hover:text-violet-600 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
