import React from "react";
import { Center} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Event } from "../components/Event";

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
    <Center
      maxWidth={{ base: "95vw", sm: "90vw", lg: "100vw" }}
      minHeight="100vh"
      padding="0px"
      ml="auto"
      mr="auto"
    >
      <Event event={event} categories={categories} users={users}></Event>
    </Center>
  );
};
