import React from "react";
import MembersFreeTime from "../components/MembersFreeTime";

export default {
  title: "MembersFreeTime",
  component: MembersFreeTime,
};

export const noMembers = () => {
  return <MembersFreeTime />;
};
