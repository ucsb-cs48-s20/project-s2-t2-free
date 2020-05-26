import React from "react";
import { select, text } from "@storybook/addon-knobs";
import MembersFreeTime from "../components/MembersFreeTime";

export default {
  title: "MembersFreeTime",
  component: MembersFreeTime,
};

export const noMembers = () => {
  return <MembersFreeTime />;
};
