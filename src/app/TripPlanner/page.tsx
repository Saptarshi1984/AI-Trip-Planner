"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import {
  Badge,
  Box,
  Button,
  Separator,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { account, tablesDB, ID } from "@/lib/appwrite.client";
import AccountSidebarNav from "@/components/ux/AccountSidebarNav";
import IteneryResponseCard from "@/components/ux/IteneryResponseCard";
import GoogleImageSearch from "@/components/ux/GoogleImageSearch";

const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";
const ITINERARY_TABLE_ID = "user_iteneries";

type TripPlannerForm = {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  interests: string;
};

const defaultForm: TripPlannerForm = {
  destination: "",
  startDate: "",
  endDate: "",
  travelers: "solo",
  budget: "medium",
  interests: "",
};

const TripPlannerPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [formState, setFormState] = useState<TripPlannerForm>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itenery, setItenery] = useState<string | "">("");
  const [isSavingItinerary, setIsSavingItinerary] = useState(false);
  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");
  const inputBg = useColorModeValue("#ffffff", "#0f1c24");
  const inputBorder = useColorModeValue(
    "rgba(19, 164, 236, 0.24)",
    "rgba(19, 164, 236, 0.36)"
  );
  const inputColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const dividerColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );

  const baseFieldStyles = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: `1px solid ${inputBorder}`,
    backgroundColor: inputBg,
    color: inputColor,
    fontSize: "1rem",
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  } as const;

  const handleFieldFocus = (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    event.currentTarget.style.borderColor = PRIMARY_COLOR;
    event.currentTarget.style.boxShadow = "0 0 0 1px rgba(19, 164, 236, 0.4)";
  };

  /*   const handleFieldBlur = (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    event.currentTarget.style.borderColor = inputBorder;
    event.currentTarget.style.boxShadow = "none";
  }; */

  useEffect(() => {
    async function getCurrentUser() {
      const user = await checkAuthStatus();

      if (!user) {
        router.replace("/SignIn");
      }
    }

    void getCurrentUser();
  }, [router]);

  const handleChange =
    (field: keyof TripPlannerForm) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { value } = event.target;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.destination) return;

    //getting user location from user profile database
    const accountUser = await account.get();

    const row = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: accountUser.$id,
    });

    const userLocation = row.location;
    setIsSubmitting(true);

    try {
      const payload = {
        ...formState,
        startLocation: userLocation.trim(),
        destination: formState.destination.trim(),
        travelers: formState.travelers.trim(),
        startDate: formState.startDate.trim(),
        endDate: formState.endDate.trim(),
        budget: formState.budget.trim(),
        interests: formState.interests.trim(),
      };

      const res = await fetch("/api/trip-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as {
        ok?: boolean;
        itenery?: string;
        error?: string;
      };

      setItenery(data.itenery ?? "");
      console.log("Trip agent response:", itenery);
    } catch (error) {
      console.log("An error occured in AI response!");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelItenery = () => {
    setItenery("");
  };

  const handleSaveItenery = async (content: string) => {
    if (!content || isSavingItinerary) {
      return;
    }

    //getting user location from user profile database
    const user = await account.get();

    const row = await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: user.$id,
    });

    const userLocation = row.location;

    try {
      setIsSavingItinerary(true);

      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ITINERARY_TABLE_ID,
        rowId: ID.unique(),
        data: {
          userId: user.$id,
          itenery: typeof content === "string" ? content : String(content),
          startLocation: userLocation.trim(),
          destination: formState.destination.trim() || "Custom itinerary",
          startDate: formState.startDate.trim(),
          endDate: formState.endDate.trim(),
          travellers: formState.travelers.trim(),
          budget: formState.budget.trim(),
          interests: formState.interests.trim(),
        },
      });
      
    } catch (error) {
      console.error("Failed to save itinerary", error);
    } finally {
      setIsSavingItinerary(false);
    }
  };

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
            Ready to explore?
          </Text>
          <Text>Start shaping your itinerary and revisit anytime.</Text>
        </Stack>
      </Flex>

      <Box flex="1" p={{ base: 6, lg: 12 }}>
        <Stack maxW="64rem" w="full" mx="auto">
          <Stack>
            <Badge
              alignSelf="flex-start"
              bg="rgba(19, 164, 236, 0.1)"
              color={PRIMARY_COLOR}
              rounded="full"
              px={4}
              py={1}
              fontWeight="semibold"
            >
              Plan a Trip
            </Badge>
            <Heading size="2xl">
              {itenery == ""
                ? "Design your next adventure"
                : `Your AI crafted Iteneries for ${formState.destination}`}
            </Heading>
            <Text color={subtleColor} maxW="40rem">
              {itenery == ""
                ? `Share a few details about where you would like to go and what you
              want to experience. Our AI itinerary builder will handle the rest,
              from finding highlights to balancing your schedule.`
                : `If you are not satisfied with the results try different keywords!`}
            </Text>
          </Stack>

          {itenery == "" && (
            <Box bg={cardBg} rounded="2xl" shadow="xl" p={{ base: 6, md: 10 }}>
              <Stack>
                <Stack>
                  <Heading size="md">Trip preferences</Heading>
                  <Text color={subtleColor}>
                    The more detail you share, the more tailored your plan will
                    be.
                  </Text>
                </Stack>

                <form onSubmit={handleSubmit}>
                  <Stack>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                      <Stack>
                        <Text
                          fontSize="sm"
                          textTransform="uppercase"
                          color={subtleColor}
                        >
                          Destination
                        </Text>
                        <input
                          required
                          value={formState.destination}
                          onChange={handleChange("destination")}
                          placeholder="e.g. Kyoto, Japan"
                          style={baseFieldStyles}
                          onFocus={handleFieldFocus}
                          /* onBlur={handleFieldBlur} */
                        />
                      </Stack>

                      <Stack>
                        <Text
                          fontSize="sm"
                          textTransform="uppercase"
                          color={subtleColor}
                        >
                          Travelers
                        </Text>
                        <select
                          value={formState.travelers}
                          onChange={handleChange("travelers")}
                          style={{
                            ...baseFieldStyles,
                            paddingRight: "2.75rem",
                          }}
                          onFocus={handleFieldFocus}
                          /* onBlur={handleFieldBlur} */
                        >
                          <option value="solo">Solo</option>
                          <option value="couple">Couple</option>
                          <option value="family">Family</option>
                          <option value="friends">Friends</option>
                        </select>
                      </Stack>

                      <Stack>
                        <Text
                          fontSize="sm"
                          textTransform="uppercase"
                          color={subtleColor}
                        >
                          Start date
                        </Text>
                        <input
                          type="date"
                          value={formState.startDate}
                          onChange={handleChange("startDate")}
                          style={baseFieldStyles}
                          onFocus={handleFieldFocus}
                          /* onBlur={handleFieldBlur} */
                        />
                      </Stack>

                      <Stack>
                        <Text
                          fontSize="sm"
                          textTransform="uppercase"
                          color={subtleColor}
                        >
                          End date
                        </Text>
                        <input
                          type="date"
                          value={formState.endDate}
                          onChange={handleChange("endDate")}
                          style={baseFieldStyles}
                          onFocus={handleFieldFocus}
                          /*  onBlur={handleFieldBlur} */
                        />
                      </Stack>

                      <Stack>
                        <Text
                          fontSize="sm"
                          textTransform="uppercase"
                          color={subtleColor}
                        >
                          Budget
                        </Text>
                        <select
                          value={formState.budget}
                          onChange={handleChange("budget")}
                          style={{
                            ...baseFieldStyles,
                            paddingRight: "2.75rem",
                          }}
                          onFocus={handleFieldFocus}
                          /* onBlur={handleFieldBlur} */
                        >
                          <option value="saver">Saver</option>
                          <option value="medium">Balanced</option>
                          <option value="premium">Premium</option>
                        </select>
                      </Stack>
                    </SimpleGrid>

                    <Stack>
                      <Text
                        fontSize="sm"
                        textTransform="uppercase"
                        color={subtleColor}
                      >
                        Must-see experiences or notes
                      </Text>
                      <textarea
                        value={formState.interests}
                        onChange={handleChange("interests")}
                        placeholder="Tell us what you love - food, museums, hidden cafes, local tours..."
                        style={{
                          ...baseFieldStyles,
                          minHeight: "8rem",
                          resize: "vertical",
                        }}
                        onFocus={handleFieldFocus}
                        /* onBlur={handleFieldBlur} */
                      />
                    </Stack>

                    <Flex justify="flex-end">
                      <Button
                        type="submit"
                        bg={PRIMARY_COLOR}
                        color="white"
                        rounded="full"
                        px={{ base: 6, md: 8 }}
                        py={{ base: 3, md: 4 }}
                        fontWeight="semibold"
                        _hover={{ bg: "rgba(19, 164, 236, 0.9)" }}
                        _active={{ bg: "rgba(19, 164, 236, 0.8)" }}
                        loadingText="Planning"
                        loading={isSubmitting}
                      >
                        Generate itinerary
                      </Button>
                    </Flex>
                  </Stack>
                </form>
              </Stack>
            </Box>
          )}

          {itenery == "" ? (
            <Box bg={cardBg} rounded="2xl" shadow="md" p={{ base: 6, md: 10 }}>
              <Stack>
                <Stack>
                  <Heading size="md">What happens next?</Heading>
                  <Text color={subtleColor}>
                    You will receive a draft itinerary that you can tweak and
                    share. Here is what our AI focuses on when building your
                    trip.
                  </Text>
                </Stack>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                  <Stack>
                    <Heading size="sm">Curated highlights</Heading>
                    <Text color={subtleColor}>
                      Discover iconic landmarks, hidden gems, and local
                      favorites tailored to your interests.
                    </Text>
                  </Stack>
                  <Stack>
                    <Heading size="sm">Balanced pacing</Heading>
                    <Text color={subtleColor}>
                      Each day is planned with a realistic mix of activities,
                      meals, and downtime so you can enjoy every moment.
                    </Text>
                  </Stack>
                  <Stack>
                    <Heading size="sm">Smart logistics</Heading>
                    <Text color={subtleColor}>
                      Recommendations include travel times and neighborhood tips
                      to keep your journey smooth from start to finish.
                    </Text>
                  </Stack>
                </SimpleGrid>

                <Separator borderColor={dividerColor} />

                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", md: "center" }}
                  gap={4}
                >
                  <Stack>
                    <Heading size="sm">Need help from a human expert?</Heading>
                    <Text color={subtleColor}>
                      Our travel specialists can review your draft itinerary and
                      add bespoke recommendations.
                    </Text>
                  </Stack>
                  <Button
                    variant="outline"
                    rounded="full"
                    px={{ base: 6, md: 8 }}
                    onClick={() => router.push("/Profile")}
                  >
                    Connect with support
                  </Button>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Box>
              <IteneryResponseCard
                message={itenery}
                onSave={handleSaveItenery}
                onCancel={handleCancelItenery}
                isSaving={isSavingItinerary}
              />
              <Separator />
              {itenery && (
                <GoogleImageSearch destination={formState.destination} />
              )}
            </Box>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default TripPlannerPage;
