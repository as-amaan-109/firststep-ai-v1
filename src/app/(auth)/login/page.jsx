"use client";
// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthNavbar from "@/components/layout/AuthNavbar";
import CustomBtn from "@/components/CustomBtn";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/utils/firebase/config";
import { useSelector } from "react-redux";
import { createUser } from "@/utils/firebase/users/write";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("Login attempt with:", formData);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Logged In Successfully");
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.message)
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignin = async (e) => {
    setIsLoading(true);
    try {
      console.log("Login attempt with:", formData);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      // const user = await response.user;
      const user = {
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        uid: response.user.uid,
      };
      await createUser({ uid: user?.uid, user: user });
      toast.success("Login Success");
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      toast.success("Already Logged in");
      // console.log(user)
      router.back();
    }
  }, [user, router]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-violet-100 to-indigo-100">
      {/* Navbar */}
      <div className="z-50  shadow-sm">
        <AuthNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </h1>
              <p className="text-gray-600">Continue your journey to success</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <CustomBtn
                type="submit"
                isLoading={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CustomBtn>
              <hr />
              <CustomBtn
                isLoading={isLoading}
                className="w-full py-2 px-4 bg-black text-white rounded-lg"
                onClick={handleGoogleSignin}
              >
                <GoogleIcon />
                &nbsp; Sign in with Google
              </CustomBtn>

              {/* Links */}
              <div className="text-center space-y-4">
                <Link
                  href="/forgot-password"
                  className="text-sm text-violet-600 hover:text-violet-700"
                >
                  Forgot your password?
                </Link>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
