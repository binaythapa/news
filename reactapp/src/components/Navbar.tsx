import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <Box bg="blue.500" px={4}>
      <Flex alignItems={"stretch"} justifyContent={"space-between"}>
        {/* Logo */}
        <Link to="/">
          <Image src="/logo.svg" boxSize="80px" alt="Logo" />
        </Link>

        {/* Menu */}
        <Flex alignItems={"stretch"}>
          <Link to="/category">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="150px"
              bg={location.pathname === "/category" ? "blue.400" : "blue.500"}
              ml={10}
              h="100%"
              p={4}
            >
              Category
            </Box>
          </Link>
          <Link to="/article">
            <Box
              as="button"
              color="white"
              fontSize="xl"
              w="150px"
              bg={location.pathname === "/article" ? "blue.400" : "blue.500"}
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
