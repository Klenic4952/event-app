import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center color="white" flexDirection="column">
          <Heading mt="20">Error</Heading>
          <Text mt="20" mb="20" fontStyle="italic" fontSize="25">
            {"Something went wrong"}
          </Text>
          <Link to="/">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<ChevronLeftIcon />}
              _hover="none"
            >
              Back to events
            </Button>
          </Link>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
