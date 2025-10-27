"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import NextLink from "next/link";
import { account, ID, tablesDB } from "@/lib/appwrite.client";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInWithGoolge } from "@/lib/appwrite.service";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const INITIAL_ERROR_STATE = {
  email: "",
  password: "",
};

export default function SignUpPage() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  /* const [formErrors, setFormErrors] = useState(INITIAL_ERROR_STATE); */
  /* const [isSubmitting, setIsSubmitting] = useState(false); */
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const cardBg = useColorModeValue("white", "gray.900");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const router = useRouter();

  const handleChange =
    (field: "email" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
      /* setFormErrors((prev) => ({ ...prev, [field]: "" })); */
    };

  const validate = () => {
    const nextErrors = { ...INITIAL_ERROR_STATE };
    if (!formValues.email) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (!formValues.password) {
      nextErrors.password = "Password is required";
    }

    /* setFormErrors(nextErrors); */
    return !nextErrors.email && !nextErrors.password;
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      // create user
      const user = await account.create({
        userId: ID.unique(),
        email: formValues.email,
        password: formValues.password,
      });

      //create a session for the browser
      await account.createEmailPasswordSession({
        email: formValues.email,
        password: formValues.password,
      });

      await tablesDB.createRow({
        databaseId: "68ea1c19002774b84c21",
        tableId: "user_profiles",
        rowId: user.$id,
        data: {
          email: user.email,
        },
      });

      if (user) {
        console.log("SignUp successful", user);
        setLoading(false);
        router.replace("/Dashboard");
        
      }
    } catch (error) {
      console.error("Error signing up", error);
      return null;
    }

    /* setIsSubmitting(true); */

    setTimeout(() => {
      /* setIsSubmitting(false); */
    }, 800);
  };

  const handleGoogleSignUp = async () => {
    
    try {
      setGoogleLoading(true);
      const successURL = `${window.location.origin}/Dashboard`;
      const failureURL = `${window.location.origin}/SignIn`;

       await signInWithGoolge(successURL, failureURL);


    } catch (error) {
      console.error("Error in login with Google", error);
      router.replace("/SignIn");
    }
  };

  return (
    <Flex
      as="main"
      align="center"
      justify="center"
      minH="calc(100vh - 80px)"
      py={{ base: 12, md: 16 }}
      px={4}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Container maxW="lg" p={0}>
        <Stack>
          <Stack textAlign="center">
            <Heading size="xl">Create an Account</Heading>
            <Text color={mutedText}>
              Sign Up to experience new ways of tripping!
            </Text>
          </Stack>

          <Box
            as="section"
            bg={cardBg}
            borderWidth={1}
            borderColor={borderColor}
            borderRadius="xl"
            boxShadow="lg"
            p={{ base: 6, md: 10 }}
          >
            <Stack>
              <form onSubmit={handleSignUp}>
                <Stack gap={8}>
                  <Input
                    id="email"
                    type="email"
                    focusRingColor={"pink.subtle"}
                    value={formValues.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                    placeholder="your@email.com"
                  />

                  <Box>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      focusRingColor={"pink.subtle"}
                      position="relative"
                      value={formValues.password}
                      onChange={handleChange("password")}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                    />

                    <Button
                      variant="ghost"
                      size="sm"
                      position="absolute"
                      right={{ base: 8, md: 10 }}
                      bottom={{ base: 204, md: 220 }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </Box>

                  <Button type="submit" colorScheme="pink" loading={loading}>
                    Sign up
                  </Button>
                </Stack>
              </form>

              <Flex
                display={"flex"}
                justifyContent={"center"}
                align="center"
                gap={3}
                color={mutedText}
                fontSize="sm"
              >
                <div className="divider"></div>
                <Text>or</Text>
                <div className="divider"></div>
              </Flex>

              <Button
                type="button"
                loading={googleLoading}
                onClick={handleGoogleSignUp}
              >
                <FcGoogle />
                Sign up with Google
              </Button>

              <Text fontSize="sm" color={mutedText} textAlign="center">
                Already Registered?{" "}
                <Link
                  as={NextLink}
                  href="/SignIn"
                  color="pink.500"
                  fontWeight="semibold"
                >
                  Sign In
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
}
