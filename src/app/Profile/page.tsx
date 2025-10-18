"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
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
import UserProfileCard from "@/components/ux/UserProfileCard";


const PRIMARY_COLOR = "#13a4ec";
const DATABASE_ID = "68ea1c19002774b84c21";
const TABLE_ID = "user_profiles";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  userPictureURL:string;
  phoneNumber: string;
  location: string;
};
const PROFILE_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "userPictureURL",
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
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [rowExists, setRowExists] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  

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
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: user.$id,
      });

      
      // Map top-level row fields to the form shape (use defaults for null/undefined)
      const rowRecord = row as Record<string, string | null | undefined>;
      const nextProfile = Object.fromEntries(
        PROFILE_FIELDS.map((field) => [field, rowRecord[field] ?? ""])
      ) as ProfileForm;

      setProfile(nextProfile);
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

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read image file"));
        }
      };

      reader.onerror = () => {
        reject(reader.error ?? new Error("Failed to read image file"));
      };

      reader.readAsDataURL(file);
    });

  const handleProfileImageSelect = async (file: File) => {
    if (!userId) {
      return;
    }

    const previousURL = profile?.userPictureURL ?? "";
    const profileSnapshot = profile;

    setIsUploadingImage(true);
    try {
      const dataUrl = await readFileAsDataURL(file);

      setProfile((prev) =>
        prev ? { ...prev, userPictureURL: dataUrl } : prev
      );

      if (rowExists) {
        await tablesDB.updateRow({
          databaseId: DATABASE_ID,
          tableId: TABLE_ID,
          rowId: userId,
          data: {
            userPictureURL: dataUrl,
          },
        });
      } else {
        await tablesDB.createRow({
          databaseId: DATABASE_ID,
          tableId: TABLE_ID,
          rowId: userId,
          data: {
            firstName: profileSnapshot?.firstName ?? "",
            lastName: profileSnapshot?.lastName ?? "",
            email: profileSnapshot?.email ?? "",
            phoneNumber: profileSnapshot?.phoneNumber ?? "",
            location: profileSnapshot?.location ?? "",
            userPictureURL: dataUrl,
          },
        });
      }

      setInitialProfile((prev) =>
        prev ? { ...prev, userPictureURL: dataUrl } : prev
      );
      setRowExists(true);
    } catch (err) {
      console.error("Failed to update profile picture:", err);
      setProfile((prev) =>
        prev ? { ...prev, userPictureURL: previousURL } : prev
      );
    } finally {
      setIsUploadingImage(false);
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

    setIsSaving(true);
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
          userPictureURL: profile.userPictureURL ?? "",
        },
      });

      setInitialProfile({ ...profile });
      setRowExists(true);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      // If this ever throws 404, your sign-up didn't actually create the row.
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
          
          
          <UserProfileCard profileURL={profile?.userPictureURL ? profile?.userPictureURL : '/noProfile.png' } />
          <form onSubmit={handleSubmit}>
            
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
                      disabled={!isEditing}
                      borderWidth={isEditing ? 1 : 0}
                      borderColor={'cyan.700'}
                      _focus={{ borderColor: "cyan.500" }}                      
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
    </Flex>
  );
};

export default ProfilePage;
