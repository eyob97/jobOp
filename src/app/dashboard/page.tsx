import dynamic from "next/dynamic";

const DashboardComponent = dynamic(() => import("../components/Dashboard"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardComponent />;
}
