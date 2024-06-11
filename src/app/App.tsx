import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache, { Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import MockAdapterProvider from "@mock-api/MockAdapterProvider";
import withAppProviders from "./withAppProviders";
import { AuthRouteProvider } from "./auth/AuthRouteProvider";

import axios from "axios";
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "https://jobop.co.za/";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:3000/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length";

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

/**
 * The main App component.
 */
function App() {
  /**
   * The language direction from the Redux store.
   */
  const langDirection = useSelector(selectCurrentLanguageDirection);

  /**
   * The main theme from the Redux store.
   */
  const mainTheme = useSelector(selectMainTheme);

  return (
    <MockAdapterProvider>
      <CacheProvider
        value={createCache(emotionCacheOptions[langDirection] as Options)}
      >
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthRouteProvider>
            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              classes={{
                containerRoot:
                  "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
              }}
            >
              <FuseLayout layouts={themeLayouts} />
            </SnackbarProvider>
          </AuthRouteProvider>
        </FuseTheme>
      </CacheProvider>
    </MockAdapterProvider>
  );
}

export default withAppProviders(App);
