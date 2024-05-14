import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetCategory from "./components/category/GetCategory";
import AddEditCategory from "./components/category/AddEditCategory";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import AddEditTag from "./components/tag/AddEditTag";
import GetTag from "./components/tag/GetTag";
import GetArticle from "./components/article/GetArticle";
import AddEditArticle from "./components/article/AddEditArticle";
import ViewArticle from "./components/article/ViewArticle";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes for category  */}
          <Route
            path="/addcategory"
            element={<AddEditCategory editMode={false} />}
          />
          <Route path="/viewcategory" element={<GetCategory />} />
          <Route
            path="/updatecategory/:id"
            element={<AddEditCategory editMode={true} />}
          />
          {/* Routes for tags */}
          <Route path="/addtag" element={<AddEditTag editMode={false} />} />
          <Route path="/viewtag" element={<GetTag />} />
          <Route
            path="/updatetag/:id"
            element={<AddEditTag editMode={true} />}
          />
          {/* Routes for article */}
          <Route
            path="/addarticle"
            element={<AddEditArticle editMode={false} />}
          />
          <Route path="/viewarticle" element={<GetArticle />} />
          <Route path="/viewarticle/:id" element={<ViewArticle />} />
          <Route
            path="/updatearticle/:id"
            element={<AddEditArticle editMode={true} />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
