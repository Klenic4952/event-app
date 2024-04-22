import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

  // loader function to get users and categories for the form
export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const AddEvent = () => {
  // load data from the back-end
  const { users, categories } = useLoaderData();

  // use react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // set up useNavigate hook
  const navigate = useNavigate();

  // pop-up message hook
  const toast = useToast();

  // define function to create an event
  const onSubmit = async (data) => {
    const { createdBy, categoryIds, ...otherFormData } = data;

    // ensure createdBy is a number
    const createdByNumber = parseInt(createdBy);

    // ensure categoryIds is an array of numbers
    const categoryIdsArray = Array.isArray(categoryIds)
      ? categoryIds.map((id) => parseInt(id))
      : [parseInt(categoryIds)];

    const eventData = {
      ...otherFormData,
      createdBy: createdByNumber,
      categoryIds: categoryIdsArray,
    };

    try {
      // send a request to the server to create a new event
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(eventData),
        headers: { "Content-type": "application/json" },
      });

       // get the new event's ID from the server's response
       const id = (await response.json()).id;

      // check if request was succesful
      if (!response.ok) {
        toast({
          title: "Adding the event wasn't successful",
          description: "Something went wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        if (response.ok) {
          toast({
            title: "Event added",
            description: "We have successfully created the event for you!",
            status: "success",
            duration: 10000,
            isClosable: true,
            position: "top",
          });
      }
      // use the navigate function to go to the new Event's page
      navigate(`/event/${id}`);
      }
    } catch (error) {
      // handle any errors that might occur during this process
      setError("root", {
        message: "Adding event failed. Try again later",
      });
    }
  };

  //styles for the labels and inputfields
  const inputStyles = {
    width: { base: "350px", sm: "450px", md: "500px", lg: "800px" },
    bg: "#e6edff",
    fontSize: { base: "14px", sm: "15px", lg: "16px" },
    fontWeight: "semibold",
    color: "#314447",
  };

  const labelStyles = {
    width: { base: "325px", sm: "425px", md: "475px", lg: "750px" },
    fontSize: { base: "15px", sm: "17px", lg: "18px" },
    mt: "25px",
  };

  return (
    <Box
      marginLeft="auto"
      marginRight="auto"
      width="500px"
      minHeight="130vh"
      color="whiteAlpha.800"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading color="#A5A726">Add new event</Heading>
        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Title</FormLabel>
          <Input
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.title && (
            <Text mt="8px" color="red">
              Please give a title to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Description</FormLabel>
          <Input
            {...register("description", { required: true })}
            type="text"
            placeholder="Description"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.description && (
            <Text mt="8px" color="red">
              Please give a short description to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Image</FormLabel>
          <Input
            {...register("image", { required: true })}
            type="url"
            placeholder="Url"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.image && (
            <Text mt="8px" color="red">
              Please add a valid image-url to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Location</FormLabel>
          <Input
            {...register("location", { required: true })}
            type="text"
            placeholder="Location"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.location && (
            <Text mt="8px" color="red">
              Please add the location to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Start time:</FormLabel>
          <Input
            {...register("startTime", { required: true })}
            type="datetime-local"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.startTime && (
            <Text mt="8px" color="red">
              Please add the date and start time to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>End time</FormLabel>
          <Input
            {...register("endTime", { required: true })}
            type="datetime-local"
            sx={inputStyles}
            focusBorderColor="white"
          />
          {errors.endTime && (
            <Text mt="8px" color="red">
              Please add the date and end time to the event!
            </Text>
          )}
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>
            Categories:
            <Flex>
              {categories.map(({ name, id }) => (
                <FormLabel sx={labelStyles} key={id} mt="10px">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    {...register("categoryIds", { required: true })}
                    type="checkbox"
                    id={id}
                    value={id}
                    mt="8px"
                    ml="10px"
                    mr="15px"
                    colorScheme="blackAlpha"
                  />
                  {errors.categoryIds && (
                    <Text mt="8px" color="red" fontSize="15px">
                      Please choose at least one categorie!
                    </Text>
                  )}
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>
            Created by:
            <Select
              placeholder="Select a user"
              color="#314447"
              {...register("createdBy", { required: "true" })}
              mt="15px"
              sx={inputStyles}
              focusBorderColor="white"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            {errors.createdBy && (
              <Text mt="8px" color="red" fontSize="15px">
                Please select a user!
              </Text>
            )}
          </FormLabel>
        </FormControl>
        <Button
          disabled={isSubmitting}
          type="submit"
          size="lg"
          bgColor="#A5A726"
          mt="30px"
        >
          {isSubmitting ? "Adding event..." : "Add Event"}
        </Button>
        {errors.root && (
          <Text mt="8px" color="red" fontSize="15px">
            {errors.root.message}
          </Text>
        )}
      </Form>
    </Box>
  );
};
