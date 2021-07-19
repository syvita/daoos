import React from "react";
import SearchIcon from "@material-ui/icons/Search";

import styles from "./Search.module.css";

function Search(props) {
  return (
    <div className={styles.relativeParent}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search members"
        className={styles.search}
      />
    </div>
  );
}

export default Search;
