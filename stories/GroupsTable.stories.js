import React from "react";
import GroupsTable from "../components/GroupsTable";

export default {
  title: "GroupsTable",
  component: GroupsTable,
};

export const noGroups = () => {
  return <GroupsTable />;
};
