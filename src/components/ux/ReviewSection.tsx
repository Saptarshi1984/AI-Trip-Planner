"use client";

import { Box, Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import UserReviewCard, { type UserReviewCardProps } from "./UserReviewCard";

const reviews: UserReviewCardProps[] = [
  {
    quote:
      "WanderWise transformed my travel experience! The AI-powered itinerary was spot-on, and the real-time updates kept me stress-free.",
    author: "Sarah",
    age: 32,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-o4gEQGtYHmPs7ijETezoF1lyuhhCwjF6-_ryXhjOu4SYiBlQPdUflTFDMMjit9-kZw8-mdnJVfBCZB78a5xJyow0C_uKmGz43i4fAZ-wbA0Z6-y2kzChtQe26famt451llU71UWuqz0Zi6rPwRoYZl_Nvbw_Cpvt-RN56YefcdwLVb4NM3K5t90oC9X5aGXGzf8NPAMnIH4KTcQboqGzU3AfDIZUvvlXiU_ZZ5C9EuWOWAPYrfhXjsWV2baapTEPM83ujSGUos",
  },
  {
    quote:
      "I was amazed by how WanderWise optimized my budget without compromising on the quality of my trip. It's a game-changer.",
    author: "David",
    age: 35,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDK2zH6szVaRvxHqXqIpik9orBJ_GAZaI8fNlTrIFV9pf5bXN80S-TGP20VSoNQDsXMbf8YdHRjbi8BksK8o7sYguJ4Y_9baq0D2oPn6uulP8-dz3nw8LOfo5y4qII5t1rnCxHMhLsMXsg41QkH_hRFaHwi7pcbsbGGdiZUHksIjMswhjcv-9TrEMCmCdXFi6pj8_WqYS0fHjJyojeVf_wfvoWCEzWaZ0y-7Whh9N7nGNSS_pTTJGeY7wC7t8uICGqeQ5ocnaPOhC4",
  },
  {
    quote:
      "The personalized recommendations from WanderWise helped me discover hidden gems I wouldn't have found otherwise.",
    author: "Emily",
    age: 28,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrkJW2A9D3lhrihLNUPn3VGBEcDnwULr7rEzeuLeedAVabxdxfYUiCyU-T74vUopOyLjFRKFC2m9uNi7AvhsZEQmRBdd74rOk_vyBqRotilv6BrO_Lmcz5pw9ZHAhivzNqq3vCn_0nyb8lnACqsPbLgTLyV2pWm06yMQTBSlcnafRV6IZaTAdSfriK64h2IDGd3p5Xy9g_Weq4n2mmCDl3ZiGvT-5xVT7BforQa5KrVOwSZlpix7DUB5ASTub1x_YuG-KHhbq-afE",
  },
];

export default function ReviewSection() {
  const sectionBg = useColorModeValue("gray.50", "rgba(17, 24, 39, 0.5)");
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <Box as="section" bg={sectionBg} py={{ base: 16, sm: 24 }} overflow='hidden' mt={4}>
      <Container maxW="7xl">
        <Stack  maxW="2xl" textAlign="center" mx="auto">
          <Heading as="h2" size="xl" fontWeight="extrabold" color={headingColor}>
            What Our Travelers Say
          </Heading>
        </Stack>

        <SimpleGrid columns={{ base: 1, lg: 3 }}  mt={12} gap={4}>
          {reviews.map((review) => (
            <UserReviewCard key={review.author} {...review} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
