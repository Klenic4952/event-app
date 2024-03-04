import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box backgroundColor="blue.900" maxWidth="100vw" minHeight="100vh">
      <Navigation />
      <Outlet />
    </Box>
  );
};
