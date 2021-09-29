import React, { useEffect, useState } from "react";
import MvLoader from "../app/MvLoader";

const MvClientOnly = ({ children }) => {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    setCanRender(true);
    return () => {
      //setCanRender(false);
    };
  }, [canRender]);
  return canRender ? children : <MvLoader />;
};

export default MvClientOnly;
