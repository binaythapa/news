import axios from "axios";

export const fetchTag = async (tagId: number) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/tag/${tagId}`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
