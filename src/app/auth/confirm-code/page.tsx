import dynamic from "next/dynamic";

const ConfirmCode = dynamic(() => import('@/app/components/ConfirmCode'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const ConfirmCodePage = () => {
  return (
    <div>
      <ConfirmCode />
    </div>
  );
};

export default ConfirmCodePage;
