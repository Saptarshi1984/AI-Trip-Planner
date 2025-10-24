"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
interface IteneryResponseCardProps {
  message: string;
}

const IteneryResponseCard = ({ message }: IteneryResponseCardProps) => {
  const cardBg = useColorModeValue("#ffffff", "#182830");
  const borderColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="xl"
      p={{ base: 6, md: 8 }}
    >
      <ReactMarkdown>{message}</ReactMarkdown>
    </Box>
  );
};

export default IteneryResponseCard;
