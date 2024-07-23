import { createAction, createReducer } from "@reduxjs/toolkit";

export const resetState = createAction("resetState");

const resetReducer = createReducer({}, (builder) => {
  builder.addCase(resetState, () => {
    return {};
  });
});

export default resetReducer;
