import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Events } from "../components/Events";

//Display events
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <Container maxW={{ base: "100%", lg: "85%" }}>
      <Heading align="center" mt="20px" mb="60px" fontSize="5xl" color="white">
        All events
      </Heading>
      <Events events={events} categories={categories} />
    </Container>
  );
};
