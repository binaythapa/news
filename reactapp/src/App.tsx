import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetCategory from "./components/category/GetCategory";
import AddEditCategory from "./components/category/AddEditCategory";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/addcategory"
            element={<AddEditCategory editMode={false} />}
          />
          <Route path="/viewcategory" element={<GetCategory />} />
          <Route
            path="/updatecategory/:id"
            element={<AddEditCategory editMode={true} />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
