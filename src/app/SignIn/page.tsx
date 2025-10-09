"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.client";
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
import { useColorModeValue } from "@/components/ui/color-mode";

import NextLink from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";



const INITIAL_ERROR_STATE = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
  email: "",
  password: "",
});
  const [formErrors, setFormErrors] = useState(INITIAL_ERROR_STATE);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const cardBg = useColorModeValue("white", "gray.900");
  const mutedText = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const handleChange =
    (field: "email" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
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

    setFormErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    setLoading(true);

    const user = await account.createEmailPasswordSession({
    email: formValues.email.trim(),
    password: formValues.password
});

   if(user) {
    router.replace('/Dashboard');
    setLoading(false);
   }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  const handleGoogleSignIn = () => {};

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
            <Heading size="xl">Welcome back</Heading>
            <Text color={mutedText}>
              Sign in to your account to continue planning your next trip.
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
              <form onSubmit={handleSubmit}>
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

                  <Button 
                  type="submit" 
                  colorScheme="pink" 
                  loading={loading}                 
                  >
                    Sign in
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

              <Button type="button">
                <FcGoogle />
                Sign in with Google
              </Button>

              <Text fontSize="sm" color={mutedText} textAlign="center">
                New here?{" "}
                <Link
                  as={NextLink}
                  href="/SignUp"
                  color="pink.500"
                  fontWeight="semibold"
                >
                  Create an account
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
}
