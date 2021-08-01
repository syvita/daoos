import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Avatar, Box, Button, ListSubheader } from "@material-ui/core";

import styles from "./MemberGroup.module.css";
import clsx from "clsx";

interface MemberGroupProps {
  groupName: string;
  isMobile: boolean;
}

// This is hardcoded data that will instead be populated by gaia later
function MemberGroup({ groupName, isMobile }: MemberGroupProps) {
  return (
    <div
      className={clsx({
        [styles.groupLayout]: !isMobile,
        [styles.groupLayoutMobile]: isMobile,
      })}
    >
      <List
        subheader={
          <ListSubheader className={styles.subheader}>
            {groupName}
          </ListSubheader>
        }
        className={styles.memberGroup}
      >
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Frontend dev</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Architect</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Founder</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/5.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/6.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/7.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/8.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/9.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
        <ListItem button>
          <Avatar src="https://material-ui.com/static/images/avatar/10.jpg" />
          <div className={styles.memberTextDiv}>
            <span className={styles.memberName}>Member Name</span>
            <span className={styles.roleText}>Designer</span>
          </div>
        </ListItem>
      </List>

      <Button className={styles.moreBtn}>Show More</Button>
    </div>
  );
}

export default MemberGroup;
