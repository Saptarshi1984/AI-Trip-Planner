"use client";

import { Box, Container, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
];

export default function FooterSection() {
  const footerBg = useColorModeValue("white", "rgba(17, 24, 39, 0.5)");
  const linkColor = useColorModeValue("gray.500", "gray.400");
  const linkHoverColor = useColorModeValue("pink.500", "pink.400");
  const socialColor = useColorModeValue("gray.400", "gray.500");
  const socialHoverColor = useColorModeValue("pink.500", "pink.400");
  const copyrightColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box as="footer" bg={footerBg} py={6}>
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={8}
        >
          <HStack flexWrap="wrap" justify="center" order={{ base: 2, md: 2 }}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                fontSize="sm"
                color={linkColor}
                _hover={{ color: linkHoverColor }}
              >
                {link.label}
              </Link>
            ))}
          </HStack>

          <HStack justify="center" order={{ base: 3, md: 3 }}>
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                color={socialColor}
                _hover={{ color: socialHoverColor }}
              >
                <social.icon size={24} />
              </Link>
            ))}
          </HStack>

          <Text fontSize="sm" color={copyrightColor} order={{ base: 1, md: 1 }}>
            © 2024 WanderWise. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
