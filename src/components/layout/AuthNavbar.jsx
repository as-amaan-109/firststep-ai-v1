// src/components/layout/AuthNavbar.jsx
"use client"

import React, { useEffect } from 'react';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase/config';
import { clearUser, setUser } from '@/store/userSlice';

const AuthNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
  return (
    <nav className=" bg-transparent z-50 py-3">
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

          {/* Back to Home */}
          <Link
            href="/"
            className="text-gray-600 hover:text-violet-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;