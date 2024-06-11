import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import _ from "../../../../@lodash/@lodash";
import JwtSignUpVerificationTab from "./tabs/JwtSignUpVerificationTab";
import FirebaseSignUpTab from "./tabs/FirebaseSignUpTab";

const tabs = [
  {
    id: "jwt",
    title: "JWT",
    logo: "assets/images/logo/jwt.svg",
    logoClass: "h-40 p-4 bg-black rounded-12",
  },
  {
    id: "firebase",
    title: "Firebase",
    logo: "assets/images/logo/firebase.svg",
    logoClass: "h-40",
  },
];

/**
 * The sign up page.
 */
function SignUpVerificationPage() {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  function handleSelectTab(id: string) {
    setSelectedTabId(id);
  }

  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
      <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 min-h-full w-full rounded-0 px-16 py-32 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow muiltr-4a7uzt">
        <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
          <img
            className="w-48 sm:center"
            src="assets/images/logo/logo.svg"
            alt="logo"
          />
          <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
            Sign up verification
          </Typography>
          {selectedTabId === "jwt" && <JwtSignUpVerificationTab />}
        </div>
      </div>
    </div>
  );
}

export default SignUpVerificationPage;
