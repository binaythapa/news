import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Navbar = () => {
  const location = useLocation();
  const token = useAuth();
  return (
    <Box bg="blue.500" px={4}>
      <Flex alignItems={"stretch"} justifyContent={"space-between"}>
        {/* Logo */}
        <Link to="/">
          <Image src="/logo.svg" boxSize="80px" alt="Logo" />
        </Link>

        {/* Menu */}
        <Flex alignItems={"stretch"}>
          <Link to="/viewcategory">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="150px"
              bg={
                location.pathname === "/viewcategory" ? "blue.400" : "blue.500"
              }
              ml={10}
              h="100%"
              p={4}
            >
              Category
            </Box>
          </Link>
          <Link to="/viewtag">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="150px"
              bg={location.pathname === "/viewtag" ? "blue.400" : "blue.500"}
              ml={10}
              h="100%"
              p={4}
            >
              Tag
            </Box>
          </Link>
          <Link to="/viewarticle">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="150px"
              bg={
                location.pathname === "/viewarticle" ? "blue.400" : "blue.500"
              }
              ml={10}
              h="100%"
              p={4}
            >
              Article
            </Box>
          </Link>
        </Flex>

        {/* Login/Signup */}
        <Flex alignItems={"stretch"}>
          <Link to="/login">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="100px"
              bg={location.pathname === "/login" ? "blue.400" : "blue.500"}
              ml={10}
              h="100%"
              p={4}
            >
              Login
            </Box>
          </Link>
          <Link to="/signup">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="100px"
              bg={location.pathname === "/signup" ? "blue.400" : "blue.500"}
              ml={10}
              h="100%"
              p={4}
            >
              Signup
            </Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
