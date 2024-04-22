import { Input } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export const SearchBar = ({ onChange }) => {
  return (
    <Input
      backgroundColor="white"
      focusBorderColor="white"
      display="flex"
      p="10px"
      mb={{ base: "30px", md: "35px" }}
      width={{ base: "300px", sm: "350px", md: "400px" }}
      type="text"
      placeholder="Search for events"
      fontSize="18px"
      onChange={onChange}
    />
  );
};

//Prop validation
SearchBar.propTypes = {
  onChange: PropTypes.func,
};
