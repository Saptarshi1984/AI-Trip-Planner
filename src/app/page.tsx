import FeaturesSection from "@/components/ux/FeatureSection";
import FooterSection from "@/components/ux/FooterSection";
import LandingPage from "@/components/ux/LandingPage";
import ReviewSection from "@/components/ux/ReviewSection";
import SubscriptionSection from "@/components/ux/SubscriptionSection";
import { Container } from "@chakra-ui/react";

export default function Home() {
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
