import dynamic from "next/dynamic";

const ClientHome = dynamic(() => import("./components/ClientHome"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Home: React.FC = () => {
  return <ClientHome />;
};

export default Home;
