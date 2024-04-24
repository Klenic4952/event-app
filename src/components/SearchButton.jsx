import React from "react";
import { Button } from "@chakra-ui/react";

export const SearchButton = ({ children, ...props }) => {
  return (
    <Button
      variant="unstyled"
      w="120px"
      pl="10px"
      pr="10px"
      color="white"
      background="#A5A726"
      textTransform="uppercase"
      cursor="pointer"
      {...props}
    >
      {children}
    </Button>
  );
};
