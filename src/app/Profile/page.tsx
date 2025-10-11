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
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { checkAuthStatus } from "@/lib/appwrite.service";

const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
};
const PROFILE_FIELDS = ["firstName","lastName","email","phoneNumber","location"] as const;

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [initialProfile, setInitialProfile] = useState<ProfileForm | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [rowExists, setRowExists] = useState(false);

  const pageBg = useColorModeValue("#f6f7f8", "#101c22");
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const subtleColor = useColorModeValue("#6b7280", "#9ca3af");
  const highlightBg = useColorModeValue(
    "rgba(19, 164, 236, 0.08)",
    "rgba(19, 164, 236, 0.12)"
  );
  const dividerColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );

  useEffect(() => {
    async function bootstrapProfile() {
      const user = await checkAuthStatus();

      if (!user) {
        router.replace("/SignIn");
        return;
      }

      await fetchUserProfile();
    }

    void bootstrapProfile();
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
  setIsLoading(true);
  try {
    const user = await account.get();
    setUserId(user.$id);

    const row = await tablesDB.getRow({
      databaseId: DATABASE_ID,   // ← use the constant, not ""
      tableId: TABLE_ID,
      rowId: user.$id,
    });

    // Map top-level row fields → form (use defaults for null/undefined)
    const nextProfile = Object.fromEntries(
      PROFILE_FIELDS.map(k => [k, (row as any)[k] ?? ""])
    ) as ProfileForm;

    setProfile(nextProfile);           // ← at minimum, email will be filled
    setInitialProfile({ ...nextProfile });
    setRowExists(true);
    return nextProfile;
  } catch (error) {
    console.error("Error fetching user data:", error);
    setRowExists(false);
    setProfile(null);
    setInitialProfile(null);
    return null;
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange =
    (field: keyof ProfileForm) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profile || !userId) {
      return;
    }

    setIsSaving(true);

    try {
      if (rowExists) {
        await tablesDB.updateRow({
          databaseId: DATABASE_ID,
          tableId: TABLE_ID,
          rowId: userId,
          data: profile,
        });
      } else {
        await tablesDB.createRow({
          databaseId: DATABASE_ID,
          tableId: TABLE_ID,
          rowId: userId,
          data: profile,
        });
        setRowExists(true);
      }

      setInitialProfile({ ...profile });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const formFields: Array<{ label: string; field: keyof ProfileForm }> = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email", field: "email" },
    { label: "Phone Number", field: "phoneNumber" },
    { label: "Location", field: "location" },
  ];

  return (
    <Flex
      bg={pageBg}
      maxW="76rem"
      minH="100dvh"
      justify="center"
      px={{ base: 4, sm: 6 }}
      py={{ base: 8, lg: 12 }}
      m="auto"
    >
      <Box
        bg={cardBg}
        maxW="64rem"
        w="full"
        rounded="2xl"
        shadow="xl"
        p={{ base: 6, md: 10 }}
      >
        <Stack >
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            justify="space-between"
            flexDir={{ base: "column", sm: "row" }}
            gap={6}
          >
            {profile && (
              <Flex align="center" gap={4}>
                <Stack >
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
              colorScheme="blue" 
            >
              <MdEdit />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </Flex>

          <Separator borderColor={dividerColor} />

          <Stack
            as="form"
            
            
          >
            <Heading size="md">Personal Information</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
              {profile &&
                formFields.map(({ label, field }) => (
                  <Box key={field}>
                    <Text
                      fontSize="sm"
                      textTransform="uppercase"
                      color={subtleColor}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      mb={1}
                    >
                      {label}
                    </Text>
                    <Input
                      value={profile[field]}
                      fontWeight="medium"
                      focusRingColor="blue.200"
                     
                      onChange={handleInputChange(field)}
                    />
                  </Box>
                ))}
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
          </Stack>

          <Box bg={highlightBg} rounded="xl" p={{ base: 5, md: 6 }}>
            <Stack >
              <Heading size="sm">Stay Trip-Ready</Heading>
              <Text color={subtleColor}>
                Keep your contact details current so we can tailor itineraries
                and send timely updates for your next adventure.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
