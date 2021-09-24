import React from "react";

const BottomSection = () => {
  return (
    <div className=" relative pt-0 pb-0 overflow-hidden">
      <div className="flex justify-items-stretch">
        <img className="w-auto  lg:max-w-xs flex-shrink-0  " src="/Mia-coin.png" />
        <div className="text-3xl max-w-sm lg:text-4xl text-color-gradient uppercase font-bold tracking-tight">
          Raised For Miami:$2,906,108.14
        </div>
      </div>
      <div
        className=" opacity-40 bg-bottom bg-no-repeat bg-scroll pb-80 "
        style={{ backgroundImage: "url('/section-4-pic.png')" }}
      ></div>
    </div>
  );
};

export default BottomSection;
