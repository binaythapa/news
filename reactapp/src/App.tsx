import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import AddCategory from "./components/category/AddEditCategory";
// import GetCategory from "./components/category/GetCategory";
import GetCategory from "./components/category/GetCategory";
// import CategoryComponent from './components/CategoryComponent';

function App() {
  return (
    <>
      <AddCategory editMode={false} categoryId={17} />
      <GetCategory />
    </>
    // <ChakraProvider>
    // </ChakraProvider>
  );
}

export default App;
