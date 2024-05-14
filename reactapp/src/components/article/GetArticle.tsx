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
import { fetchArticles } from "./fetchArticles";
import CustomToast from "../CustomToast";

const GetArticle = () => {
  const displayToast = CustomToast();

  const [articles, setArticles] = useState([]);

  const truncate = (str: any, num: Number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  useEffect(() => {
    const getArticles = async () => {
      const data: any = await fetchArticles();
      setArticles(data);
    };
    getArticles();
  }, []);

  const handleDelete = async (articleId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/article/${articleId}/`);
      const data: any = await fetchArticles();
      setArticles(data);
      displayToast({
        messageStatus: "success",
        message: "Article Deleted Successfully !",
      });
    } catch (error) {
      console.error("Error: ", error);
      displayToast({
        messageStatus: "error",
        message: "Error Occured !",
      });
    }
  };

  return (
    <>
      <Container maxW="90%" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            Articles
          </Heading>
        </Center>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>Views</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(articles) &&
                articles.map((article: any) => (
                  <Tr key={article.id}>
                    <Td>{article.id}</Td>
                    <Td>{truncate(article.title, 50)}</Td>
                    <Td>{truncate(article.content, 50)}</Td>
                    <Td>{article.views} </Td>

                    <Td>
                      <Link to={`/viewarticle/${article.id}`}>
                        <Button marginEnd={1} colorScheme="blue" size="xs">
                          View
                        </Button>
                      </Link>
                      <Link to={`/updatearticle/${article.id}`}>
                        <Button marginEnd={1} colorScheme="yellow" size="xs">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={() => handleDelete(article.id)}
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

export default GetArticle;
