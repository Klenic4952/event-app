import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";

export const LoaderErrors = () => {
  const error = useRouteError();

  return (
    <Center color="white" flexDirection="column">
      <Heading mt="20">Error</Heading>
      <Text mt="20" mb="20" fontStyle="italic" fontSize="25">{error.message}</Text>
      <Link to="/">
        <Button variant="ghost" size="lg" leftIcon={<ChevronLeftIcon/>}_hover="none" >Back to events</Button>
      </Link>
    </Center>
  );
};
