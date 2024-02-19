import React from 'react';
import { Heading } from '@chakra-ui/react';
import { Link, useLoaderData } from 'react-router-dom';

//Display events
export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  

  return { 
    events: await events.json(), 
    categories: await categories.json()
  };
};

export const EventsPage = () => {
  const {events, categories} = useLoaderData()
  

  const categoryId = categories.map((category) => {
    return category.id
  })

console.log (categoryId)

  return (
    <div>
    <Heading>List of events</Heading>
    {events.map((event) => (
      <div key={event.id}>
        <Link to={`event/${event.id}`}>
          <h2>{event.title}</h2>
        </Link>
        <p>
          Description {" "}
          {event.description}
        </p>
        <p>  
          {event.image}
        </p>
        <p>
          Starttime:{" "}{event.startTime}
          Endtime: {" "}{event.endTime}
        </p>
          Categories:{" "}            
      </div>
    ))}
    </div>
  );
};
