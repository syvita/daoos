import React, { useState } from "react";
import { Layout } from "../components/MvLayout";
import MemberLists from "../components/MvMemberLists";
import MvProfileDetail from "../components/MvProfileDetail";
import { SlideOver } from "../components/MvSlideOver";

export default function Members() {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };

  const [profileId, setId] = useState<string>(null);

  const showDetail = (id: string) => {
    setShow(false);
    setId(id);
    setShow(true);
  };
  return (
    <Layout title="Members">
      <MemberLists  onMemberSelect={showDetail} />
      <SlideOver onClose={onClose} show={show} title={"Profile"}>
        {<MvProfileDetail  id={profileId} />}
      </SlideOver>
    </Layout>
  );
}
