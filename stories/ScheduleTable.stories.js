import React from "react";
import ScheduleTable from "../components/ScheduleTable";

export default {
  title: "ScheduleTable",
  component: ScheduleTable,
};

export const noEvents = () => {
  return <ScheduleTable />;
};
