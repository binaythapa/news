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
} from "@chakra-ui/react";
import axios from "axios";
import { fetchTags } from "./fetchTags";
import { useParams } from "react-router-dom";
import CustomToast from "../CustomToast";

interface Props {
  editMode: Boolean;
  tagId?: String;
}

const AddEditTag = ({ editMode, tagId }: Props) => {
  const displayToast = CustomToast();
  const { id } = useParams<{ id: string }>();
  tagId = id;

  const [newTag, setNewTag] = useState({
    name: "",
  });

  const [editTag, setEditTag] = useState({
    name: "",
  });

  const [tags, setTags] = useState([]);

  const fetchTag: any = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/tag/${tagId}/`);
    setEditTag(response.data);
  };

  useEffect(() => {
    const getTags = async () => {
      const data: any = await fetchTags();
      setTags(data);
    };
    getTags();
    if (editMode) {
      fetchTag(id);
    }
  }, []);

  const handleNameChange = (e: any) => {
    if (editMode) {
      setEditTag({ ...editTag, name: e.target.value });
    } else {
      setNewTag({ ...newTag, name: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://127.0.0.1:8000/api/tag/${tagId}/`, editTag);
        setEditTag({
          name: "",
        });
        displayToast({
          messageStatus: "success",
          message: "Tag Updated Successfully !",
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/tag/", newTag);
        setNewTag({
          name: "",
        });
        displayToast({
          messageStatus: "success",
          message: "Tag Added Successfully !",
        });
      }
    } catch (error) {
      console.error("Error ", error);
      displayToast({
        messageStatus: "error",
        message: "Error occured !",
      });
    }
  };
  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            {editMode ? "Update" : "Add"} Tag
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Tag name"
            value={editMode ? editTag.name : newTag.name}
            onChange={handleNameChange}
            name="category"
          />
          <Button onClick={handleSubmit} colorScheme="blue">
            {editMode ? "Update" : "Add"} Tag
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default AddEditTag;
