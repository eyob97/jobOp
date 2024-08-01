import dynamic from "next/dynamic";
import withAuth from "../components/withAuth";

const DashboardComponent = dynamic(() => import("../components/Dashboard"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardComponent />;
}
