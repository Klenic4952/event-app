import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";
import { FormButton } from "./FormButton";

export const FormEvent = ({
  handleSubmit,
  register,
  errors,
  categories,
  users,
  event,
  isSubmitting,
}) => {
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
    <Form onSubmit={handleSubmit}>
      <Heading color="#A5A726">Edit Event</Heading>
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
        <FormLabel sx={labelStyles}>Categories:</FormLabel>
        <Flex justifyContent="center" gap="20px">
          {categories.map(({ name, id }) => (
            <FormLabel
              fontSize={{ base: "15px", sm: "17px", lg: "18px" }}
              key={id}
              mt="10px"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
              <Checkbox
                {...register("categoryIds", { required: true })}
                type="checkbox"
                id={id}
                value={id}
                mt={{ base: "4px", sm: "6px", lg: "7px" }}
                ml="7px"
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
      </FormControl>

      <FormControl mt="15px">
        <FormLabel sx={labelStyles}>Created by:</FormLabel>
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
          <Text sx="inputStyles" mt="8px" color="red" fontSize="15px">
            Please select a user!
          </Text>
        )}
      </FormControl>
      <Flex as="nav" justifyContent="center" gap="15px">
        <FormButton disabled={isSubmitting}>{isSubmitting}</FormButton>
        <Link to={`/event/${event.id}`}>
          <FormButton _hover={{ bg: "#803419", color: "white" }}>
            Cancel Edit
          </FormButton>
        </Link>
      </Flex>
      {errors.root && (
        <Text mt="8px" color="red" fontSize="15px">
          {errors.root.message}
        </Text>
      )}
    </Form>
  );
};
