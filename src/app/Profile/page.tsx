"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { account, tablesDB } from "@/lib/appwrite.client";

import {
  Input,
  Box,
  Button,
  Separator,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { MdEdit } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { checkAuthStatus } from "@/lib/appwrite.service";
import AccountSidebarNav from "@/components/ux/AccountSidebarNav";

const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureURL: string;
  phoneNumber: string;
  location: string;
};

const PROFILE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "profilePictureURL",
  "phoneNumber",
  "location",
] as const;

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [initialProfile, setInitialProfile] = useState<ProfileForm | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const foregroundColor = useColorModeValue("#0a0a0a", "#f7f7f7");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");
  const highlightBg = useColorModeValue(
    "rgba(19, 164, 236, 0.08)",
    "rgba(19, 164, 236, 0.12)"
  );
  const dividerColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );
  const pathname = usePathname();
  const displayName =
    profile && `${profile.firstName} ${profile.lastName}`.trim() !== ""
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "Traveler";

  useEffect(() => {
    async function getCurrentUser() {
      const user = await checkAuthStatus();

      if (!user) {
        router.replace("/SignIn");
        return;
      }

      await fetchUserProfile();
    }

    void getCurrentUser();
  }, [router]);

  const handleEditToggle = () => {
    if (!profile) {
      return;
    }

    if (isEditing && initialProfile) {
      setProfile({ ...initialProfile });
    }

    setIsEditing((prev) => !prev);
  };

  const fetchUserProfile = async () => {
    try {
      const user = await account.get();

      setUserId(user.$id);

      const row = await tablesDB.getRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: user.$id,
      });

      const rowRecord = row as Record<string, string | null | undefined>;
      const nextProfile = Object.fromEntries(
        PROFILE_FIELDS.map((field) => [field, rowRecord[field] ?? ""])
      ) as ProfileForm;

      setProfile(nextProfile);
      setInitialProfile({ ...nextProfile });

      return nextProfile;
    } catch (error) {
      console.error("Error fetching user data:", error);

      setProfile(null);
      setInitialProfile(null);

      return null;
    } finally {
    }
  };

  const handleInputChange =
    (field: keyof ProfileForm) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile || !userId) return;

    try {
      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: userId, // row was created at sign-up
        data: {
          firstName: profile.firstName ?? "",
          lastName: profile.lastName ?? "",
          email: profile.email ?? "",
          phoneNumber: profile.phoneNumber ?? "",
          location: profile.location ?? "",
          profilePictureURL: profile.profilePictureURL ?? "",
        },
      });

      setInitialProfile({ ...profile });

      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
    }
  };

  const labelProps = {
    fontSize: "sm",
    textTransform: "uppercase" as const,
    color: subtleColor,
    fontWeight: "semibold",
    letterSpacing: "wide",
    mb: 1,
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
        <Stack>
          <Stack id="sideNavBar">
            <AccountSidebarNav pathname={pathname} />
          </Stack>
        </Stack>

        <Stack>
          <Text fontWeight="bold">{displayName}</Text>

          <ChakraLink
            as={NextLink}
            href="/Dashboard"
            fontSize="sm"
            color={subtleColor}
            _hover={{ color: PRIMARY_COLOR, textDecoration: "none" }}
          >
            Back to Dashboard
          </ChakraLink>
        </Stack>
      </Flex>

      <Box flex="1" p={{ base: 6, lg: 12 }}>
        <Box
          bg={cardBg}
          maxW="64rem"
          w="full"
          rounded="2xl"
          shadow="xl"
          p={{ base: 6, md: 10 }}
        >
          <Stack>
            <Flex
              align={{ base: "flex-start", sm: "center" }}
              justify="space-between"
              flexDir={{ base: "column", sm: "row" }}
              gap={6}
            >
              {profile && (
                <Flex align="center" gap={6}>
                  <Stack>
                    <Heading size="lg">
                      {`${profile.firstName} ${profile.lastName}`}
                    </Heading>
                    <Text color={subtleColor}>Travel Enthusiast</Text>
                  </Stack>
                </Flex>
              )}
              <Button
                type="button"
                onClick={handleEditToggle}
                variant={isEditing ? "outline" : "solid"}
                borderRadius="full"
                px={{ base: 6, md: 8 }}
                colorPalette={!isEditing ? "white" : "red"}
              >
                {!isEditing && <MdEdit />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </Flex>

            <Separator borderColor={dividerColor} />

            <Heading size="md">Personal Information</Heading>
            <form onSubmit={handleSubmit}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
                {profile && (
                  <>
                    <Box>
                      <Text {...labelProps}>First Name</Text>
                      <Input
                        value={profile.firstName}
                        fontWeight="medium"
                        focusRingColor="blue.200"
                        onChange={handleInputChange("firstName")}
                        disabled={!isEditing}
                        borderWidth={isEditing ? 1 : 0}
                        borderColor={"cyan.700"}
                        _focus={{ borderColor: "cyan.500" }}
                      />
                    </Box>
                    <Box>
                      <Text {...labelProps}>Last Name</Text>
                      <Input
                        value={profile.lastName}
                        fontWeight="medium"
                        focusRingColor="blue.200"
                        onChange={handleInputChange("lastName")}
                        disabled={!isEditing}
                        borderWidth={isEditing ? 1 : 0}
                        borderColor={"cyan.700"}
                        _focus={{ borderColor: "cyan.500" }}
                      />
                    </Box>
                    <Box>
                      <Text {...labelProps}>Email</Text>
                      <Input
                        value={profile.email}
                        fontWeight="medium"
                        focusRingColor="blue.200"
                        onChange={handleInputChange("email")}
                        disabled={!isEditing}
                        borderWidth={isEditing ? 1 : 0}
                        borderColor={"cyan.700"}
                        _focus={{ borderColor: "cyan.500" }}
                      />
                    </Box>
                    <Box>
                      <Text {...labelProps}>Phone Number</Text>
                      <Input
                        value={profile.phoneNumber}
                        fontWeight="medium"
                        focusRingColor="blue.200"
                        onChange={handleInputChange("phoneNumber")}
                        disabled={!isEditing}
                        borderWidth={isEditing ? 1 : 0}
                        borderColor={"cyan.700"}
                        _focus={{ borderColor: "cyan.500" }}
                      />
                    </Box>
                    <Box>
                      <Text {...labelProps}>Location</Text>
                      <Input
                        value={profile.location}
                        fontWeight="medium"
                        focusRingColor="blue.200"
                        onChange={handleInputChange("location")}
                        disabled={!isEditing}
                        borderWidth={isEditing ? 1 : 0}
                        borderColor={"cyan.700"}
                        _focus={{ borderColor: "cyan.500" }}
                      />
                    </Box>
                  </>
                )}
              </SimpleGrid>

              {isEditing && profile && (
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
                    loadingText="Saving"
                  >
                    Save Changes
                  </Button>
                </Flex>
              )}
            </form>

            <Box bg={highlightBg} rounded="xl" p={{ base: 5, md: 6 }}>
              <Stack>
                <Heading size="sm">Stay Trip-Ready</Heading>
                <Text color={subtleColor}>
                  Keep your contact details current so we can tailor itineraries
                  and send timely updates for your next adventure.
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
