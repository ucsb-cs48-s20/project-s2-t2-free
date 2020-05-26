import React from "react";
import { select, text } from "@storybook/addon-knobs";
import ScheduleTable from "../components/ScheduleTable";

export default {
  title: "ScheduleTable",
  component: ScheduleTable,
};

export const noEvents = () => {
  return <ScheduleTable />;
};
