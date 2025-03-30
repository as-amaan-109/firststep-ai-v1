"use client";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import CustomBtn from "./CustomBtn";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase/config";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";
const UserDropdown = ({userDetails}) => {
  const {displayName,email,uid,photoURL} = userDetails;
  const [imgSrc,setImgSrc] = useState(photoURL?? "./../images/user-img.jpg")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    // Add your logout logic here
    router.push("/login");
  };
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <img
            src={imgSrc}
            alt="Profile"
            width={32}
            height={32}
            onError={()=>setImgSrc("./images/user-img.jpg")}
            className="rounded-full border border-gray-200"
          />
          <span className="text-sm font-medium text-gray-700">{displayName ?? "user"}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{displayName ?? "user"}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>

            <div className="py-2">
              <Link href={`/dashboard`} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help Center
              </button>
            </div>

            <div className="border-t border-gray-100 py-2">
              <CustomBtn
                isLoading={isLoading}
                onClick={()=>{
                  signOut(auth).then(() => {
                    toast.success("Logged out")
                  }).catch((error) => {
                    toast.error(error.message)
                  });
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </CustomBtn>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDropdown;
