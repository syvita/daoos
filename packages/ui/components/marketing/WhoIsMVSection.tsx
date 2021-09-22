import React from "react";

const WhoIsMVSection = () => {
  return (
    <div className="relative  sm:pt-0 pb-32 overflow-hidden">
      <div
        aria-hidden="true"

        className="absolute rounded-3xl hidden lg:block  inset-x-48 w-1/2 top-48 h-60 bg-gradient-to-r from-pink-400"
      />
      <div className="mt-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
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
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/section-1-pic.png"
                alt="Who is miami voice"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsMVSection;
