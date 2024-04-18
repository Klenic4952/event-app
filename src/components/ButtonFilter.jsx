import React from "react";
import { Button } from "@chakra-ui/react";

export const ButtonFilter = ({ children, ...props }) => {
  return (
    <Button
      variant={"unstyled"}
      w="auto"
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
