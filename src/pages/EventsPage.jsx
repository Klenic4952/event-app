import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { SearchFilter } from "../components/SearchFilter";

//Display events
export const loader = async () => {
  const events = await fetch("https://my-json-server.typicode.com/Klenic4952/event-app/events");
  const categories = await fetch("https://my-json-server.typicode.com/Klenic4952/event-app/categories");

  // check if request was succesful
  if (!events.ok) {
    throw Error("There are no events found")
  }

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <>
      <Heading align="center" mt="20px" mb="60px" fontSize="5xl" color="white">
        Events
      </Heading>
      <SearchFilter events={events} categories={categories}></SearchFilter>
    </>
  );
};
