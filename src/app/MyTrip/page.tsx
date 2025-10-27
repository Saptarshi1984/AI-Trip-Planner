"use client";

import { useEffect, useState } from "react";
import { account, tablesDB } from "@/lib/appwrite.client";
import { usePathname, useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, Stack, Text, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { checkAuthStatus } from "@/lib/appwrite.service";
import AccountSidebarNav from "@/components/ux/AccountSidebarNav";
import { Query, type Models } from "appwrite";
import TripSummaryCard from "@/components/ux/TripSummaryCard";
import IteneryResponseCard from "@/components/ux/IteneryResponseCard";

const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const ITENERY_TABLE_ID = "user_iteneries";

type TripRow = Models.Row & {
  userId: string;
  itenery: string;
  startLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  travellers: string;
  budget: string;
  interests: string;
};

const MyTripPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [trips, setTrips] = useState<TripRow[]>([]);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const [activeTrip, setActiveTrip] = useState<TripRow | null>(null);

  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");

  useEffect(() => {
    async function getCurrentUser() {
      const user = await checkAuthStatus();
      if (!user) {
        router.replace("/SignIn");
        return;
      }
      await fetchTripDetails();
    }

    void getCurrentUser();
  }, [router]);

  async function fetchTripDetails() {
    try {
      setActionError(null);
      setFetchError(null);
      setIsLoadingTrips(true);

      const user = await account.get();

      const result = await tablesDB.listRows<TripRow>({
        databaseId: DATABASE_ID,
        tableId: ITENERY_TABLE_ID,
        queries: [
          Query.equal("userId", user.$id),
          Query.orderDesc("$createdAt"),
        ],
      });

      setTrips(result.rows);
      setActiveTrip((prev) => {
        if (!prev) {
          return null;
        }
        return result.rows.find((row) => row.$id === prev.$id) ?? null;
      });
    } catch (error) {
      console.error("Failed to fetch itinerary rows", error);
      setFetchError("We couldn't load your saved itineraries. Please try again.");
    } finally {
      setIsLoadingTrips(false);
    }
  }

  const handleViewTrip = (trip: TripRow) => {
    setActionError(null);
    setActiveTrip((prev) => (prev?.$id === trip.$id ? null : trip));
  };

  async function handleDeleteTrip(tripId: string) {
    try {
      setActionError(null);
      setDeletingTripId(tripId);

      await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: ITENERY_TABLE_ID,
        rowId: tripId,
      });

      setTrips((prev) => prev.filter((trip) => trip.$id !== tripId));
      setActiveTrip((prev) => (prev?.$id === tripId ? null : prev));
    } catch (error) {
      console.error("Failed to delete itinerary row", error);
      setActionError("We could not delete that itinerary. Please try again.");
    } finally {
      setDeletingTripId(null);
    }
  }

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
        <Stack id="sideNavBar">
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
          align={
            isLoadingTrips || fetchError || trips.length === 0
              ? "center"
              : "flex-start"
          }
          justify="center"
          bg={cardBg}
          borderRadius="2xl"
          shadow="xl"
          p={{ base: 8, md: 16 }}
        >
          {isLoadingTrips ? (
            <Stack align="center" >
              <Spinner color={PRIMARY_COLOR} size="lg"  />
              <Text color={subtleColor}>Loading your saved trips...</Text>
            </Stack>
          ) : fetchError ? (
            <Stack textAlign="center" maxW="28rem">
              <Heading size="md">Something went wrong</Heading>
              <Text color={subtleColor}>{fetchError}</Text>
              <Button
                variant="outline"
                rounded="full"
                onClick={() => void fetchTripDetails()}
              >
                Try again
              </Button>
            </Stack>
          ) : trips.length === 0 ? (
            <Stack textAlign="center" maxW="28rem">
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
          ) : (
            <Stack w="full" >
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                
              >
                <Heading size="lg">Your saved itineraries</Heading>
                <Text color={subtleColor}>
                  Review the plans you&apos;ve crafted with Trip Planner AI.
                </Text>
              </Stack>
              <Stack >
                {actionError ? (
                  <Text color="red.400" fontSize="sm">
                    {actionError}
                  </Text>
                ) : null}
                {trips.map((trip) => (
                  <TripSummaryCard
                    key={trip.$id}
                    location={trip.destination || "Custom itinerary"}
                    startDate={trip.startDate || "Not set"}
                    endDate={trip.endDate || "Not set"}
                    budget={trip.budget || "Not set"}
                    travellers={trip.travellers || "Not set"}
                    onView={() => handleViewTrip(trip)}
                    onDelete={() => void handleDeleteTrip(trip.$id)}
                    isDeleting={deletingTripId === trip.$id}
                  />
                ))}
              </Stack>
              {activeTrip ? (
                <Stack >
                  <Heading size="md">
                    Itinerary preview for {activeTrip.destination || "your trip"}
                  </Heading>
                  <Text color={subtleColor}>
                    Created on {activeTrip.$createdAt?.slice(0, 10) ?? "Unknown date"}
                  </Text>
                  <IteneryResponseCard message={activeTrip.itenery} />
                </Stack>
              ) : null}
            </Stack>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default MyTripPage;
