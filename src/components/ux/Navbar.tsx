"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import Navlink from "./Navlink";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import Brand from "./Brand";

const PRIMARY_COLOR = "pink.600";

export function Navbar() {

  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const containerBg = useColorModeValue("gray.200", "gray.900");
  
  useEffect(() => {
    if(path == '/'){
      setLoading(false);
    }
  }, [path])
  

  return (
    (!(path == '/SignIn' || path == '/SignUp') && <Box as="header" py={4}>
      <Container
        maxW="76rem"
        px={{ base: 4, sm: 6, md: 8}}
        py={2}
        bg={containerBg}
        borderRadius="xl"
      >
        <Flex align="center" justify="space-between" gap={4}>
          <Brand />
          <div id="navLinks">
            <Navlink primaryColor={PRIMARY_COLOR} />
          </div>

          <HStack align="center" gap={4} id="login">
            <ColorModeButton display={{ base: "none", sm: "inline-flex" }} />
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
              loading={loading}
              _hover={{ transform: "scale(1.05)", bg: PRIMARY_COLOR }}
              onClick={() => {router.push('/SignIn'); setLoading(true)}}
            >
              Sign In
            </Button>
          </HStack>
          <MobileNav />
        </Flex>
      </Container>
    </Box>)
  );
}

export default Navbar;
