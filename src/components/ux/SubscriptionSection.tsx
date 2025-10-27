"use client";

import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import SubscriptionCard, { type SubscriptionCardProps } from "./SubscriptionCard";

const plans: SubscriptionCardProps[] = [
  {
    name: "Basic",
    price: "Free",
    priceSuffix: "/forever",
    ctaLabel: "Get Started",
    features: [
      "Personalized Itineraries",
      "Real-Time Updates",
      "Basic Budget Optimization",
    ],
  },
  {
    name: "Premium",
    price: "$19",
    priceSuffix: "/month",
    ctaLabel: "Upgrade Now",
    features: [
      "Everything in Basic, plus:",
      "Advanced Budget Optimization",
      "Priority Support",
      "Offline Access",
    ],
    badgeLabel: "Most Popular",
    highlighted: true,
    ctaVariant: "solid",
  },
  {
    name: "Ultimate",
    price: "$49",
    priceSuffix: "/month",
    ctaLabel: "Choose Ultimate",
    features: [
      "Everything in Premium, plus:",
      "Dedicated Travel Concierge",
      "Exclusive Discounts",
      "Early Access to New Features",
    ],
  },
];

export default function SubscriptionSection() {
  const headingColor = useColorModeValue("gray.900", "white");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box as="section" py={{ base: 16, sm: 24 }}>
      <Container maxW="7xl">
        <Stack  maxW="2xl" textAlign="center" mx="auto">
          <Heading as="h2" size="xl" fontWeight="extrabold" color={headingColor}>
            Choose Your Plan
          </Heading>
          <Text fontSize="lg" color={subheadingColor}>
            Start for free, or unlock powerful features with our premium plans.
          </Text>
        </Stack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={4}
          mt={12}
          maxW="6xl"
          mx="auto"
        >
          {plans.map((plan) => (
            <SubscriptionCard key={plan.name} {...plan} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
