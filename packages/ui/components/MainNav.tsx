import React from "react";

import styles from "./MainNav.module.css";
import Drawer from "./Drawer";
import { userSession } from "./auth";

interface MainNavProps {
  children: React.ReactNode;
  className?: string;
}

function MainNav({ children, className }: MainNavProps) {

  const handleLogout = () => {
    // Sign the user out
    userSession.signUserOut();

    // TODO: Redirect the user to the home/landing page
    window.location.href = "/login";
  }

  return (
    <div className={styles.contentContainer}>
      {/* Need to provide closeDrawer since it's a required prop for nested components
       even though it's not used in our destkop nav. This way we avoid adding conditional
       logic to the NavLink component*/}
      <Drawer
        className={className}
        closeDrawer={() => {}}
        handleLogout={handleLogout}
      />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

export default MainNav;
