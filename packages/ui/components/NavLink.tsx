import React from "react";
import Link from "next/link";

import styles from "./NavLink.module.css";

interface NavLinkProps {
  icon: React.ReactElement;
  href: string;
  children: React.ReactNode;
}

function NavLink({ icon, href, children }: NavLinkProps) {
  return (
    <div className={styles.subNavDiv}>
      <Link href={href}>
        <a className={styles.navLink}>
          {icon}
          {children}
        </a>
      </Link>
    </div>
  );
}

export default NavLink;
