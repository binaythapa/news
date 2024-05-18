import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GetCategory from "./components/category/GetCategory";
import AddEditCategory from "./components/category/AddEditCategory";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import AddEditTag from "./components/tag/AddEditTag";
import GetTag from "./components/tag/GetTag";
import GetArticle from "./components/article/GetArticle";
import AddEditArticle from "./components/article/AddEditArticle";
import ViewArticle from "./components/article/ViewArticle";
import SignUp from "./components/signup/Signup";
import Login from "./components/login/Login";
import { useAuth } from "./components/AuthProvider";

function PrivateRoute({ children }: any) {
  // const token = useAuth();
  // return token ? children : <Navigate to="/login" />;

  return children;
}

function App() {
  // console.log(token);
  return (
    <ChakraProvider>
      <Router>
        <Navbar
          navs={[
            { navLink: "/viewtag", menuName: "Tags" },
            { navLink: "/viewcategory", menuName: "Category" },
            { navLink: "/viewarticle", menuName: "Article" },
            { navLink: "/login", menuName: "Login" },
            { navLink: "/signup", menuName: "Signup" },
          ]}
        />
        <Routes>
          {/* Routes for category  */}
          <Route
            path="/viewcategory"
            element={
              <PrivateRoute>
                <GetCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/addcategory"
            element={
              <PrivateRoute>
                <AddEditCategory editMode={false} />
              </PrivateRoute>
            }
          />

          {/* <Route path="/viewcategory" element={<GetCategory />} /> */}
          <Route
            path="/updatecategory/:id"
            element={
              <PrivateRoute>
                <AddEditCategory editMode={true} />
              </PrivateRoute>
            }
          />
          {/* Routes for tags */}
          <Route
            path="/addtag"
            element={
              <PrivateRoute>
                <AddEditTag editMode={false} />
              </PrivateRoute>
            }
          />

          <Route
            path="/viewtag"
            element={
              <PrivateRoute>
                <GetTag />
              </PrivateRoute>
            }
          />

          <Route
            path="/updatetag/:id"
            element={
              <PrivateRoute>
                <AddEditTag editMode={true} />
              </PrivateRoute>
            }
          />
          {/* Routes for article */}
          <Route
            path="/addarticle"
            element={
              <PrivateRoute>
                <AddEditArticle editMode={false} />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewarticle"
            element={
              <PrivateRoute>
                <GetArticle />
              </PrivateRoute>
            }
          />
          <Route
            path="/viewarticle/:id"
            element={
              <PrivateRoute>
                <ViewArticle />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/updatearticle/:id"
            element={<AddEditArticle editMode={true} />}
          />

          {/* Route for login */}
          <Route path="/login" element={<Login />} />

          {/* Route for signup */}
          <Route path="/signup" element={<SignUp />} />

          {/* Check protected route */}
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </ChakraProvider>
  );
}

export default App;
