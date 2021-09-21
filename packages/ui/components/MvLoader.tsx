import React from "react";

const MvLoader: React.FC<{ isPage?: boolean }> = ({ isPage }) => {
  //ToDo create loading components for page and widget loader
  return isPage ? <div>...Loading</div> : <div>...Loading</div>;
};

export default MvLoader;
