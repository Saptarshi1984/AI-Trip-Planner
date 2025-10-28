"use client";

import { useEffect, useState } from "react";
import FeaturesSection from "@/components/ux/FeatureSection";
import LandingPage from "@/components/ux/LandingPage";
import ReviewSection from "@/components/ux/ReviewSection";
import SubscriptionSection from "@/components/ux/SubscriptionSection";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { useLoading } from "@/context/LoadingProvider";

export default function Home() {
  const router = useRouter();
  const {setPageLoading} = useLoading();
  //checking authentication status
  useEffect(() => {
  async function getCurrentUser() {
    setPageLoading(true);
    const user = await checkAuthStatus();
    router.replace(user ? "/Dashboard" : "/");
    setPageLoading(false);    
  }

  
  void getCurrentUser();
  
  }, [router]);

  return (
    <main>
      <Container maxW="7xl">
        <LandingPage />
        <FeaturesSection />
        <ReviewSection />
        <SubscriptionSection />       
      </Container>
    </main>
  );
}
