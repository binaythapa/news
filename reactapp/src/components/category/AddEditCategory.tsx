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
import { fetchCategories } from "./fetchCategories";

interface Props {
  editMode: Boolean;
  categoryId?: Number;
}

const AddEditCategory = ({ editMode, categoryId }: Props) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    is_menu: false,
    parent: null,
  });

  const [editCategory, setEditCategory] = useState({
    name: "",
    is_menu: false,
    parent: null,
  });

  const [categories, setCategories] = useState([]);

  const fetchCategory: any = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/category/${categoryId}/`
    );
    setEditCategory(response.data);
  };

  useEffect(() => {
    const getCategories = async () => {
      const data: any = await fetchCategories();
      setCategories(data);
    };
    getCategories();

    fetchCategory();
  }, []);

  const handleNameChange = (e: any) => {
    if (editMode) {
      setEditCategory({ ...editCategory, name: e.target.value });
    } else {
      setNewCategory({ ...newCategory, name: e.target.value });
    }
  };

  const handleMenuChange = (e: any) => {
    if (editMode) {
      setEditCategory({ ...editCategory, is_menu: e.target.checked });
    } else {
      setNewCategory({ ...newCategory, is_menu: e.target.checked });
    }
  };

  const handleParentChange = (e: any) => {
    if (editMode) {
      setEditCategory({ ...editCategory, parent: e.target.value });
    } else {
      setNewCategory({ ...newCategory, parent: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://127.0.0.1:8000/api/category/${categoryId}/`,
          editCategory
        );
        setEditCategory({
          name: "",
          is_menu: false,
          parent: null,
        });
      } else {
        console.log(newCategory);
        await axios.post("http://127.0.0.1:8000/api/category/", newCategory);
        setNewCategory({
          name: "",
          is_menu: false,
          parent: null,
        });
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            {editMode ? "Update" : "Add"} Category
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Category name"
            value={editMode ? editCategory.name : newCategory.name}
            onChange={handleNameChange}
            name="category"
          />
          <Checkbox
            colorScheme="blue"
            name="is_menu"
            isChecked={editMode ? editCategory.is_menu : newCategory.is_menu}
            onChange={handleMenuChange}
          >
            Is menu ?
          </Checkbox>
          <Select
            placeholder="Select parent"
            value={editMode ? editCategory.parent || "" : ""}
            onChange={handleParentChange}
          >
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Button onClick={handleSubmit} colorScheme="blue">
            {editMode ? "Update" : "Add"} Category
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default AddEditCategory;
