import dynamic from "next/dynamic";

const CompleteSignUp = dynamic(() => import('@/app/components/CompleteSignUp'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const CompleteSignUpPage = () => {
  return (
    <div>
      <CompleteSignUp />
    </div>
  );
};

export default CompleteSignUpPage;
