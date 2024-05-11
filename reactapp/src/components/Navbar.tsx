import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/">
          <Button colorScheme="white" fontSize="xl" fontWeight="bold">
            Merosath
          </Button>
        </Link>
        <Flex alignItems={"center"}>
          <Link to="/category">
            <Button colorScheme="white" ml={10}>
              Category
            </Button>
          </Link>
          <Link to="/contact">
            <Button colorScheme="white" ml={10}>
              Article
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
