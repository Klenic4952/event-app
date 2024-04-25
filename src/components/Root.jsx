import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import ErrorBoundary from "./ErrorBoundary";

export const Root = () => {
  return (
    <ErrorBoundary>
      <Box backgroundColor="#314447" maxWidth="100vw" minHeight="100vh">
        <Navigation />
        <Outlet />
      </Box>
    </ErrorBoundary>
  );
};
