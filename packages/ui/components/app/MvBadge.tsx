import React from "react";
import { badgeColors as colors } from "../../lib/constants";
import { classNames } from "../../lib/utils";

const Badge: React.FC<{
  color: string;
  classnames?: string;
  showIndicator?: boolean;
}> = ({ color, classnames, children, showIndicator }) => {
  return (
    <span
      className={classNames(
        colors[color].text,
        colors[color].bg,
        classnames,
        "text-xs font-semibold  inline-block    rounded-full "
      )}
    >
      {showIndicator && (
        <svg
          className={classNames(colors[color].text, "ml-0.5 mr-1.5 h-2 w-2")}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
      )}
      {children}
    </span>
  );
};

Badge.defaultProps = {
  color: "indigo",
};

export default Badge;
