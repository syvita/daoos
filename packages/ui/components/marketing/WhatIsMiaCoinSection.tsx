import React from "react";

const WhatIsMiaCoinSegment = () => {
  return (
    <div className="relative pt-16 pb-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute md:hidden lg:block inset-x-48 top-52 h-60 bg-gradient-to-l rounded-3xl from-blue-100"
      />
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div className="mt-6">
                <h2 className="text-3xl inline uppercase text-color-gradient font-extrabold tracking-tight">
                  What Is Maimi Coin
                </h2>

                <p className="mt-4 text-lg text-gray-500">
                  MiamiCoin is a cryptocurrency built to raise funds for the
                  Magic City. In order to generate new MiamiCoin, miners
                  contribute money - 30% of this is set aside in a
                  cryptocurrency wallet for the city of Miami to use how they
                  please.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  The rest is saved and “stacked” to generate interest and
                  allows holders of MiamiCoin to earn money by holding onto
                  MiamiCoin. As time goes on, there will be more ways to use and
                  spend your $MIA, all the while supporting the beautiful city
                  of Miami, Florida.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/section-3-pic.png"
                alt="Inbox user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMiaCoinSegment;
