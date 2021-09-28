import { useAtomValue } from "jotai/utils";
import React from "react";
import MvClientOnly from "../common/MvClientOnly";
import MvMiaWalletUsdVal from "../common/MvMiaWalletUsdVal";

const BottomSection = () => {
  return (
    <div>
      <div className=" absolute h-auto w-full pt-0 pb-0  overflow-hidden"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid grid-cols-3 auto-cols-min  justify-items-center">
          <img
            className="md:max-w-sm  grid place-content-center relative max-w-xs mb-5  "
            src="/Mia-coin.png"
          />
          <span className="text-2xl pl-5 md:pl-0 self-center max-w- lg:text-3xl text-color-gradient uppercase font-bold tracking-tight">Raised For Miami: </span>
          <div className="text-4xl pl-5 md:pl-0 self-center max-w- lg:text-7xl text-color-gradient uppercase font-bold tracking-tighter">
            <MvMiaWalletUsdVal />
          </div>
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
