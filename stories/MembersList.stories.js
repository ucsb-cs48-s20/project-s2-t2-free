import React from "react";
import { text } from "@storybook/addon-knobs";
import MembersList from "../components/MembersList";

export default {
  title: "MembersList",
  component: MembersList,
};

export const noMembers = () => {
  return <MembersList />;
};
