import React from "react";
import { classNames, badgeColors as colors} from "../lib/utils";

const Badge: React.FC<{ color: string; classnames?: string }> = ({
  color,
  classnames,
  children,
}) => {
  return (
    <span
      className={classNames(
        colors[color].text,
        colors[color].bg,
        classnames,
        "text-xs font-semibold mr-2 inline-block    rounded-full "
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
