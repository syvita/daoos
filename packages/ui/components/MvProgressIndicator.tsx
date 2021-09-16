import React, { Children } from "react";
import { classNames, colors, numberToPercent } from "../lib/utils";
import Badge from "./MvBadge";
import { ProposalStatus } from "./MvProposalStatus";

type TColorConfig = {
  prefix: string;
  suffix: string;
};

const ProgressIndicator: React.FC<{
  total: number;
  actual: number;
  color?: string;
  label?: string;
}> = ({ total, actual, children, color, label }) => {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <Badge color={color} classnames='py-0 px-3'>
            {label} {actual}/{total}
          </Badge>
          {children}
        </div>
        <div className="text-right">
          <span
            className={classNames(
              colors[color].text2,
              "text-xs font-semibold inline-block "
            )}
          >
            {numberToPercent(actual, total)}
          </span>
        </div>
      </div>
      <div
        className={classNames(
          colors[color].bg1,
          "overflow-hidden h-1 mb-4 text-xs flex rounded "
        )}
      >
        <div
          style={{ width: numberToPercent(actual, total) }}
          className={classNames(
            colors[color].bg2,
            "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
          )}
        ></div>
      </div>
    </div>
  );
};

ProgressIndicator.defaultProps = {
  color: "green",
};

export { ProgressIndicator };
