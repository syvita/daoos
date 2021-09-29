import React from "react";

const FancyPalmStripSection = () => {
  return (
    <div className="relative  max-w-7xl mx-auto pt-0 pb-16 overflow-hidden">
      <div
        className="flex items-center lg:rounded-3xl justify-center bg-scroll w-full h-32 text-center"
        style={{ backgroundImage: "url('/palms.png')" }}
      >
        <p className="font-light tracking-tight italic text-gray-600 text-xl">
          A new coin for a{" "}
          <span className="font-semibold">
            new and improved generation of Miami,
          </span>{" "}
          by and for the
          <span className="font-semibold"> Miami citizens.</span>
        </p>
      </div>
    </div>
  );
};

export default FancyPalmStripSection;
