import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import AddCategory from "./components/category/AddCategory";
import GetCategory from "./components/category/GetCategory";
// import CategoryComponent from './components/CategoryComponent';

function App() {
  return (
    // <ChakraProvider>
    <GetCategory />
    // </ChakraProvider>
  );
}

export default App;
