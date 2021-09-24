import { useState } from "react";
import { Dashboard } from "../../components/app/MvDashboard";
import { Layout } from "../../components/app/MvLayout";
import { ProposalDetail } from "../../components/app/MvProposalDetail";
import { SlideOver } from "../../components/app/MvSlideOver";
export default function Home() {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };

  const [proposalId, setId] = useState<string>(null);

  const showDetail = (id: string) => {
    setId(id);
    setShow(true);
  };

  return (
    <Layout title="Dashboard">
      <Dashboard onShowDetail={showDetail} />
      <SlideOver onClose={onClose} show={show} title={"Proposal"}>
        <ProposalDetail id={proposalId} />
      </SlideOver>
    </Layout>
  );
}
