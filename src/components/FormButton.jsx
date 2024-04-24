import { Button } from "@chakra-ui/react";

export const FormButton = ({children, ...props}) => {
  return (
    <Button
      variant="unstyled"
      size={{ base: "md", lg: "lg" }}
      width="130px"
      fontSize="18px"
      type="submit"
      bg="#A5A726"
      mt="30px"
      {...props}
    >
        {children}
    </Button>
  );
};
