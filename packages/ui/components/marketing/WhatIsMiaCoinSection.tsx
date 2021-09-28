import React from "react";

const WhatIsMiaCoinSegment = () => {
  return (
    <div className="relative  sm:pt-0 pb-16 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute md:rounded-3xl hidden md:block right-48 w-1/2 top-72 h-80 bg-gradient-to-l from-blue-100"
      />
      <div className="md:mt-24 mt-5">
        <div className="md:mx-auto pl-10 pr-10 md:max-w-7xl md:px-8 md:grid md:grid-cols-2 md:grid-flow-col-dense md:gap-10 lg:gap-24">
          <div className="mt-0  md:mt-0 md:col-start-2">
            <div className=" md:px-0 md:m-0 md:relative md:h-full">
              <img
                className="w-full  rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 md:absolute md:left-0 md:h-full md:w-auto md:max-w-none"
                src="/section-3-pic.png"
                alt="Who is miami voice"
              />
            </div>
          </div>

          <div className=" max-w-xl   md:py-32 md:max-w-none md:mx-0 md:px-0 md:col-start-1">
            <div>
              <div className="mt-6">
                <h2 className="text-3xl inline  text-color-gradient font-extrabold tracking-tight">
                  <span className="uppercase">What Is</span> Maimi Coin
                </h2>

                <p className="mt-4 text-lg text-justify text-gray-500">
                  MiamiCoin is a cryptocurrency built to raise funds for the
                  Magic City. In order to generate new MiamiCoin, miners
                  contribute money - 30% of this is set aside in a
                  cryptocurrency wallet for the city of Miami to use how they
                  please.
                </p>
                <p className="mt-4 text-lg text-justify text-gray-500">
                  The remaining 70% is given back to holders of MiamiCoin to
                  earn money by "stacking" MiamiCoin - simply locking it away
                  for one or more 2-week cycles. As time goes on, there will be
                  more ways to use and spend your $MIA, all the while supporting
                  the beautiful city of Miami, Florida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMiaCoinSegment;
