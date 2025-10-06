"use client";

import NextLink from "next/link";
import { HStack, Link } from "@chakra-ui/react";

import { useColorModeValue } from "../ui/color-mode";

export const NAV_ITEMS = [
  { label: "Destinations", href: "/" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
];

export interface NavlinkProps {
  items?: typeof NAV_ITEMS;
  primaryColor?: string;
}

export default function Navlink({
  items = NAV_ITEMS,
  primaryColor = "pink.600",
}: NavlinkProps) {

  const linkColor = useColorModeValue("gray.900", "gray.300");
  const linkHoverColor = useColorModeValue(primaryColor, primaryColor);

  return (
    
    <HStack align={{base:"left", md: "center"}} display={{ base: "flex", md: "flex" }} flexDirection={{base: "column", md: "row"}} gap={{base:1, md:6}} >
      {items.map((item) => (
        <Link
          key={item.label}
          as={NextLink}
          p={{base:3, md:1}}
          borderRadius={{base: "lg", md: "none"}}
          bg={{base:'pink.900', md:'none'}}
          textDecor={'none'}
          href={item.href}
          fontSize="lg"
          fontWeight="medium"
          color={linkColor}
          transition="color 0.2s ease"
          _hover={{ color: linkHoverColor }}
        >
          {item.label}
        </Link>
      ))}
    </HStack>
    
  );
}
