import React from "react";
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface NavItems {
  navLink: string;
  menuName: string;
}

interface NavData {
  navs: NavItems[];
}

const Navbar = ({ navs }: NavData) => {
  const location = useLocation();

  return (
    <Box bg="blue.500" px={4}>
      <Flex alignItems={"stretch"} justifyContent={"center"}>
        {/* Logo */}
        <Link to="/">
          <Image src="/logo.svg" boxSize="80px" alt="Logo" />
        </Link>

        {/* Menu */}
        <Flex alignItems={"stretch"}>
          {navs.map((nav: NavItems) => (
            <>
              <Link to={nav.navLink}>
                <Box
                  as="button"
                  color="white"
                  fontSize="xl"
                  w="100%"
                  bg={
                    location.pathname === nav.navLink ? "blue.400" : "blue.500"
                  }
                  ml={10}
                  h="100%"
                  p={4}
                >
                  {nav.menuName}
                </Box>
              </Link>
              <Spacer />
            </>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
