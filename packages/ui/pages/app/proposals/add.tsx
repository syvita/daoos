import { useAtomValue } from "jotai/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import { Layout } from "../../../components/app/MvLayout";
import MvProfileInputForm from "../../../components/app/MvProfileInputForm";
import MvProposalInputForm from "../../../components/app/MvProposalInputForm";
import MvSectionHeader from "../../../components/app/MvSectionHeader";
import { useSlideOut } from "../../../lib/hooks/useSlideOut";
import { canPerformPostAtom, slideOutPanelAtom } from "../../../lib/store/ui";

export default function CreateProposal() {
  const canPost = useAtomValue(canPerformPostAtom);
  const { setPanel } = useSlideOut();
  useEffect(() => {
    if (!canPost) {
      setPanel({ show: true, component: MvProfileInputForm });
    }
  }, [canPost]);
  return (
    <Layout title="Submit a Proposal">
      <MvSectionHeader>
        <div></div>
        <div className="mt-3 sm:mt-0 ">
          <Link href="/app">
            <a
              href="#"
              className="inline-flex  items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to proposals
            </a>
          </Link>
        </div>
      </MvSectionHeader>
      <MvProposalInputForm />
    </Layout>
  );
}
