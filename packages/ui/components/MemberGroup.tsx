import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Avatar, ListItemText, ListSubheader } from "@material-ui/core";
import Image from "next/image";

import styles from "./MemberGroup.module.css";

interface MemberGroupProps {
  groupName: string;
}

function MemberGroup({ groupName }: MemberGroupProps) {
  return (
    <List
      subheader={
        <ListSubheader className={styles.subheader}>{groupName}</ListSubheader>
      }
      className={styles.memberGroup}
    >
      <ListItem button>
        <Avatar>
          <Image src="/favicon.ico" alt="favicon" layout="fill" />
        </Avatar>
        <div className={styles.memberTextDiv}>
          <span className={styles.memberName}>Member Name</span>
          <span className={styles.roleText}>Frontend dev</span>
        </div>
      </ListItem>
      <ListItem button>
        <Avatar>
          <Image src="/favicon.ico" alt="favicon" layout="fill" />
        </Avatar>
        <div className={styles.memberTextDiv}>
          <span className={styles.memberName}>Member Name</span>
          <span className={styles.roleText}>Frontend dev</span>
        </div>
      </ListItem>
      <ListItem button>
        <Avatar>
          <Image src="/favicon.ico" alt="favicon" layout="fill" />
        </Avatar>
        <div className={styles.memberTextDiv}>
          <span className={styles.memberName}>Member Name</span>
          <span className={styles.roleText}>Frontend dev</span>
        </div>
      </ListItem>
      <ListItem button>
        <Avatar>
          <Image src="/favicon.ico" alt="favicon" layout="fill" />
        </Avatar>
        <div className={styles.memberTextDiv}>
          <span className={styles.memberName}>Member Name</span>
          <span className={styles.roleText}>Frontend dev</span>
        </div>
      </ListItem>
    </List>
  );
}

export default MemberGroup;
