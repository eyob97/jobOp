import dynamic from "next/dynamic";

const EnterCodePage = dynamic(() => import('@/app/components/EnterCode'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const EnterCodePageWrapper = () => {
  return (
    <div>
      <EnterCodePage />
    </div>
  );
};

export default EnterCodePageWrapper;
