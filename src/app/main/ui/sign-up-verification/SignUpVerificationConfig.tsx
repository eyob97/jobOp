import { FuseRouteConfigType } from "@fuse/utils/FuseUtils";
import SignUpVerificationPage from "./SignUpVerification";
import authRoles from "../../../auth/authRoles";

const SignUpVerificationConfig: FuseRouteConfigType = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/ui/sign-up-verification",
      element: <SignUpVerificationPage />,
    },
  ],
};

export default SignUpVerificationConfig;
