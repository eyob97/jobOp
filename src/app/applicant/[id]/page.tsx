import dynamic from "next/dynamic";

const ApplicantDetails = dynamic(
  () => import("../../components/JobSeeker/ApplicantDetails"),
  {
    ssr: false,
  }
);

export default function DashboardPage() {
  return <ApplicantDetails />;
}
