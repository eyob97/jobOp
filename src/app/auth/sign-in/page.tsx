import { Suspense } from "react";
import SignIn from "@/app/components/SignIn";

const SignInPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
