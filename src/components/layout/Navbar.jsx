"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Brain } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase/config";
import { clearUser, setUser } from "@/store/userSlice";
import UserDropdown from "../UserDropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tempUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(setUser(tempUser));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, []);

  const menuItems = [
    { label: "Features", path: "#features" },
    { label: "How it Works", path: "#how-it-works" },
    { label: "Testimonials", path: "#testimonials" },
    { label: "Pricing", path: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4"
          : "bg-transparent py-6"
      } ${
        isMobileMenuOpen ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-violet-600" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              FirstStep AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="text-gray-600 hover:text-violet-600 transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          {user ? (
            <UserDropdown userDetails={user}/>
          ) : (
            ""
          )}
          {!user && <div className="  items-end ">
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all"
              >
                Login
              </Link>
            </div>}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-violet-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="block text-gray-600 hover:text-violet-600 transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            {user ? (
              ""
            ) : (
              <div className="border-t pt-4 space-y-4">
                <Link
                  href="/register"
                  className="block px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
