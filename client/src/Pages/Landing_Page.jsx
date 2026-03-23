import React, { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";

const Landing_Page = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <FaFacebook className="text-white text-6xl sm:text-7xl md:text-8xl animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-white opacity-30 scale-110"></div>
            </div>

            <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Facebook
            </h1>
          </div>

          {/* Loading Animation */}
          <div className="flex flex-col items-center space-y-6">
            {/* Animated Dots */}
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>

            {/* Loading Text */}
            <p className="text-white/80 text-sm sm:text-base animate-pulse">
              {loading ? "Loading your experience..." : "Welcome back!"}
            </p>

            {/* Progress Bar */}
            <div className="w-64 sm:w-80 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Progress Percentage */}
            <p className="text-white/60 text-xs sm:text-sm">
              {progress}% Complete
            </p>
          </div>

          {/* Footer Text */}
          <div className="absolute bottom-8 text-center">
            <p className="text-white/50 text-xs sm:text-sm">
              Connecting the world, one post at a time
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
      </div>
    </>
  );
};

export default Landing_Page;
