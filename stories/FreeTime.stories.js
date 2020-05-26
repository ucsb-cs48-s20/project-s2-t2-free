import React from "react";
import FreeTime from "../components/FreeTime";

export default {
  title: "FreeTime",
  component: FreeTime,
};

export const noEvents = () => {
  return <FreeTime />;
};
