import React, { memo, useEffect, useState } from "react";
import { getMiaUsdValue } from "../../lib/utils";

import MvLoader from "../app/MvLoader";

const MvMiaWalletUsdVal: React.FC = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    (async () => {
      const result = await getMiaUsdValue();
      setValue(result);
    })();
  }, []);
  return value ? (
    <>
      <span>Raised: </span>{new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)}{" "}
    </>
  ) : (
    <MvLoader />
  );
};

export default memo(MvMiaWalletUsdVal);
