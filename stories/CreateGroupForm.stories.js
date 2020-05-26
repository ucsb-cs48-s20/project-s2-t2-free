import React from "react";
import { select, text } from "@storybook/addon-knobs";
import CreateGroupForm from "../components/CreateGroupForm";

export default {
  title: "CreateGroupForm",
  component: CreateGroupForm,
};

export const creategroup = () => {
  return <CreateGroupForm />;
};
