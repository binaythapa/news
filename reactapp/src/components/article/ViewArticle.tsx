import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Image,
  Tag,
  Badge,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "./fetchArticle";
import { fetchTag } from "../tag/fetchTag";
import { fetchTags } from "../tag/fetchTags";
import { fetchCategories } from "../category/fetchCategories";
// import { Icon } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

const ViewArticle = () => {
  const { id } = useParams<{ id: string }>();

  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [article, setArticle] = useState({
    title: "",
    content: "",
    image: null,
    category: 0,
    views: null,
    tags: [],
  });

  useEffect(() => {
    const getArticle = async () => {
      const data = await fetchArticle(id);
      setArticle(data);
    };

    const getTags = async () => {
      const data = await fetchTags();
      setTags(data);
    };

    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getArticle();
    getTags();
    getCategories();
  }, []);

  const getTagName = (tagId: number) => {
    const tag = tags.find((tag) => tag.id === tagId);
    return tag ? tag.name : "";
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "";
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxWidth="90%"
        margin="auto"
        marginTop={2}
      >
        <Card align="center" variant="elevated" marginTop={2}>
          <CardHeader>
            <Heading size="md"> {article.title}</Heading>
            {article.tags.map((tagId) => (
              <Tag
                key={tagId}
                size="md"
                variant="solid"
                marginLeft={2}
                colorScheme="blue"
              >
                {getTagName(tagId)}
              </Tag>
            ))}
            <br />
            <Badge ml={2} colorScheme="green" fontSize="0.8rem">
              {getCategoryName(article.category)}
            </Badge>
            <br />
            <HStack marginLeft={2}>
              <FaEye size={20} />
              <Text>{article.views}</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Image
              src={article.image || "/article_preview.png"}
              objectFit="cover"
              width="100%"
              height="auto"
              fallbackSrc="/article_preview.png"
            />
            <Text marginTop={2}>{article.content}</Text>
          </CardBody>
          <CardFooter>
            {/* <Button colorScheme="blue">View here</Button> */}
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};

export default ViewArticle;
