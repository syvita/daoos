import React from "react";
import Link from "next/link";

import styles from "./NavLink.module.css";

interface NavLinkProps {
  icon: React.ReactElement;
  href: string;
  closeDrawer: () => void;
  handleLogout?: () => void;
  children: React.ReactNode;
}

function NavLink({ icon, href, closeDrawer, handleLogout, children }: NavLinkProps) {

  const handleClick = () => {
    closeDrawer();

    // If the handleLogout function is passed then call it
    if(handleLogout)
      handleLogout();
  }

  return (
    <div className={styles.subNavDiv}>
      <Link href={href}>
        <a className={styles.navLink} onClick={handleClick}>
          {icon}
          {children}
        </a>
      </Link>
    </div>
  );
}

export default NavLink;
