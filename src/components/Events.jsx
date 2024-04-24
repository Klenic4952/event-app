import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Tag } from "../components/Tag";
import { Link } from "react-router-dom";

export const Events = ({ events, categories }) => {
  return (
    <SimpleGrid spacing={10} minChildWidth={"250px"} p="15px">
      {events &&
        events.map((event) => (
          <Card
            key={event.id}
            maxW="sm"
            borderRadius="xl"
            cursor="pointer"
            borderColor="#314447"
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
                <Box mt="5px">
                  {event.categoryIds.map((id) => (
                    <Tag key={id}>
                      {categories.find((category) => category.id === id)?.name}
                    </Tag>
                  ))}
                </Box>
              </CardBody>
            </Link>
          </Card>
        ))}
    </SimpleGrid>
  );
};

//Prop validation
Events.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};
