import axios from "axios";

export const fetchCategory = async (categoryId: number) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
