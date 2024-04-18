import { Input } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export const SearchBar = ({ onChange }) => {
  return (
    <Input
      backgroundColor="white"
      focusBorderColor="#38A169"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="10px"
      mb={{ base: "30px", md: "35px" }}
      ml="5px"
      width={{ base: "300px", sm: "350px", md: "400px" }}
      type="text"
      placeholder="Search here for events"
      fontSize="18px"
      onChange={onChange}
    />
  );
};

//Prop validation
SearchBar.propTypes = {
  onChange: PropTypes.func,
};
