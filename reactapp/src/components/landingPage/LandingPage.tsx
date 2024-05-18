import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { fetchCategories } from "../category/fetchCategories";
import { fetchTags } from "../tag/fetchTags";
import TagDisplay from "./TagDisplay";
import ViewArticle from "../article/ViewArticle";

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const data: any = await fetchCategories();
      setCategories(data);
    };
    const getTags = async () => {
      const data: any = await fetchTags();
      console.log(data);
      setTags(data);
    };
    getCategories();
    getTags();
  }, []);

  // Manually create a mapping of category names to links
  const categoryLinks: { [key: string]: string } = {
    Category1: "/category1",
    Category2: "/category2",
    // Add more categories here...
  };

  const navItems = categories.map((category: any) => ({
    navLink: categoryLinks[category.name],
    menuName: category.name,
  }));

  return (
    <>
      <Navbar
        navs={[
          { navLink: "/login", menuName: "Login" },
          { navLink: "/signup", menuName: "Signup" },
          ...navItems,
        ]}
      />
      <TagDisplay tags={tags} />
      <ViewArticle />
    </>
  );
};

export default LandingPage;
