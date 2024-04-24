import { Center, useToast } from "@chakra-ui/react";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormEvent } from "./FormEvent";

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

  return (
    <Center align="center" p="10px" pb="30px" color="whiteAlpha.800">
      <FormEvent
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        categories={categories}
        users={users}
        isSubmitting={isSubmitting ? "Adding event..." : "Add Event"}
      />
    </Center>
  );
};
