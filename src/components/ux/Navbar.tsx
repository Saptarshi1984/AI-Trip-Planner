"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Flex, HStack } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import Navlink from "./Navlink";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { account, tablesDB } from "@/lib/appwrite.client";
import Brand from "./Brand";
import UserAvatar from "./UserAvatar";
import { signOutUser } from "@/lib/appwrite.service";

const PRIMARY_COLOR = "pink.600";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";

export function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const containerBg = useColorModeValue("gray.200", "gray.900");
  const [authStatus, setAuthStatus] = useState(false);
  const [displayName, setDisplayName] = useState<string>("Unknown");
  

  //cheking auth status

  async function getCurrentUser() {
    const user = await checkAuthStatus();
    setAuthStatus(user ? true : false);

    const me = await account.get();

    const row = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: me.$id,
    });

    const firstname = row.firstName;
    const lastname = row.lastName;
    const userName = firstname + " " + lastname;

    setDisplayName(userName);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  //signout function
  async function handleSignOut() {
    setLoading(true);    
    await signOutUser();
    router.replace("/SignIn");    
  }

  useEffect(() => {
    setLoading(false);
  }, [path]);

  useEffect(() => {
    getCurrentUser();
  }, [setAuthStatus]);

  return (
    !(path == "/SignIn" || path == "/SignUp") && (
      <Box as="header" py={4}>
        <Container
          maxW="76rem"
          px={{ base: 4, sm: 6, md: 8 }}
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
              {!authStatus && (
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
                  onClick={() => {
                    router.push("/SignIn");
                    setLoading(true);
                  }}
                >
                  Sign In
                </Button>
              )}
              {authStatus && (
                <Button
                  variant={"outline"}
                  colorPalette={PRIMARY_COLOR}
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
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              )}

              {authStatus && <UserAvatar name={displayName} />}
            </HStack>
            <MobileNav />
          </Flex>
        </Container>
      </Box>
    )
  );
}

export default Navbar;
