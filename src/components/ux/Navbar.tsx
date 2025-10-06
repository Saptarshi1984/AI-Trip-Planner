"use client";

import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";

import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import Navlink from "./Navlink";
import MobileNav from "./MobileNav";
import Brand from "./Brand";

const PRIMARY_COLOR = "pink.600";

export function Navbar() {
  
  const containerBg = useColorModeValue("white", "gray.900");

  return (
    <Box as="header" py={4}>
      <Container
        maxW="7xl"
        px={{ base: 4, sm: 6, lg: 8 }}
        py={2}
        bg={containerBg}
        borderRadius="xl"
      >
        <Flex align="center" justify="space-between" gap={4}>
          <Brand/>
          <div id="navLinks">
             <Navlink primaryColor={PRIMARY_COLOR} />
          </div>
          

          <HStack align="center" gap={4} id="login">
            <ColorModeButton display={{ base: "none", sm: "inline-flex" }}/>
            <Button
              bg={PRIMARY_COLOR}
              color="white"
              fontSize="sm"
              fontWeight="bold"
              px={4}
              py={2}
              rounded="lg"
              boxShadow="md"
              transition="transform 0.2s ease"
              _hover={{ transform: "scale(1.05)", bg: PRIMARY_COLOR }}
            >
              Sign In
            </Button>
          </HStack>
          <MobileNav />
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
