import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex as="nav" gap="10px" justifyContent={"flex-end"} color="white">
      <Box>
        <Link to="/">Events</Link>
      </Box>
      <Box>
        <Link to="/event/1">Event</Link>
      </Box>
    </Flex>
  );
};
