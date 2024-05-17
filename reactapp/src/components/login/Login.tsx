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
import { useNavigate } from "react-router-dom";

const getCSRFToken = () => {
  const csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
  return csrfCookie ? csrfCookie[1] : "";
};

const Login = ({ onLogin }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    try {
      await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Include CSRF token in headers
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid credentials");
          }
          return response.json();
        })
        .then((data) => {
          onLogin(data);
          console.log(data);

          navigate("/home");
        });

      // If login successful, call the `onLogin` callback passed from the parent component
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <>
      <Container maxW="lg" padding={5}>
        <Center>
          <Heading as="h4" size="lg">
            Login
          </Heading>
        </Center>
        <Stack direction="column">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />

          <Button onClick={handleLogin} colorScheme="blue">
            Login
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
