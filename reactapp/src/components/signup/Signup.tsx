import React, { useState } from "react";
import {
  Stack,
  Input,
  Button,
  Container,
  Heading,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import CustomToast from "../CustomToast";

const SignUp = () => {
  const displayToast = CustomToast();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e: any) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup",
        newUser
      );

      if (response.data.username != null || response.data.password != null) {
        displayToast({
          messageStatus: "error",
          message: `${
            response.data.username
              ? response.data.username
              : response.data.password
          }`,
        });
        return;
      }
      setNewUser({
        username: "",
        password: "",
        email: "",
      });
      displayToast({
        messageStatus: "success",
        message: "User Signed Up Successfully !",
      });
    } catch (error: any) {
      console.error("Error ", error);
      displayToast({
        messageStatus: "error",
        message: "Error occurred !",
      });
    }
  };

  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            Sign Up
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            name="username"
          />
          <Input
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            name="password"
            type="password"
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            name="email"
            type="email"
          />
          <Button onClick={handleSubmit} colorScheme="blue">
            Sign Up
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default SignUp;
