"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Flowbite } from "flowbite-react";
import { flowbiteTheme } from "../theme";
import InitializeUser from "../redux/initialUser";
import { store } from "../redux/store";

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <Flowbite theme={{ theme: flowbiteTheme }}>
        <InitializeUser />
        {children}
      </Flowbite>
    </Provider>
  );
};

export default ClientWrapper;
