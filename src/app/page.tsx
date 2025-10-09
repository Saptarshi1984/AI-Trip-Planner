"use client";

import { useEffect } from "react";
import FeaturesSection from "@/components/ux/FeatureSection";
import FooterSection from "@/components/ux/FooterSection";
import LandingPage from "@/components/ux/LandingPage";
import ReviewSection from "@/components/ux/ReviewSection";
import SubscriptionSection from "@/components/ux/SubscriptionSection";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/lib/appwrite.service";

export default function Home() {
  const router = useRouter();

  //checking authentivation status
  async function getCurrentUser() {
    const user = await checkAuthStatus();
    router.replace(user ? "/Dashboard" : "/");
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <main>
      <Container maxW="7xl">
        <LandingPage />
        <FeaturesSection />
        <ReviewSection />
        <SubscriptionSection />
        <FooterSection />
      </Container>
    </main>
  );
}
