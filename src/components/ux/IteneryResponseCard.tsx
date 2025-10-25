"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
interface IteneryResponseCardProps {
  message: string;
}

const components = {
  h1: (props: any) => <Heading as="h1" size="2xl" mt={8} mb={3} color={'cyan.500'} {...props} />,
  h2: (props: any) => <Heading as="h2" size="xl" mt={7} mb={2} color={'cyan.400'} {...props} />,
  h3: (props: any) => <Heading as="h3" size="md" mt={6} mb={2} color={'orange.400'} {...props} />,
  p:  (props: any) => <Text lineHeight="tall" my={3} {...props} />,
};

const IteneryResponseCard = ({ message }: IteneryResponseCardProps) => {
  const cardBg = useColorModeValue("gray.700", "#182830");
  const borderColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );

  return (
    <Box
      bg={cardBg}
      fontSize={18}
      color='#BEBFC5'
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="xl"
      p={{ base: 6, md: 8 }}      
    >
           
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {message}
      </ReactMarkdown>
      
      
    </Box>
  );
};

export default IteneryResponseCard;
