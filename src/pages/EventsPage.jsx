import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";

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
    <>
      <Heading>List of events</Heading>
      <SimpleGrid spacing={10} minChildWidth={"300px"}>
        {events &&
          events.map((event) => (
            <Card key={event.id}>
              <Link to={`event/${event.id}`}>
                <CardHeader>{event.title}</CardHeader>
              </Link>
              <CardBody>
                <p>Description {event.description}</p>
                <p>{event.image}</p>
                <p>
                  Starttime: {event.startTime}
                  Endtime: {event.endTime}
                </p>
                Categories:{" "}
                {categories.map((category) =>
                  event.categoryIds?.includes(category.id) ? (
                    <>{category.name}</>
                  ) : null
                )}
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};
