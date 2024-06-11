import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "jobPage", en);
i18next.addResourceBundle("tr", "jobPage", tr);
i18next.addResourceBundle("ar", "jobPage", ar);

const Job = lazy(() => import("./Job"));

/**
 * The Example page config.
 */
const JobConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/ui/job",
      element: <Job />,
    },
  ],
};

export default JobConfig;
