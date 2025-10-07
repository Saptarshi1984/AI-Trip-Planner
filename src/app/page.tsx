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
  

  useEffect(() => {
    (async () => {
      const u = await checkAuthStatus();
      
      console.log("User", u);      
    });
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
