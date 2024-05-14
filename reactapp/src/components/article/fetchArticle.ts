import axios from "axios";

export const fetchArticle = async (articleId?: String) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/article/${articleId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
