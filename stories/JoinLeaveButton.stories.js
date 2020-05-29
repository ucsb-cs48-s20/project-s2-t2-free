import React from "react";
import { text } from "@storybook/addon-knobs";
import JoinLeaveButton from "../components/JoinLeaveButton";

export default {
  title: "JoinLeaveButton",
  component: JoinLeaveButton,
};

export const render = () => {
  return <JoinLeaveButton />;
};
