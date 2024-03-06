import React from "react";
import {
  Box,
  Card,
  CardBody,
  Container,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  return (
    <Container padding="0px" ml="auto" mr="auto">
      <Heading align="center" color="white" mt="20px" mb="60px">
        {event.title}
      </Heading>
      <Card
        size="lg"
        bgColor="white"
        direction={{ base: "column", sm: "row" }}
        variant="outline"
      >
        <Image
          h="400px"
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={event.image}
        />

        <CardBody>
          <Text
            mt="10px"
            fontSize="18px"
            fontStyle="italic"
            fontWeight="semibold"
          >
            {event.description}
          </Text>
        </CardBody>
      </Card>
    </Container>
  );
};
