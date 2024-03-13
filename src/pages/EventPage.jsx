import React from "react";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  Tag,
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
    <Container 
    maxWidth="100vh"
    minHeight="100vh"
    padding="0px"
    ml="auto"
    mr="auto">
      <Heading align="center" color="white" mt="20px" mb="60px">
        {event.title}
      </Heading>
      <Card
        //size="lg"
        w="700px"
        h="500px"
        bgColor="white"
        direction={{ base: "column", sm: "row" }}
        variant="outline"
      >
        <Image
          //h="400px"
          objectFit="cover"
          w="300px"
          //maxW={{ base: "100%", sm: "200px" }}
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
          <Flex flexDir="row" gap="1.5" mt="5">
                    <Box>Start Time:</Box>
                    <Box fontWeight="semibold">
                      {event.startTime.substring(0, 10)}{" "}
                      {event.startTime.substring(11, 16)}
                    </Box>
                  </Flex>
                  <Flex flexDir="row" gap="1.5">
                    <Box>End Time:</Box>
                    <Box fontWeight={"semibold"}>
                      {event.endTime.substring(0, 10)}{" "}
                      {event.endTime.substring(11, 16)}
                    </Box>
                  </Flex>
                  <Box mt="10px">
                    {categories.map((category) =>
                      event.categoryIds?.includes(category.id) ? (
                        <Tag
                          p="8px"
                          margin="1.5"
                          mb="5"
                          mt="5"
                          backgroundColor="#A5A726"
                          size="md"
                          variant="solid"
                          textTransform="uppercase"
                          fontWeight="bold"
                          key={category}
                        >
                          {category.name}
                        </Tag>
                      ) : null
                    )}
                  </Box>
        </CardBody>
      </Card>
    </Container>
  );
};
