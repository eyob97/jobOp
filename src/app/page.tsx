import dynamic from "next/dynamic";
import React from "react";

const ClientHome = dynamic(() => import("./components/ClientHome"), {
  ssr: false, 
  loading: () => <p>Loading...</p>, 
});

export default function Home() {
  return <ClientHome />;
}
