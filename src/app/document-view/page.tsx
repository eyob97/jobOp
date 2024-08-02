import dynamic from 'next/dynamic';

const DocumentView = dynamic(() => import('@/app/components/Letters/DocumentView'), {
  ssr: false, 
});

const Page: React.FC = () => {
  return <DocumentView />;
};

export default Page;
