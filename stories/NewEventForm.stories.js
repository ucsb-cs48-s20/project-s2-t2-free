import React from "react";
import { select, text } from "@storybook/addon-knobs";
import NewEventForm from "../components/NewEventForm";

export default {
  title: "NewEventForm",
  component: NewEventForm,
};

export const neweventform = () => {
  return <NewEventForm />;
};
