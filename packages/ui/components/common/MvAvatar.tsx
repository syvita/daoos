import React from "react";
import { classNames } from "../../lib/utils";

const MvAvatar: React.FC<{
  isText?: boolean;
  color?: string;
  colorInner?: string;
  size?: string;
  name?: string;
}> = ({ isText, color, size, name, colorInner }) => {
  return isText && name ? (
    <span
      className={classNames(
        color,
        size,
        "inline-flex items-center justify-center  rounded-full "
      )}
    >
      <span className="text-xl  capitalize font-medium leading-none text-white">
        {name.substr(0, 2)}
      </span>
    </span>
  ) : (
    <span
      className={classNames(
        size,
        color,
        "inline-block  rounded-full overflow-hidden "
      )}
    >
      <svg
        className={classNames(colorInner, "h-full w-full ")}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

export default MvAvatar;
