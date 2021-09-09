import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useClickAway } from "react-use";

import styles from "./MainNavMobile.module.css";
import transitionStyles from "./transitions.module.css";
import Drawer from "./Drawer";
import { useRef } from "react";
import { userSession } from "./auth";

interface MainNavMobileProps {
  children: React.ReactNode;
}

function MainNavMobile({ children }: MainNavMobileProps) {
  const [expanded, setExpanded] = useState(false);

  const closeDrawer = (): void => {
    if (expanded) {
      setExpanded(false);
    }
  };

  const handleLogout = () => {
    // Sign the user out
    userSession.signUserOut();

    // TODO: Redirect the user to the home/landing page
    window.location.href = "/login";
  }

  const ref = useRef(null);
  useClickAway(ref, () => {
    setExpanded(false);
  });

  return (
    <div className={styles.mobileDiv}>
      {!expanded && (
        <MenuIcon
          className={styles.hamburger}
          onClick={() => setExpanded(true)}
        />
      )}
      <main className={styles.main}>{children}</main>
      <CSSTransition
        in={expanded}
        timeout={200}
        classNames={{
          enterActive: transitionStyles.myNodeEnterActive,
          enterDone: transitionStyles.myNodeEnter,
          exitActive: transitionStyles.myNodeExitActive,
          exitDone: transitionStyles.myNodeExit,
        }}
        unmountOnExit
      >
        {/**
         * This approach to animation with CSSTransition is a bit hacky
         * due to enabling classes in Drawer by passing the 'expanded' prop.
         * This will set the Drawer with an initial size that the classes
         * in transitions.module.css will override to trigger the transition.
         * It's not intuitive at all, but it works. I wasn't able to achieve
         * correct animation when I tried following docs and examples so
         * this is the approach that worked for me. Potential future refactoring
         * candidate.
         */}
        <Drawer
          innerRef={ref}
          className={styles.mobileDrawer}
          expanded={expanded}
          handleCloseClick={() => setExpanded(false)}
          closeDrawer={closeDrawer}
        />
      </CSSTransition>
    </div>
  );
}

export default MainNavMobile;
