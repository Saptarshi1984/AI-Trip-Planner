"use client";

import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import FeatureCard, { type FeatureCardProps } from "./FeatureCard";
import { FiDollarSign, FiMapPin, FiRefreshCw } from "react-icons/fi";
import { useColorModeValue } from "../ui/color-mode";

const features: FeatureCardProps[] = [
  {
    title: "Personalized Itineraries",
    description:
      "Receive custom-designed itineraries based on your preferences, travel style, and interests.",
    icon: <FiMapPin size={28} />,
  },
  {
    title: "Real-Time Updates",
    description:
      "Stay informed with live updates on flights, accommodations, and activities for a smooth journey.",
    icon: <FiRefreshCw size={28} />,
  },
  {
    title: "Budget Optimization",
    description:
      "Maximize your travel budget with smart recommendations and cost-saving strategies.",
    icon: <FiDollarSign size={28} />,
  },
];

export default function FeaturesSection() {
  const headingColor = useColorModeValue("gray.200", "white");
  const subheadingColor = useColorModeValue("gray.400", "gray.200");

  return (
    <Box as="section" py={{ base: 16, sm: 24 }} overflow='hidden' bg={'gray.900'} mt={4}>
      <Container maxW="7xl">
        <Stack  maxW="2xl" textAlign="center" mx="auto">
          <Heading as="h2" size="2xl" fontWeight="extrabold" color={headingColor}>
            Key Features
          </Heading>
          <Text fontSize="lg" color={subheadingColor}>
            Discover how WanderWise makes travel planning effortless and enjoyable.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}  mt={12}>
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
