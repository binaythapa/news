import axios from "axios";

export const fetchTags = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/tag/");
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};
