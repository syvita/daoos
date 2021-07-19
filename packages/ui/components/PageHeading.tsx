import React from "react";

import styles from "./PageHeading.module.css";

interface PageHeading {
  children: React.ReactNode;
}

function PageHeading({ children }: PageHeading) {
  return <span className={styles.pageHeading}>{children}</span>;
}

export default PageHeading;
