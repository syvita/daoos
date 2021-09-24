import React from "react";
import MvFaqs from "../../components/app/MvFaqs";

import { FAQs } from "../../content";
import { Layout } from "../../components/app/MvLayout";
export default function faqs() {
  return (
    <Layout>
      <MvFaqs faqs={FAQs} />
    </Layout>
  );
}
