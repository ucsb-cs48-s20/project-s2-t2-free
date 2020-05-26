import React from "react";
import { text } from "@storybook/addon-knobs";
import AppNavbar from "../components/AppNavbar";

export default {
  title: "AppNavbar",
  component: AppNavbar,
};

export const loggedOut = () => {
  return <AppNavbar />;
};

export const loggedIn = () => {
  const name = text("Name", "Phill Conrad");
  const user = { name };
  return <AppNavbar user={user} />;
};
