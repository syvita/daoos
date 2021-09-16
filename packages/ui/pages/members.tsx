import React, { useState } from "react";
import { Layout } from "../components/MvLayout";
import MemberLists from "../components/MvMemberLists";
import { SlideOver } from "../components/MvSlideOver";

export default function Members() {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };

  const [proposalId, setId] = useState<string>(null);

  const showDetail = (id: string) => {
    setShow(false);
    setId(id);
    setShow(true);
  };
  return (
    <Layout title="Members">
      <MemberLists />
      <SlideOver onClose={onClose} show={show} title={"Profile"}></SlideOver>
    </Layout>
  );
}
