"use client";

import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { useColorModeValue } from "../ui/color-mode";

export interface SubscriptionCardProps {
  name: string;
  price: string;
  priceSuffix?: string;
  ctaLabel: string;
  features: string[];
  badgeLabel?: string;
  highlighted?: boolean;
  ctaVariant?: "solid" | "subtle";
}

export default function SubscriptionCard({
  name,
  price,
  priceSuffix = "",
  ctaLabel,
  features,
  badgeLabel,
  highlighted = false,
  ctaVariant = highlighted ? "solid" : "subtle",
}: SubscriptionCardProps) {
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const highlightedBorder = useColorModeValue("pink.500", "pink.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const priceColor = useColorModeValue("gray.900", "white");
  const featureColor = useColorModeValue("gray.600", "gray.400");

  const subtleCtaBg = useColorModeValue("pink.100", "pink.500");
  const subtleCtaHoverBg = useColorModeValue("pink.200", "pink.400");
  const subtleCtaColor = useColorModeValue("pink.600", "pink.100");

  const solidCtaBg = useColorModeValue("pink.500", "pink.400");
  const solidCtaHoverBg = useColorModeValue("pink.600", "pink.300");
  const solidCtaColor = useColorModeValue("white", "gray.900");

  const isSolid = ctaVariant === "solid";

  return (
    <Box
      display="flex"
      flexDirection="column"
      rounded="xl"
      borderWidth={highlighted ? "2px" : "1px"}
      borderColor={highlighted ? highlightedBorder : cardBorder}
      bg={cardBg}
      p={8}
      boxShadow={highlighted ? "2xl" : "lg"}
      position="relative"
    >
      {badgeLabel ? (
        <Badge
          variant={'solid'}
          colorPalette={'pink'}
          position="absolute"
          top={-3}
          right={4}          
          colorScheme="pink"
          rounded="md"
          px={3}
          py={1}
          fontWeight="semibold"
        >
          {badgeLabel}
        </Badge>
      ) : null}

      <Stack >
        <Heading as="h3" size="lg" fontWeight="bold" color={headingColor}>
          {name}
        </Heading>
        <HStack align="baseline"  color={priceColor}>
          <Text fontSize="5xl" fontWeight="extrabold" lineHeight="1">
            {price}
          </Text>
          {priceSuffix ? (
            <Text fontSize="xl" fontWeight="semibold">
              {priceSuffix}
            </Text>
          ) : null}
        </HStack>
        <Button
          as="a"                   
          bg={isSolid ? solidCtaBg : subtleCtaBg}
          color={isSolid ? solidCtaColor : subtleCtaColor}
          fontWeight="semibold"
          rounded="lg"
          py={3}
          _hover={{ bg: isSolid ? solidCtaHoverBg : subtleCtaHoverBg }}
          boxShadow={highlighted ? "xl" : undefined}
        >
          {ctaLabel}
        </Button>
      </Stack>

      <List.Root  mt={8} color={featureColor}>
        {features.map((feature) => (
          <ListItem key={feature} display="flex" alignItems="center" gap={3}>
            <FiCheck />
            <Text>{feature}</Text>
          </ListItem>
        ))}
      </List.Root>
    </Box>
  );
}
