import React from "react";
import { select, text } from "@storybook/addon-knobs";
import FreeTime from "../components/FreeTime";

export default {
  title: "FreeTime",
  component: FreeTime,
};

export const noEvents = () => {
  return <FreeTime />;
};
