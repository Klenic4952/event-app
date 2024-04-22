import { Tag as CTag } from "@chakra-ui/react";

export const Tag = ({ children, ...props }) => {
  return (
    <CTag
      p="8px"
      margin="1.5"
      mb="5"
      mt="5"
      backgroundColor="#A5A726"
      size={{base: "md", md: "lg"}}
      variant="solid"
      textTransform="uppercase"
      fontWeight="bold"
      {...props}
    >
      {children}
    </CTag>
  );
};
