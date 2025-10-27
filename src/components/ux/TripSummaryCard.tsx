"use client";

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

export interface TripSummaryCardProps {
  location: string;
  startDate: string | Date;
  endDate: string | Date;
  budget: number | string;
  travellers: number | string;
  currency?: string;
  onView?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

const formatDate = (value: string | Date) => {
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

const formatBudget = (budget: number | string, currency: string) => {
  if (typeof budget === "number") {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(budget);
  }
  return String(budget);
};

const TripSummaryCard = ({
  location,
  startDate,
  endDate,
  budget,
  travellers,
  currency = "USD",
  onView,
  onDelete,
  isDeleting = false,
}: TripSummaryCardProps) => {
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.900", "white");
  const metaColor = useColorModeValue("gray.600", "gray.300");
  const budgetBadgeBg = useColorModeValue("cyan.100", "cyan.500");
  const budgetBadgeColor = useColorModeValue("cyan.700", "cyan.100");
  const travellersBadgeBg = useColorModeValue("orange.100", "orange.500");
  const travellersBadgeColor = useColorModeValue("orange.700", "orange.100");

  const formattedBudget = formatBudget(budget, currency);
  const travellersLabel =
    typeof travellers === "number" ? String(travellers) : travellers || "N/A";

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      rounded="2xl"
      p={{ base: 6, md: 7 }}
      boxShadow="lg"
    >
      <Stack>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={4}
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
        >
          <Heading as="h3" size="lg" fontWeight="bold" color={headingColor}>
            {location}
          </Heading>
          <Flex gap={2} wrap="wrap">
            <Badge
              px={3}
              py={1}
              rounded="full"
              bg={budgetBadgeBg}
              color={budgetBadgeColor}
              fontWeight="semibold"
            >
              Budget: {formattedBudget}
            </Badge>
            <Badge
              px={3}
              py={1}
              rounded="full"
              bg={travellersBadgeBg}
              color={travellersBadgeColor}
              fontWeight="semibold"
            >
              Travellers: {travellersLabel}
            </Badge>
          </Flex>
        </Flex>

        <Text fontSize="md" color={metaColor}>
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>

        <Flex justify="flex-end" gap={3} wrap="wrap">
          <Button
            variant="outline"
            colorPalette="gray"
            onClick={onView}
            disabled={!onView}
          >
            View
          </Button>
          <Button
            variant="solid"
            colorPalette="red"
            onClick={onDelete}
            disabled={!onDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default TripSummaryCard;
