import dynamic from "next/dynamic";
import { Suspense } from "react";

const ConfirmCode = dynamic(() => import('@/app/components/ConfirmCode'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const ConfirmCodePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmCode />
    </Suspense>
  );
};

export default ConfirmCodePage;
