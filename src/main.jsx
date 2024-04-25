import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventListLoader } from "./pages/EventsPage";
import { AddEvent, loader as addEventLoader } from "./pages/AddEvent";
import { EditEvent, loader as editEventLoader } from "./pages/EditEvent";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { LoaderErrors } from "./components/LoaderErrors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventListLoader,
        errorElement: <LoaderErrors />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        errorElement: <LoaderErrors />,
      },
      {
        path: "/event/:eventId/editevent",
        element: <EditEvent />,
        loader: editEventLoader,
        errorElement: <LoaderErrors />,
      },
      { path: "/addevent",
        element: <AddEvent />, 
        loader: addEventLoader
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
