import React from "react";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Tag,
  Text,
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
    <Container maxW={{ base: "100%", lg: "85%" }}>
      <Heading align="center" mt="20px" mb="60px" fontSize="5xl" color="white">
        All events
      </Heading>
      <SimpleGrid spacing={10} minChildWidth={"250px"}>
        {events &&
          events.map((event) => (
            <Card
              key={event.id}
              maxW="sm"
              borderRadius="xl"
              cursor="pointer"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform .4s"
            >
              <Link to={`event/${event.id}`}>
                <CardBody padding="0" align="center">
                  <Image
                    h="225px"
                    w="full"
                    objectFit="cover"
                    borderTopRadius="xl"
                    src={event.image}
                  />
                  <Heading fontSize="28px" mt="10px" color="#803419">
                    {event.title}
                  </Heading>
                  <Text
                    mt="10px"
                    fontSize="18px"
                    fontStyle="italic"
                    fontWeight="semibold"
                  >
                    {event.description}
                  </Text>
                  <Flex flexDir="row" gap="1.5" justify="center" mt="5">
                    <Box>Start Time:</Box>
                    <Box fontWeight="semibold">
                      {event.startTime.substring(0, 10)}{" "}
                      {event.startTime.substring(11, 16)}
                    </Box>
                  </Flex>
                  <Flex flexDir="row" gap="1.5" justify="center">
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
              </Link>
            </Card>
          ))}
      </SimpleGrid>
    </Container>
  );
};
