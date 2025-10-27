"use client";

import {
  Box, 
  Flex,  
  SimpleGrid,
  Text,
  Link as ChakraLink,
  Image as ChakraImage,
  VStack,
  Spinner,
  Heading
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const PRIMARY_COLOR = "#13a4ec";

export type GoogleImageItem = {
  url: string;
  thumb?: string;
  context?: string;
  title?: string;
  mime?: string;
};

type GoogleImageSearchProps = {
  destination?: string | null;
};

export default function GoogleImageSearch({
  destination,
}: GoogleImageSearchProps) {
  /* const [query, setQuery] = useState(() => destination?.trim() ?? ""); */
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<GoogleImageItem[]>([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const lastAutoQueryRef = useRef("");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const cardHoverBorder = useColorModeValue("blue.200", "blue.300");
  const mutedText = useColorModeValue("gray.500", "gray.400");

  const fetchImages = useCallback(async (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) {
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/google-images?q=${encodeURIComponent(trimmedTerm)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to fetch images");
      }

      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";

      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    const normalizedDestination = destination?.trim() ?? "";
    if (
      normalizedDestination &&
      normalizedDestination !== lastAutoQueryRef.current
    ) {
      lastAutoQueryRef.current = normalizedDestination;
      /* setQuery(normalizedDestination); */
      void fetchImages(normalizedDestination);
    }
  }, [destination, fetchImages]);

  return (
    <Box
      maxW="960px"
      mx="auto"
      w="full"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
    >
      

      <Box mt={4}>
        {error ? (
          <Text color="red.500" fontWeight="medium">
            {error}
          </Text>
        ) : <Heading color="cyan.500" fontWeight="medium">
            Images of {destination}
          </Heading>}
      </Box>

      <Box mt={6}>
        {loading && !items.length ? (
          <Flex align="center" justify="center" py={16}>
            <VStack >
              <Spinner size="lg" color={PRIMARY_COLOR} />
              <Text color={mutedText}>Searching for photos...</Text>
            </VStack>
          </Flex>
        ) : null}

        {!loading && !error && hasSearched && items.length === 0 ? (
          <Flex align="center" justify="center" py={16}>
            <VStack >
              
              <Text color={mutedText} textAlign="center">
                No images found for
                {lastAutoQueryRef.current
                  ? ` "${lastAutoQueryRef.current}"`
                  : " that search"}{" "}
                yet. Try another destination.
              </Text>
            </VStack>
          </Flex>
        ) : null}

        {items.length > 0 && (
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={4}
            mt={2}
            role="list"
          >
            {items.map((img, index) => (
              <ChakraLink
                key={`${img.url}-${index}`}
                href={img.context || img.url}
                target="_blank"
                rel="noreferrer"
                borderRadius="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor={cardBorder}
                _hover={{ borderColor: cardHoverBorder, textDecoration: "none" }}
                role="listitem"
              >
                <ChakraImage
                  src={img.thumb || img.url}
                  alt={img.title || "Destination image"}
                  w="full"
                  h="180px"
                  objectFit="cover"
                  loading="lazy"
                />
                {img.title && (
                  <Box
                    px={3}
                    py={2}
                    bg="blackAlpha.700"
                    color="white"
                    fontSize="sm"
                    
                  >
                    {img.title}
                  </Box>
                )}
              </ChakraLink>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

