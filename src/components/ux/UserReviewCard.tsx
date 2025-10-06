"use client";

import { AspectRatio, Box, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

export interface UserReviewCardProps {
  quote: string;
  author: string;
  age?: number;
  imageUrl: string;
}

export default function UserReviewCard({
  quote,
  author,
  age,
  imageUrl,
}: UserReviewCardProps) {
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const quoteColor = useColorModeValue("gray.800", "gray.200");
  const footerColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      rounded="xl"
      bg={cardBg}
      p={6}
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <AspectRatio w="full" ratio={1}>
        <Box
          rounded="lg"
          overflow="hidden"
          bgImage={`url(${imageUrl})`}
          bgSize="cover"
          
        />
      </AspectRatio>

      <Stack  flex={1}>
        <Box as="blockquote" flex={1}>
          <Text color={quoteColor}>
            “{quote}”
          </Text>
        </Box>
        <Text fontSize="sm" fontWeight="medium" color={footerColor}>
          {age ? `${author}, ${age}` : author}
        </Text>
      </Stack>
    </Box>
  );
}
