"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { checkAuthStatus } from "@/lib/appwrite.service";
import AccountSidebarNav from "@/components/ux/AccountSidebarNav";

const PRIMARY_COLOR = "#13a4ec";

const MyTripPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");

  useEffect(() => {
    async function ensureAuthenticated() {
      const user = await checkAuthStatus();
      if (!user) {
        router.replace("/SignIn");
      }
    }

    void ensureAuthenticated();
  }, [router]);

  return (
    <Flex
      minH="100dvh"
      maxW="76rem"
      m="auto"
      flexDir={{ base: "column", lg: "row" }}
      bg={pageBg}
      color={foregroundColor}
      borderRadius="xl"
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
        borderLeftRadius="xl"
      >
        <Stack>
          <AccountSidebarNav pathname={pathname} />
        </Stack>

        <Stack fontSize="sm" color={subtleColor}>
          <Text fontWeight="bold" color={foregroundColor}>
            Ready for your next adventure?
          </Text>
          <Text>Save itineraries once you start planning.</Text>
        </Stack>
      </Flex>

      <Box flex="1" p={{ base: 6, lg: 12 }}>
        <Flex
          h="full"
          align="center"
          justify="center"
          bg={cardBg}
          borderRadius="2xl"
          shadow="xl"
          p={{ base: 8, md: 16 }}
        >
          <Stack  textAlign="center" maxW="28rem">
            <Heading size="lg">You don&apos;t have a trip yet.</Heading>
            <Text color={subtleColor}>
              Start your first itinerary to see it appear here.
            </Text>
            <Button
              bg={PRIMARY_COLOR}
              color="white"
              rounded="full"
              px={{ base: 6, md: 8 }}
              py={{ base: 3, md: 4 }}
              fontWeight="semibold"
              _hover={{ bg: "rgba(19, 164, 236, 0.9)" }}
              _active={{ bg: "rgba(19, 164, 236, 0.8)" }}
              onClick={() => router.push("/TripPlanner")}
            >
              Plan a Trip
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MyTripPage;
