import React from "react";

const WhoIsMVSection = () => {
  return (
    <div className="relative  sm:pt-0 pb-32 overflow-hidden">
      <div
        aria-hidden="true"

        className="absolute md:rounded-3xl hidden md:block  inset-x-48 w-1/2 top-48 h-60 bg-gradient-to-r from-pink-400"
      />
      <div className="md:mt-24 mt-5">
        <div className="md:mx-auto pl-10 pr-10 md:max-w-7xl md:px-8 md:grid md:grid-cols-2 md:grid-flow-col-dense md:gap-10 lg:gap-24">
          
          <div className="mt-0  md:mt-0 md:col-start-1">
            <div className=" md:px-0 md:m-0 md:relative md:h-full">
              <img
                className="w-full  rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 md:absolute md:right-0 md:h-full md:w-auto md:max-w-none"
                src="/section-1-pic.png"
                alt="Who is miami voice"
              />
            </div>
          </div>
          
          <div className=" max-w-xl   md:py-32 md:max-w-none md:mx-0 md:px-0 md:col-start-2">
            <div>
              <div className="mt-6">
                <h2 className="text-color-gradient text-3xl uppercase
                  font-extrabold tracking-tight">
                  Who is Miamivoice
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Miami Voice is a MiamiCoin app that allows you to propose
                  ideas and vote on how Miami should spend their funds raised
                  through MaimiCoin ($MIA) mining.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WhoIsMVSection;
