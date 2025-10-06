"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function LandingPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Box as="section" position="relative" minH={{ base: "60vh", md: "60vh" }} overflow='hidden' >
      {/* Background image layer */}
      <Box position="absolute" top={0} right={0} bottom={0} left={0} zIndex={0}>
        <Image
          src="/hero.jpg"     
          alt="heroImage"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center", 
            transform: "scale(1.05)",
            filter: "blur(0.5px)",
          }}
        />
      </Box>

      {/* Dark overlay */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
        bg="blackAlpha.600"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Foreground content */}
      <Container
        maxW="7xl"
        px={{ base: 4, sm: 6, lg: 8 }}
        py={{ base: 24, sm: 32, lg: 48 }}
        position="relative"
        zIndex={2}
      >
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          gap={6}
          mx="auto"
          maxW="2xl"
        >
          <Heading as="h1" size="2xl" fontWeight="black" color="white" lineHeight="shorter">
            Your Dream Trip, Perfectly Planned
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.200">
            Let our AI craft your ideal itinerary, tailored to your interests and budget.
            Explore the world with ease and confidence.
          </Text>
          <Button
            size="lg"
            px={10}
            py={6}
            bg="pink.600"
            color="white"
            fontWeight="bold"
            rounded="lg"
            boxShadow="lg"
            transition="transform 0.2s ease"
            loading={loading}
            _hover={{ transform: "scale(1.05)", bg: "pink.500" }}                       
            onClick={() => {router.push('/SignIn'); setLoading(true)}}
          >
            Start Planning Your Adventure
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
