import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";

import styles from "./Drawer.module.css";
import NavLink from "./NavLink";

interface DrawerProps {
  innerRef?: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  expanded?: boolean;
  handleCloseClick?: () => void;
}

function Drawer({
  innerRef,
  className,
  expanded,
  handleCloseClick,
}: DrawerProps) {
  return (
    <div
      className={clsx(styles.mainNavDiv, className, {
        [styles.noWidth]: expanded,
      })}
      ref={innerRef}
    >
      <div className={styles.closeAndNavLinksDiv}>
        {expanded && (
          <CloseIcon className={styles.closeIcon} onClick={handleCloseClick} />
        )}
        <p
          className={clsx(styles.logoPlaceholder, {
            [styles.mobileLogo]: expanded,
          })}
        >
          daoOS (alpha)
        </p>
        <NavLink icon={<DashboardIcon className={styles.navIcon} />} href="/">
          Dashboard
        </NavLink>
        <NavLink
          icon={<PeopleIcon className={styles.navIcon} />}
          href="/members"
        >
          Members
        </NavLink>
        <NavLink
          icon={<AccountCircleIcon className={styles.navIcon} />}
          href="/profile"
        >
          Profile
        </NavLink>
        <NavLink
          icon={<ContactSupportIcon className={styles.navIcon} />}
          href="/faq"
        >
          FAQ & Help
        </NavLink>
        <NavLink
          icon={<ExitToAppIcon className={styles.navIcon} />}
          href="/logout"
        >
          Log out
        </NavLink>
      </div>
      <div className={styles.inviteRulesDiv}>
        <Button className={styles.inviteBtn}>Invite</Button>
        <Link href="/">
          <a className={styles.rules}>Rules and policy</a>
        </Link>
      </div>
    </div>
  );
}

export default Drawer;
