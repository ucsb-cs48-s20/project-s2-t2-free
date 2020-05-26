import React from "react";
import { select, text } from "@storybook/addon-knobs";
import FindGroupForm from "../components/FindGroupForm";

export default {
  title: "FindGroupForm",
  component: FindGroupForm,
};

export const findgroupform = () => {
  return <FindGroupForm />;
};
