"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";
import type { HeadingProps, TextProps } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
interface IteneryResponseCardProps {
  message: string;
  onSave?: (message: string) => void | Promise<void>;
  onCancel?: () => void;
  isSaving?: boolean;
}

type MarkdownHeadingProps = HeadingProps & { node?: unknown };
type MarkdownTextProps = TextProps & { node?: unknown };

const components = {
  h1: (props: MarkdownHeadingProps) => {
    const { node, ...rest } = props;
    void node;
    return (
      <Heading as="h1" size="2xl" mt={8} mb={3} color={'cyan.500'} {...rest} />
    );
  },
  h2: (props: MarkdownHeadingProps) => {
    const { node, ...rest } = props;
    void node;
    return (
      <Heading as="h2" size="xl" mt={7} mb={2} color={'cyan.400'} {...rest} />
    );
  },
  h3: (props: MarkdownHeadingProps) => {
    const { node, ...rest } = props;
    void node;
    return (
      <Heading as="h3" size="md" mt={6} mb={2} color={'orange.400'} {...rest} />
    );
  },
  p: (props: MarkdownTextProps) => {
    const { node, ...rest } = props;
    void node;
    return <Text lineHeight="tall" my={3} {...rest} />;
  },
};

const IteneryResponseCard = ({
  message,
  onSave,
  onCancel,
  isSaving = false,
}: IteneryResponseCardProps) => {
  const cardBg = useColorModeValue("gray.700", "#182830");
  const borderColor = useColorModeValue(
    "rgba(19, 164, 236, 0.16)",
    "rgba(19, 164, 236, 0.32)"
  );
  const hasActions = Boolean(onSave || onCancel);

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
      <Stack >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {message}
        </ReactMarkdown>

        {hasActions && (
          <Flex justify="flex-end" gap={3} flexWrap="wrap">
            <Button
              variant="outline"
              colorPalette="gray"
              onClick={onCancel}
              
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorPalette="orange"
              onClick={() => onSave?.(message)}
              
              
            >
              Save
            </Button>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default IteneryResponseCard;
