import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    is_menu: false,
  });

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to handle form submission for creating a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/category/", newCategory);
      setNewCategory({
        name: "",
        is_menu: false,
      });
      fetchCategories(); // Refresh categories after creating a new one
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Function to handle deletion of a category
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/`);
      fetchCategories(); // Refresh categories after deleting one
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.is_menu ? "Menu" : "Not Menu"}
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <label>
          Is Menu:
          <input
            type="checkbox"
            checked={newCategory.is_menu}
            onChange={(e) =>
              setNewCategory({ ...newCategory, is_menu: e.target.checked })
            }
          />
        </label>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default CategoryComponent;
