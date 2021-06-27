import React from "react";

import styles from "./MainNav.module.css";
import Drawer from "./Drawer";

interface MainNavProps {
  children: React.ReactNode;
  className?: string;
}

function MainNav({ children, className }: MainNavProps) {
  return (
    <div className={styles.contentContainer}>
      <Drawer className={className} />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

export default MainNav;
