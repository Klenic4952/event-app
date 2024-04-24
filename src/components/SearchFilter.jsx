import React, { useState } from "react";
import PropTypes from "prop-types";
import { Events } from "./Events";
import { Flex, FormLabel } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { SearchButton } from "./SearchButton";

export const SearchFilter = ({ events, categories }) => {
  // state for searchfield
  const [searchField, setSearchField] = useState("");

  // filter and event handler for searchbar and categories
  const matchedEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      event.categoryIds.includes(Number(searchField))
    );
  });

  // setting value for input
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Flex
        flexDirection="column"
        wrap="wrap"
        alignItems="center"
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
          <Flex
            display="flex"
            wrap="wrap"
            flexDirection="row"
            gap={5}
            justifyContent="center"
          >
            {categories.map(({ id }) => (
              <SearchButton key={id} value={id} onClick={handleChange}>
                {categories.find((category) => category.id === id)?.name}
              </SearchButton>
            ))}
            <SearchButton
              color="#314447"
              onClick={() => setSearchField("")}
            >
              {"All events"}
            </SearchButton>
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

// Prop validation
SearchFilter.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};
