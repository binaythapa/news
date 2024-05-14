import React, { FormEvent, useEffect, useState } from "react";
import {
  Stack,
  Input,
  Checkbox,
  Button,
  Container,
  Heading,
  Center,
  Select,
  Textarea,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomToast from "../CustomToast";
import { fetchArticle } from "./fetchArticle";
import { fetchCategories } from "../category/fetchCategories";
import { fetchTags } from "../tag/fetchTags";

interface Article {
  title: string;
  content: string;
  image: string | null;
  category: null;
  tags: number[];
  [key: string]: any;
}

interface Props {
  editMode: Boolean;
  articleId?: String;
}

const AddEditArticle = ({ editMode, articleId }: Props) => {
  const { id } = useParams<{ id: string }>();
  articleId = id;

  const displayToast = CustomToast();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [newArticle, setNewArticle] = useState<Article>({
    title: "",
    content: "",
    image: null,
    category: null,
    tags: [],
  });

  const [editArticle, setEditArticle] = useState<Article>({
    title: "",
    content: "",
    image: null,
    category: null,
    tags: [],
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      const data: any = await fetchArticle(articleId);
      setEditArticle(data);
      setImageUrl(data.image);
    };

    const getCategories = async () => {
      const data: any = await fetchCategories();
      setCategories(data);
    };

    const getTags = async () => {
      const data: any = await fetchTags();
      setTags(data);
    };
    if (editMode) {
      getArticle();
    }
    getCategories();
    getTags();

    if (editMode) {
      fetchArticle(id);
    }
  }, []);

  const handleTitleChange = (e: any) => {
    if (editMode) {
      setEditArticle({ ...editArticle, title: e.target.value });
    } else {
      setNewArticle({ ...newArticle, title: e.target.value });
    }
  };

  const handleContentChange = (e: any) => {
    if (editMode) {
      setEditArticle({ ...editArticle, content: e.target.value });
    } else {
      setNewArticle({ ...newArticle, content: e.target.value });
    }
    // console.log(newArticle);
  };

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
      if (editMode) {
        setEditArticle({ ...editArticle, image: e.target.files[0] });
      } else {
        setNewArticle({ ...newArticle, image: e.target.files[0] });
      }
    }
  };

  const handleCategoryChange = (e: any) => {
    if (editMode) {
      setEditArticle({ ...editArticle, category: e.target.value });
    } else {
      setNewArticle({ ...newArticle, category: e.target.value });
    }
  };

  const handleTagsChange = (e: any) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option: any) => parseInt(option.value)
    );
    if (editMode) {
      setEditArticle({
        ...editArticle,
        tags: selectedOptions,
      });
    } else {
      setNewArticle({
        ...newArticle,
        tags: selectedOptions,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    console.log(newArticle);
    e.preventDefault();
    try {
      const formData = new FormData();
      const article = editMode ? editArticle : newArticle;
      Object.keys(article).forEach((key) => {
        if (key === "tags") {
          article[key].forEach((tag: number) => {
            if (tag != undefined) {
              formData.append(key, tag.toString());
            }
          });
        } else {
          formData.append(key, article[key]);
        }
      });

      if (editMode) {
        await axios.put(
          `http://127.0.0.1:8000/api/article/${articleId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEditArticle({
          title: "",
          content: "",
          image: null,
          category: null,
          tags: [],
        });
        setImageUrl("");
        displayToast({
          messageStatus: "success",
          message: "Article Updated Successfully !",
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/article/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setNewArticle({
          title: "",
          content: "",
          image: null,
          category: null,
          tags: [],
        });
        setImageUrl("");
        displayToast({
          messageStatus: "success",
          message: "Article Added Successfully !",
        });
      }
    } catch (error) {
      debugger;
      console.error("Error ", error);
      displayToast({
        messageStatus: "error",
        message: "Error Occured !",
      });
    }
  };

  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            {editMode ? "Update" : "Add"} Article
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Title"
            value={editMode ? editArticle.title : newArticle.title}
            onChange={handleTitleChange}
            name="title"
          />
          <Textarea
            value={editMode ? editArticle.content : newArticle.content}
            placeholder="Content "
            onChange={handleContentChange}
            name="content"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            display="none"
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button as="span">Upload Image</Button>
          </label>
          {/* <Image
            boxSize="100px"
            src={editMode ? editArticle.image || "" : newArticle.image || ""}
          /> */}
          <Image boxSize="100px" src={imageUrl || "/article_preview.png"} />
          // Populate the categories
          <Select
            h={10}
            placeholder="Select Category"
            value={
              editMode ? editArticle.category || "" : newArticle.category || ""
            }
            onChange={handleCategoryChange}
          >
            {Array.isArray(categories) &&
              categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
          // Populate the tags
          <Select
            size="xlg"
            placeholder="Select Tags"
            multiple
            value={
              editMode
                ? editArticle.tags.map((tag) => tag.toString()) || []
                : newArticle.tags.map((tag) => tag.toString()) || []
            }
            onChange={handleTagsChange}
          >
            {Array.isArray(tags) &&
              tags.map((tag: any) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </Select>
          <Button onClick={handleSubmit} colorScheme="blue">
            {editMode ? "Update" : "Add"} Article
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default AddEditArticle;
