import React from "react";

const BottomSection = () => {
  return (
    <div className=" relative pt-0 pb-0 overflow-hidden">
      <div className="lg:mx-auto lg:max-w-7xl items-center lg:px-8 lg:grid lg:grid-cols-3 lg:grid-flow-col-dense lg:gap-0">
        <img className="max-w-xs " src="/Mia-coin.png" />
        <div className="text-4xl lg:3xl text-color-gradient uppercase font-bold tracking-tight">
          Raised For Miami:
        </div>
        <div className="text-4xl lg:3xl text-color-gradient uppercase font-bold tracking-tight">
          {/*Todo write function to update with latest dollar value of STX for miami*/}
          $2,906,108.14
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
