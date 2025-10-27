"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { usePathname, useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  MdArrowForward,
  MdBookmarks,
  MdExplore,
  MdNotificationsNone,
  MdPersonOutline,
} from "react-icons/md";
import { account, tablesDB } from "@/lib/appwrite.client";
import AccountSidebarNav from "@/components/ux/AccountSidebarNav";
const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";

const exploreCards = [
  {
    icon: MdBookmarks,
    title: "View Saved Itineraries",
    description: "Access and manage your past and upcoming trips.",
  },
  {
    icon: MdPersonOutline,
    title: "Manage Profile",
    description: "Update your personal information and preferences.",
  },
  {
    icon: MdExplore,
    title: "Get Travel Inspiration",
    description:
      "Discover new destinations and travel ideas from our community.",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("Unknown");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const iconAccentBg = useColorModeValue(
    "rgba(19, 164, 236, 0.12)",
    "rgba(19, 164, 236, 0.2)"
  );

  async function getCurrentUser() {
    const user = await checkAuthStatus();

    router.replace(user ? "/Dashboard" : "/SignIn");

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

  useEffect(() => {
    (async () => {
      try {
        const me = await account.get();

        try {
          await tablesDB.createRow({
            databaseId: "68ea1c19002774b84c21",
            tableId: "user_profiles",
            rowId: me.$id,
            data: { email: me.email },
          });
        } catch (e: any) {
          if (e?.code === 409) {
            await tablesDB.updateRow({
              databaseId: "68ea1c19002774b84c21",
              tableId: "user_profiles",
              rowId: me.$id,
              data: { email: me.email },
            });
          } else {
            throw e;
          }
        }
      } catch (e) {
        // no session; handle as needed
      }
    })();
  }, []);
  return (
    <Flex
      minH="100dvh"
      maxW="76rem"
      m={"auto"}
      flexDir={{ base: "column", lg: "row" }}
      bg={pageBg}
      color={foregroundColor}
      borderRadius={"xl"}
    >
      <Flex
        as="aside"
        w={{ base: "full", lg: "16rem" }}
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        justify="space-between"
        minH={{ base: "auto", lg: "100dvh" }}
        flexDir="column"
        shadow={{ base: "md", lg: "none" }}
        mb={{ base: 6, lg: 0 }}
        borderLeftRadius={"xl"}
      >
        <Stack id="sideNavBar">
          <AccountSidebarNav pathname={pathname} />
        </Stack>

        <Flex align="center" gap={3}>
          <Stack>
            <Text fontWeight="bold">{displayName}</Text>
            <ChakraLink
              as={NextLink}
              href="/Profile"
              fontSize="sm"
              color={subtleColor}
              _hover={{ color: PRIMARY_COLOR, textDecoration: "none" }}
            >
              View Profile
            </ChakraLink>
          </Stack>
        </Flex>
      </Flex>

      <Box flex="1" p={{ base: 6, lg: 12 }} pt={{ base: 0, lg: 12 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          flexDir={{ base: "column", sm: "row" }}
          gap={4}
          mb={8}
        >
          <Heading size="lg">Welcome back, {displayName}</Heading>
          <Flex align="center" gap={3}>
            <MdNotificationsNone size={22} />
            <Button
              bg={PRIMARY_COLOR}
              color="white"
              rounded="full"
              fontWeight="bold"
              px={6}
              py={3}
              _hover={{ bg: "rgba(19, 164, 236, 0.9)" }}
              onClick={() =>{ setLoading(true); router.push("/TripPlanner");}}
              loading={loading}
            >
              Start New Trip
            </Button>
          </Flex>
        </Flex>

        <Box bg={cardBg} rounded="xl" shadow="sm" overflow="hidden" mb={12}>
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Flex
              p={{ base: 6, md: 10 }}
              align="flex-start"
              justify="center"
              flexDir="column"
              gap={6}
            >
              <Stack>
                <Heading size="md">Plan Your Trip with AI</Heading>
                <Text color={subtleColor}>
                  Let our AI craft your perfect itinerary. Simply provide your
                  preferences, and we&apos;ll handle the rest.
                </Text>
              </Stack>
              <ChakraLink
                display="inline-flex"
                alignItems="center"
                gap={2}
                color={PRIMARY_COLOR}
                fontWeight="bold"
                as={NextLink}
                href="/TripPlanner"
                _hover={{
                  textDecoration: "none",
                  "& svg": { transform: "translateX(4px)" },
                }}
              >
                <Text>Start Planning</Text>
                <Icon as={MdArrowForward} transition="transform 0.3s ease" />
              </ChakraLink>
            </Flex>
            <GridItem
              minH={{ base: "16rem", md: "100%" }}
              bgImage="url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkC66t5cSp-hkOUxaw9C-ys9wYZG5HTeeLE95b0FqIu6BqeCwuLS_s2OAqCEN8sihw-B-1PiAicJCFdIRsbbO6Fd9X_zSvndtV8LJsEoSSfKzUKRhBOdL6vLX6rXPKB8-UZ-_XPmRlscVHrb6TabE59FMXlnkhLW3l3QZvpEEdGNhlPmUYscHioGbc_1VYiv0ciC7J4gSxAB6Y3y-xL1NJVrU45nd4HcXH55foU3DXyyzIpHbqlXWWd1p-hTB49dk2lae5lmgrLjc')"
              bgPos="center"
              bgSize="cover"
            />
          </SimpleGrid>
        </Box>

        <Heading size="md" mb={6}>
          Explore More
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {exploreCards.map((card) => (
            <Box
              key={card.title}
              bg={cardBg}
              rounded="xl"
              shadow="sm"
              p={6}
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-4px)" }}
            >
              <Stack>
                <Box
                  bg={iconAccentBg}
                  color={PRIMARY_COLOR}
                  p={3}
                  rounded="lg"
                  w="fit-content"
                >
                  <Icon as={card.icon} boxSize={6} />
                </Box>
                <Stack>
                  <Heading size="sm">{card.title}</Heading>
                  <Text fontSize="sm" color={subtleColor}>
                    {card.description}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
