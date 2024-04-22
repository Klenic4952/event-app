import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Tag } from "../components/Tag";
import { ButtonsEvent } from "./ButtonsEvent";

export const Event = ({ event, categories, users }) => {
  // match user with createdBy
  const userId = users.find((id) => id.id === event.createdBy);

  return (
    <Center display="flex" flexDir="column">
      <Heading align="center" color="white" mt="20px" mb="60px">
        {event.title}
      </Heading>
      <Card
        maxW="100%"
        h="auto"
        mb="20px"
        bgColor="white"
        direction={{ base: "column", sm: "row", md: "row" }}
        variant="outline"
      >
        <Image objectFit="cover" w="350px" maxW="100%" src={event.image} />
        <CardBody color="#314447">
          <Text
            mt="15px"
            fontSize={{ base: "20px", sm: "20px", md: "23px" }}
            fontStyle="italic"
            fontWeight="bold"
            color="#803419"
          >
            {event.description}
          </Text>
          <Flex
            flexDir="row"
            gap="1.5"
            mt="5"
            fontSize={{ base: "16px", sm: "17px", md: "19px" }}
          >
            <Box>Start Time:</Box>
            <Box fontWeight="semibold">
              {event.startTime.substring(0, 10)}{" "}
              {event.startTime.substring(11, 16)}
            </Box>
          </Flex>
          <Flex
            flexDir="row"
            gap="1.5"
            fontSize={{ base: "16px", sm: "17px", md: "19px" }}
          >
            <Box>End Time:</Box>
            <Box fontWeight={"semibold"}>
              {event.endTime.substring(0, 10)}{" "} 
              {event.endTime.substring(11, 16)}
            </Box>
          </Flex>
          <Flex display="flex" justify="center" mt="5px">
            {event.categoryIds.map((id) => (
              <Tag key={id}>
                {categories.find((category) => category.id === id)?.name}
              </Tag>
            ))}
          </Flex>
          <Divider borderColor="#314447" />
          <Box>
            <Text mt="15px" fontSize={{ base: "16px", md: "18px" }}>
              {"Created by:"}{" "}
            </Text>
            <Flex flexDir="column" align="center">
              <Image
                src={userId.image}
                alt={userId.name}
                boxSize={{ base: 90, md: 100, xl: 115 }}
                borderRadius="full"
              />
              <Text
                fontSize={{ base: "16px", md: "15px", lg: "18px" }}
                mt="10px"
                fontWeight="semibold"
                color="#803419"
                fontStyle="italic"
              >
                {userId.name}
              </Text>
            </Flex>
          </Box>
          <Divider mt="15px" borderColor="#314447" />
          <Flex mt="20px" justifyContent="space-evenly">
            <ButtonsEvent event={event} />
          </Flex>
        </CardBody>
      </Card>
    </Center>
  );
};

// prop validation
Event.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  users: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};
