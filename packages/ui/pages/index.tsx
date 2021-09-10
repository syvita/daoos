import Head from "next/head";
import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Layout } from "../components/Layout";
import { SlideOver } from "../components/SlideOver";
export default function Home() {
  const [show, setShow] = useState(false);
  const onClose = () => {
    setShow(false);
  };
  const showDetail=(id:string)=>{
    setShow(true)
  }

  return (
    <Layout title="Dashboard">
      <Dashboard onShowDetail={showDetail} />
      <SlideOver onClose={onClose} show={show} title={"Proposal"}></SlideOver>
    </Layout>
  );
}
