import Link from "next/link";
import React from "react";
import { Layout } from "../../../components/app/MvLayout";
import MvProposalInputForm from "../../../components/app/MvProposalInputForm";
import MvSectionHeader from "../../../components/app/MvSectionHeader";

export default function CreateProposal() {
  return (
    <Layout title="Submit a Proposal">
      <MvSectionHeader>
        <div></div>
        <div className="mt-3 sm:mt-0 ">
          <Link href="/app">
            <a href='#' className="inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Return to proposals
            </a>
          </Link>
        </div>
      </MvSectionHeader>
      <MvProposalInputForm />
    </Layout>
  );
}
