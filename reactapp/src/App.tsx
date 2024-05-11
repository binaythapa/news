import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

import GetCategory from "./components/category/GetCategory";
import AddEditCategory from "./components/category/AddEditCategory";

function App() {
  const router = createBrowserRouter([
    {
      path: "/addcategory",
      element: <AddEditCategory editMode={false} />,
    },
    {
      path: "/viewcategory",
      element: <GetCategory />,
    },
    {
      path: "/updatecategory/:id",
      element: <AddEditCategory editMode={true} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
