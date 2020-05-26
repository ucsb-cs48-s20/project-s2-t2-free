import React from "react";
import { select, text } from "@storybook/addon-knobs";
import GroupsTable from "../components/GroupsTable";

export default {
  title: "GroupsTable",
  component: GroupsTable,
};

export const noGroups = () => {
  return <GroupsTable />;
};
