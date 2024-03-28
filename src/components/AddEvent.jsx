import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";

export const AddEvent = () => {
  return (
    <Center>
      <Form>
        <Heading>Add new event</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Title" type="text" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Description" type="text" />
        </FormControl>

        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input type="url" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Location</FormLabel>
          <Input placeholder="Location" type="text" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Start time:</FormLabel>
          <Input type="datetime-local" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>End time</FormLabel>
          <Input type="datetime-local" />
        </FormControl>
      </Form>
    </Center>
  );
};
