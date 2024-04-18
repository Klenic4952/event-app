import React, { useState } from "react";
import PropTypes from "prop-types";
import { Events } from "./Events";
import { Flex, FormLabel } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { ButtonFilter } from "./ButtonFilter";

export const SearchFilter = ({ events, categories }) => {
  //State for the searchfield
  const [searchField, setSearchField] = useState("");

  // Filter function and event handler for the searchbar and categories filter
  const matchedEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      event.categoryIds.includes(Number(searchField))
    );
  });

  // Setting value for the input
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Flex
        flexDirection="column"
        wrap="wrap"
        alignItems="center"
        justify="center"
      >
        <SearchBar onChange={handleChange} />
        <FormLabel
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ base: "60px" }}
          rowGap={4}
          color="white"
          fontSize={{ base: "25px", sm: "23px" }}
        >
          Filter on category
          <Flex display="flex" flexDirection="row" columnGap={5}>
            {categories.map(({ id }) => (
              <ButtonFilter key={id} value={id} onClick={handleChange}>
                {categories.find((category) => category.id === id)?.name}
              </ButtonFilter>
            ))}
            <ButtonFilter
              color="#314447"
              ml="30px"
              onClick={() => setSearchField("")}
            >
              {"All events"}
            </ButtonFilter>
          </Flex>
        </FormLabel>
      </Flex>
      {searchField ? (
        <Events events={matchedEvents} categories={categories} />
      ) : (
        <Events events={events} categories={categories} />
      )}
    </>
  );
};

//Prop validation
SearchFilter.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
};
