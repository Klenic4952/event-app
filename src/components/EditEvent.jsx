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
import React, { useEffect } from "react";
import { Form, useNavigate, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

// loader function to get event, categories and users for the form
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

export const EditEvent = ({ eventId }) => {
  // loader data from the back-end
  const { event, categories, users } = useLoaderData();

  // use react-hook-form
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors, isSubmitting },
    setValue, // function to set form values
  } = useForm();

  // fetch event data for form values
  useEffect(() => {
    const fetchData = async () => {
      // fetch event details
      try {
        const response = await fetch(
          `http://localhost:3000/events/${event.id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch event details: ${response.status} ${response.statusText}`
          );
        }
        const eventData = await response.json();
        //console.log(eventData);

        // Format dates to match "yyyy-MM-ddThh:mm" format
        const formattedStartTime = new Date(eventData.startTime)
          .toISOString()
          .slice(0, 16);
        const formattedEndTime = new Date(eventData.endTime)
          .toISOString()
          .slice(0, 16);

        // Fetch available categories
        const selectedCategories = eventData.categoryIds.map((id) => {
          return categories.find((category) => category.id === id);
        });
        // console.log(eventData.categoryIds)

        console.log(selectedCategories);

        // Set form values with fetched data
        setValue("title", eventData.title);
        setValue("description", eventData.description);
        setValue("image", eventData.image);
        setValue("location", eventData.location);
        setValue("startTime", formattedStartTime);
        setValue("endTime", formattedEndTime);
        setValue("categoryIds", selectedCategories);
        setValue("createdBy", eventData.createdBy);
      } catch (error) {
        console.error("Error fetching event data:", error);
        // Handle errors if needed (e.g., setError)
      }
    };
    fetchData();
  }, [eventId, setValue]);

  // set up useNavigate hook
  const navigate = useNavigate();

  // pop-up message hook
  const toast = useToast();

  //PUT request to the backend
  const onSubmit = async (data) => {
    // Handle form submission (e.g., update event data)
    console.log(data);
    // Make API call to update the event with data
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast({
          title: "Event didn't update",
          description: "Something went wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }

      toast({
        title: "Event updated",
        description: "We have successfully edited the event for you!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate(`/event/${event.id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const inputStyles = {
    bg: "#e6edff",
    fontSize: "17px",
    fontWeight: "semibold",
    color: "#314447",
  };

  const labelStyles = {
    fontSize: "20px",
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
