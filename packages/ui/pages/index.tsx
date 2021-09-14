import Head from "next/head";
import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Layout } from "../components/Layout";
import { ProposalDetail } from "../components/ProposalDetail";
import { SlideOver } from "../components/SlideOver";
export default function Home() {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };

  const [proposalId,setId] = useState<string>(null)

  const showDetail=(id:string)=>{
    setShow(false)
    setId(id)
    setShow(true)
  }

  return (
    <Layout title="Dashboard">
      <Dashboard onShowDetail={showDetail} />
      <SlideOver onClose={onClose} show={show} title={"Proposal"}>
        <ProposalDetail id={proposalId} />
      </SlideOver>
    </Layout>
  );
}
