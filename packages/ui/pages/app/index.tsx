import { useState } from "react";
import { Dashboard } from "../../components/app/MvDashboard";
import { Layout } from "../../components/app/MvLayout";
export default function Home() {
  return (
    <Layout title="Dashboard">
      <Dashboard />
    </Layout>
  );
}
