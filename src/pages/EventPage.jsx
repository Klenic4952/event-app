import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  useToast
} from "@chakra-ui/react";
import { Tag } from "../components/Tag";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";

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

  // set up useNavigate hook
  const navigate = useNavigate();

  // pop-up message hook
  const toast = useToast();

  //Delete request
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/events/` + event.id, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Delete event",
        description: "We have successfully deleted the event!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } else {
      toast({
        title: "Event wasn't deleted",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // match user with createdBy
  const userId = users.find((id) => id.id === event.createdBy);

  return (
    <Container
      maxWidth="100vh"
      minHeight="100vh"
      padding="0px"
      ml="auto"
      mr="auto"
    >
      <Heading align="center" color="white" mt="20px" mb="60px">
        {event.title}
      </Heading>
      <Card
        w="750px"
        h="500px"
        bgColor="white"
        direction={{ base: "column", sm: "row" }}
        variant="outline"
      >
        <Image
          objectFit="cover"
          w="350px"
          //maxW={{ base: "100%", sm: "200px" }}
          src={event.image}
        />
        <CardBody color="#314447">
          <Text
            mt="15px"
            fontSize="20px"
            fontStyle="italic"
            fontWeight="bold"
            color="#803419"
          >
            {event.description}
          </Text>
          <Flex flexDir="row" gap="1.5" mt="5" fontSize="17px">
            <Box>Start Time:</Box>
            <Box fontWeight="semibold">
              {event.startTime.substring(0, 10)}{" "}
              {event.startTime.substring(11, 16)}
            </Box>
          </Flex>
          <Flex flexDir="row" gap="1.5" fontSize="17px">
            <Box>End Time:</Box>
            <Box fontWeight={"semibold"}>
              {event.endTime.substring(0, 10)} {event.endTime.substring(11, 16)}
            </Box>
          </Flex>
          <Box mt="5px">
            {event.categoryIds.map((id) => (
              <Tag key={id}>
                {categories.find((category) => category.id === id)?.name}
              </Tag>
            ))}
          </Box>
          <Divider borderColor="#314447" />
          <Box>
            <Text
              mt="15px"
              //fontWeight="semibold"
              fontSize="17px"
            >
              {"Created by:"}{" "}
            </Text>
            <Flex flexDir="column" align="center">
              <Image
                src={userId.image}
                alt={userId.name}
                boxSize={{ base: 85, md: 100, xl: 115 }}
                borderRadius="full"
              />
              <Text
                fontSize={{ base: "10px", md: "15px", xl: "17px" }}
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
            <Link to={`/event/${event.id}/editevent`}>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<EditIcon />}
                _hover={{ bg: "#A5A726", color: "white" }}
              >
                Event
              </Button>
            </Link>
            <Button
              onClick={handleDelete}
              size="sm"
              variant="ghost"
              leftIcon={<DeleteIcon />}
              _hover={{ bg: "#803419", color: "white" }}
            >
              Event
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};
