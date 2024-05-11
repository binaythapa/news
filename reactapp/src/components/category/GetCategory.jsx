import React, { useEffect } from "react";
import {
  Container,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
const GetCategory = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/`);
      fetchCategories();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Container maxW="50%" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            Categories
          </Heading>
        </Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Is menu</Th>
                <Th>Parent</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {console.log(categories)}
              {categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.name}</Td>
                  <Td>{category.is_menu ? "Yes" : "No"}</Td>
                  <Td>{category.parent ? category.parent : "No"} </Td>
                  <Td>
                    <Button marginEnd={1} colorScheme="yellow" size="xs">
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default GetCategory;
