import { useAtomValue } from "jotai/utils";
import React from "react";
import MvClientOnly from "../common/MvClientOnly";
import MvMiaWalletUsdVal from "../common/MvMiaWalletUsdVal";

const BottomSection = () => {
  return (
    <div className=" relative pt-0 pb-0 overflow-hidden">
      <div className="flex  items-stretch">
        <img
          className="w-auto lg:max-w-xs  "
          src="/Mia-coin.png"
        />
        <div className="text-3xl   max-w-sm lg:text-4xl text-color-gradient uppercase font-bold tracking-tight">
          <MvMiaWalletUsdVal />
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
