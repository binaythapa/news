import axios from "axios";

const useAuth = () => {
  const storedToken = localStorage.getItem("token");
  // validateToken();
  // console.log(response.data);
  return storedToken;
};

const validateToken = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/test_token");
    console.log(response.data);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

export { useAuth };
