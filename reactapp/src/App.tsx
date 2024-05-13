import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetCategory from "./components/category/GetCategory";
import AddEditCategory from "./components/category/AddEditCategory";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import AddEditTag from "./components/tag/AddEditTag";
import GetTag from "./components/tag/GetTag";

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

          <Route path="/addtag" element={<AddEditTag editMode={false} />} />
          <Route path="/viewtag" element={<GetTag />} />
          <Route
            path="/updatetag/:id"
            element={<AddEditTag editMode={true} />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
