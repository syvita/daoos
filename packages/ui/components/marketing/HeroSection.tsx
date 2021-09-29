import React from "react";
import dynamic  from "next/dynamic";
const AuthButton = dynamic(()=>import("./AuthButton"),{ssr:false})

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto  py-5 px-4 sm:py-5 sm:px-10 lg:px-8 lg:flex lg:justify-between">
          <div
            aria-hidden="true"
            className="  absolute rounded-3xl hidden lg:block opacity-50 right-10 w-1/2 top-40 h-32 bg-gradient-to-r from-purple-600"
          ></div>
          <div className="lg:grid-cols-2 lg:grid">
            <img
              className="w-full mb-10 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-60 lg:h-full lg:w-auto lg:max-w-none"
              src="/hero-pic.png"
              alt="Hero picture"
            />
            <span className="sr-only">Miami picture</span>
            <div className="max-w-md">
              <h2 className="text-4xl uppercase lg:max-w-lg max-w-xs font-light text-transparent bg-clip-text bg-gradient-to-tr from-deep-pink via-red-400 to-blue-500 text sm:text-5xl sm:tracking-tighter lg:text-6xl">
                Welcome to{" "}
                <span className="font-bold tracking-wide">MiamiVoice</span>
              </h2>

              <p className="mt-5 bg- text-lg text-gray-500">
                What would you like to see happen in your city? Connect your
                wallet and help your community
              </p>
              <AuthButton />
            </div>
            
            {/**? */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
