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
import { fetchTags } from "./fetchTags";
import CustomToast from "../CustomToast";

const GetTag = () => {
  const displayToast = CustomToast();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data: any = await fetchTags();
      setTags(data);
    };
    getCategories();
  }, []);

  const handleDelete = async (tagId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tag/${tagId}/`);
      const data: any = await fetchTags();
      setTags(data);
      displayToast({
        messageStatus: "success",
        message: "Tag Deleted Successfully !",
      });
    } catch (error) {
      console.error("Error: ", error);
      displayToast({
        messageStatus: "error",
        message: "Error deleting tag !",
      });
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
                <Th>Tag</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tags.map((tag: any) => (
                <Tr key={tag.id}>
                  <Td>{tag.id}</Td>
                  <Td>{tag.name}</Td>
                  <Td>
                    <Link to={`/updatetag/${tag.id}`}>
                      <Button marginEnd={1} colorScheme="yellow" size="xs">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleDelete(tag.id)}
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

export default GetTag;
