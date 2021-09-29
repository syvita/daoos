import React from "react";

const MvLoader: React.FC<{ isPage?: boolean }> = ({ isPage }) => {
  //ToDo create loading components for page and widget loader
  return isPage ? (
    <span className=" flex justify-center items-center">
      <span className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></span>
    </span>
  ) : (
    <span className=" flex justify-center items-center">
      <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-purple-500"></span>
    </span>
  );
};

export default MvLoader;
