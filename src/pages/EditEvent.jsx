import { Center, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormEvent } from "../components/FormEvent";

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

export const EditEvent = () => {
  // load data from the back-end
  const { event, categories, users } = useLoaderData();

  // use react-hook-form
  const {
    register,
    handleSubmit,
    setError,
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

        // check if request was succesful
        if (!response.ok) {
          throw new Error(
            `Failed to fetch event details: ${response.status} ${response.statusText}`
          );
        }
        const eventData = await response.json();

        // format dates to match "yyyy-MM-ddThh:mm" format
        const formattedStartTime = new Date(eventData.startTime)
          .toISOString()
          .slice(0, 16);
        const formattedEndTime = new Date(eventData.endTime)
          .toISOString()
          .slice(0, 16);

        // set form values with fetched data
        setValue("title", eventData.title);
        setValue("description", eventData.description);
        setValue("image", eventData.image);
        setValue("location", eventData.location);
        setValue("startTime", formattedStartTime);
        setValue("endTime", formattedEndTime);
        setValue("categoryIds", eventData.categoryIds);
        setValue("createdBy", eventData.createdBy);
      } catch (error) {
        // handle any errors that might occur during this process
        setError("root", {
          message: "Fetching data event failed. Try again later",
        });
      }
    };
    fetchData();
  }, [event.id, setValue]);

  // set up useNavigate hook
  const navigate = useNavigate();

  // pop-up message hook
  const toast = useToast();

  // define function to edit event
  const onSubmit = async (data) => {
    const { createdBy, categoryIds, ...otherFormData } = data;

    // ensure createdBy is a number
    const createdByNumber = parseInt(createdBy);

    // ensure categoryIds gets only updated if new values
    const categoryIdsSet = new Set(
      Array.isArray(categoryIds)
        ? categoryIds.map((id) => parseInt(id))
        : [parseInt(categoryIds)]
    );

    // convert Set back to an array
    const categoryIdsArray = Array.from(categoryIdsSet);

    const editEventData = {
      ...otherFormData,
      createdBy: createdByNumber,
      categoryIds: categoryIdsArray,
    };

    // update the event with data
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(editEventData),
        headers: { "Content-type": "application/json" },
      });

      // check if request was succesful and response to user
      if (!response.ok) {
        toast({
          title: "Event didn't update",
          description: "Something went wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Event updated",
          description: "We have successfully edited the event for you!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // use the navigate function to go to updated page
        navigate(`/event/${event.id}`);
      }
    } catch (error) {
      // handle any errors that might occur during this process
      setError("root", {
        message: "Updating event failed. Try again later",
      });
    }
  };

  return (
    <Center
      align="center"
      flexDirection="column"
      p="10px"
      pb="30px"
      color="whiteAlpha.800"
    >
      <FormEvent
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        categories={categories}
        users={users}
        event={event}
        isSubmitting={isSubmitting ? "Saving event..." : "Edit Event"}
      />
    </Center>
  );
};
