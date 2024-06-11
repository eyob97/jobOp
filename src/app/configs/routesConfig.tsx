import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import { FuseRouteConfigsType, FuseRoutesType } from "@fuse/utils/FuseUtils";
import SignInConfig from "../main/ui/sign-in/SignInConfig";
import SignUpConfig from "../main/ui/sign-up/SignUpConfig";
import SignOutConfig from "../main/ui/sign-out/SignOutConfig";
import Error404Page from "../main/ui/404/Error404Page";
import ExampleConfig from "../main/ui/example/ExampleConfig";
import SignUpVerificationConfig from "../main/ui/sign-up-verification/SignUpVerificationConfig";
import JobConfig from "../main/ui/job-page/JobConfig";

const routeConfigs: FuseRouteConfigsType = [
  ExampleConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  SignUpVerificationConfig,
  JobConfig,
];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/ui/",
    element: <Navigate to="job" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
