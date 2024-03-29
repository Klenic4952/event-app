import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";



export const Navigation = () => {

  return (
    <Flex
      as="nav"
      gap="10px"
      justifyContent="flex-end"
      color="white"
      fontSize="22px"
      p="15px"
    >
      <Box>
        <Link to="/">
          <Button variant="ghost" size="lg" leftIcon={<ChevronLeftIcon/>}_hover="none">Events</Button>
        </Link>
      </Box>
      <Box>
        <Link to="/addevent">
          <Button variant="ghost" size="lg" leftIcon={<AddIcon boxSize="12px"/>} _hover={{ bg: "white", color: "#314447" }} >
            Event
          </Button>
        </Link>
        
    
      </Box>
    </Flex>
  );
};
