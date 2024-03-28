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
import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

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
      <Form method="post">
        <Heading>Add new event</Heading>
        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Title</FormLabel>
          <Input
            placeholder="Title"
            type="text"
            required
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Description</FormLabel>
          <Input
            placeholder="Description"
            type="text"
            required
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Image</FormLabel>
          <Input
            placeholder="Url"
            type="url"
            required
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Location</FormLabel>
          <Input
            placeholder="Location"
            type="text"
            required
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>Start time:</FormLabel>
          <Input
            type="datetime-local"
            required
            sx={inputStyles}
            focusBorderColor="white"
          />
        </FormControl>

        <FormControl mt="15px">
          <FormLabel sx={labelStyles}>End time</FormLabel>
          <Input
            type="datetime-local"
            required
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
                    type="checkbox"
                    id={id}
                    value={id}
                    mt="8px"
                    ml="10px"
                    mr="15px"
                    colorScheme="blackAlpha"
                    //{...register("categoryIds", {})}
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
              mt="15px"
              sx={inputStyles}
              focusBorderColor="white"
              //{...register("createdBy")}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormLabel>
        </FormControl>
        <Button size="lg" bgColor="#A5A726" mt="30px">Add Event</Button>
      </Form>
    </Box>
  );
};
