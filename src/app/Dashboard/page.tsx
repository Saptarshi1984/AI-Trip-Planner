'use client'

import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  type IconProps,
  Flex,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  MdArrowForward,
  MdBookmarkBorder,
  MdBookmarks,
  MdDashboard,
  MdExplore,
  MdFlightTakeoff,
  MdLightbulbOutline,
  MdNotificationsNone,
  MdPersonOutline,
} from "react-icons/md";

const PRIMARY_COLOR = "#13a4ec";

/* const JourneyLogo = (props: IconProps) => (
  <Icon viewBox="0 0 48 48" fill="none" {...props}>
    <path
      d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
      fill="currentColor"
    />
  </Icon>
); */

const navItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "#",
    isActive: true,
  },
  {
    label: "Plan a Trip",
    icon: MdFlightTakeoff,
    href: "#",
  },
  {
    label: "My Trips",
    icon: MdBookmarkBorder,
    href: "#",
  },
  {
    label: "Inspiration",
    icon: MdLightbulbOutline,
    href: "#",
  },
];

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
    description: "Discover new destinations and travel ideas from our community.",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function getCurrentUser() {
      const user = await checkAuthStatus();
      router.replace(user ? "/Dashboard" : "/SignIn");
    }

    getCurrentUser();
  }, [router]);

  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const navHoverBg = useColorModeValue("rgba(19, 164, 236, 0.12)", "rgba(19, 164, 236, 0.18)");
  const navActiveBg = useColorModeValue("rgba(19, 164, 236, 0.18)", "rgba(19, 164, 236, 0.24)");
  const iconAccentBg = useColorModeValue("rgba(19, 164, 236, 0.12)", "rgba(19, 164, 236, 0.2)");

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
        <Stack >
          <Flex align="center" gap={3}>
            
            <Heading size="md" fontWeight="bold">
              Dashboard
            </Heading>
          </Flex>

          <Stack >
            {navItems.map((item) => (
              <Flex
                key={item.label}
                as={ChakraLink}
                href={item.href}
                align="center"
                gap={3}
                px={4}
                py={2}
                rounded="lg"
                bg={item.isActive ? navActiveBg : "transparent"}
                color={item.isActive ? PRIMARY_COLOR : undefined}
                fontWeight={item.isActive ? "bold" : "medium"}
                transition="all 0.2s ease"
                _hover={{
                  textDecoration: "none",
                  bg: navHoverBg,
                  color: PRIMARY_COLOR,
                }}
              >
                <Icon as={item.icon} boxSize={5} />
                <Text>{item.label}</Text>
              </Flex>
            ))}
          </Stack>
        </Stack>

        <Flex align="center" gap={3}>
          {/* <Avatar
            size="md"
            name="Sarah W."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnyDkVf3SWzSC0BvyfLOnIqBwBt_Kz7KktnAB92fCO6953WmoqMzskUvcd5df-D8dxNiDjGxHcM3vFrb1QWykfSEDmWfgxWOB4kw0GTzm3mG1xQRXGqy6sP2ROFKx7nOjL3ZhrT9H4fhenSKAOLvNPh9w5aOolu8OKdRUBIDoMXWF93PMoTXc8JtKNkuIEVZfyN6KxwuPW-aPE3CE-DBPGa5PsFNhHhxzERPLyBzkPwSkfT77Uvbx10EER2CLBq3BjDxlWmrKWUbw"
          /> */}
          <Stack >
            <Text fontWeight="bold">Sarah W.</Text>
            <ChakraLink
              href="#"
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
          <Heading size="lg">Welcome back, Sarah!</Heading>
          <Flex align="center" gap={3}>
            <IconButton
              aria-label="Notifications"
              variant="ghost"
              rounded="full"
              icon={<MdNotificationsNone size={22} />}
              color={subtleColor}
              _hover={{ bg: navHoverBg, color: PRIMARY_COLOR }}
            />
            <Button
              bg={PRIMARY_COLOR}
              color="white"
              rounded="full"
              fontWeight="bold"
              px={6}
              py={3}
              _hover={{ bg: "rgba(19, 164, 236, 0.9)" }}
              onClick={() => router.push("/TripPlanner")}
            >
              Start New Trip
            </Button>
          </Flex>
        </Flex>

        <Box
          bg={cardBg}
          rounded="xl"
          shadow="sm"
          overflow="hidden"
          mb={12}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Flex
              p={{ base: 6, md: 10 }}
              align="flex-start"
              justify="center"
              flexDir="column"
              gap={6}
            >
              <Stack >
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
                href="#"
                _hover={{
                  textDecoration: "none",
                  "& svg": { transform: "translateX(4px)" },
                }}
              >
                <Text>Start Planning</Text>
                <Icon
                  as={MdArrowForward}
                  transition="transform 0.3s ease"
                />
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
              <Stack >
                <Box
                  bg={iconAccentBg}
                  color={PRIMARY_COLOR}
                  p={3}
                  rounded="lg"
                  w="fit-content"
                >
                  <Icon as={card.icon} boxSize={6} />
                </Box>
                <Stack >
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
