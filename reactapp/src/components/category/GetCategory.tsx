import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
import { fetchCategories } from "./fetchCategories";

const GetCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data: any = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/`);
      const data: any = await fetchCategories();
      setCategories(data);
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
                <Th>Id</Th>
                <Th>Category</Th>
                <Th>Is menu</Th>
                <Th>Parent</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((category: any) => (
                <Tr key={category.id}>
                  <Td>{category.id}</Td>
                  <Td>{category.name}</Td>
                  <Td>{category.is_menu ? "Yes" : "No"}</Td>
                  <Td>{category.parent ? category.parent : "No"} </Td>
                  <Td>
                    <Link to={`/updatecategory/${category.id}`}>
                      <Button marginEnd={1} colorScheme="yellow" size="xs">
                        Edit
                      </Button>
                    </Link>
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
