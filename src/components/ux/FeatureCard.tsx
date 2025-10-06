"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import type { ReactNode } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("transparent", "gray.700");
  const titleColor = useColorModeValue("gray.900", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const iconBg = useColorModeValue("pink.100", "pink.500");
  const iconColor = useColorModeValue("pink.600", "pink.100");

  return (
    <Flex
      direction="column"
      align="center"
      gap={4}
      rounded="xl"
      bg={cardBg}
      textAlign="center"
      p={6}
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex
        h={12}
        w={12}
        align="center"
        justify="center"
        rounded="full"
        bg={iconBg}
        color={iconColor}
      >
        {icon}
      </Flex>
      <Heading as="h3" size="md" fontWeight="bold" color={titleColor}>
        {title}
      </Heading>
      <Text color={descriptionColor}>{description}</Text>
    </Flex>
  );
}
