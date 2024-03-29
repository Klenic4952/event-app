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
} from "@chakra-ui/react";
import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const AddEvent = () => {
  const { categories, users } = useLoaderData();
  const { register, handleSubmit} = useForm();

const onSubmit = (data) => {
  console.log(data);
}

  const inputStyles = {
    bg: "whiteAlpha.700",
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
            {...register("title", {required: true})}
            type="text"
            placeholder="Title"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Description</FormLabel>
          <Input
            {...register("description", {required: true})}
            type="text"
            placeholder="Description"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Image</FormLabel>
          <Input
            {...register("image", {required: true})}
            type="url"
            placeholder="Url"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Location</FormLabel>
          <Input
            {...register("location", {required: true})}
            type="text"
            placeholder="Location"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Start time:</FormLabel>
          <Input
            {...register("startTime", {required: true})}
            type="datetime-local"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>End time</FormLabel>
          <Input
            {...register("endTime", {required: true})}
            type="datetime-local"
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>
            Categories:
            <Flex>
              {categories.map(({ name, id }) => (
                <FormLabel sx={labelStyles} key={id} mt="10px">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    {...register("categoryIds", {}, {required: true})}
                    type="checkbox"
                    id={id}
                    value={id}
                    mt="8px"
                    ml="10px"
                    mr="15px"
                    colorScheme="blackAlpha"                    
                  />
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>
            Created by:
            <Select
              {...register("createdBy", {required: true})}
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
          </FormLabel>
        </FormControl>
        <Button type="submit" size="lg" bgColor="#A5A726" mt="30px">
          Add Event
        </Button>
      </Form>
    </Box>
  );
};
