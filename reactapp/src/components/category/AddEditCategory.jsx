import React, { useState } from "react";
import {
  Stack,
  Input,
  Checkbox,
  Button,
  Container,
  Heading,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const AddEditCategory = (Mode) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    is_menu: false,
  });

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, name: e.target.value });
  };

  const handleCheckBoxChange = (e) => {
    setNewCategory({ ...newCategory, is_menu: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/category/", newCategory);
      setNewCategory({
        name: "",
        is_menu: false,
      });
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            Add Category
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Category name"
            value={newCategory.name}
            onChange={handleInputChange}
            name="category"
          />
          <Checkbox
            colorScheme="blue"
            name="is_menu"
            isChecked={newCategory.is_menu}
            onChange={handleCheckBoxChange}
          >
            Is menu ?
          </Checkbox>
          <Button onClick={handleSubmit} colorScheme="blue">
            Add Category
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default AddEditCategory;
