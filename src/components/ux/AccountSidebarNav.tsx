"use client";

import NextLink from "next/link";
import {
  Flex,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,

} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { useColorModeValue } from "../ui/color-mode";
import {
  MdBookmarkBorder,
  MdDashboard,
  MdFlightTakeoff,
  MdLightbulbOutline,
  MdPersonOutline,
} from "react-icons/md";

const PRIMARY_COLOR = "#13a4ec";

export type AccountSidebarNavItem = {
  label: string;
  icon: IconType;
  href: string;
};

export const ACCOUNT_NAV_ITEMS: ReadonlyArray<AccountSidebarNavItem> = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "/Dashboard",
  },
  {
    label: "Plan a Trip",
    icon: MdFlightTakeoff,
    href: "/TripPlanner",
  },
  {
    label: "My Trips",
    icon: MdBookmarkBorder,
    href: "/MyTrip",
  },
  {
    label: "Inspiration",
    icon: MdLightbulbOutline,
    href: "#",
  },
  {
    label: "Manage Profile",
    icon: MdPersonOutline,
    href: "/Profile",
  },
] as const;

type AccountSidebarNavProps = {
  pathname?: string | null;
  items?: ReadonlyArray<AccountSidebarNavItem>;
};

const AccountSidebarNav = ({
  pathname,
  items = ACCOUNT_NAV_ITEMS,
}: AccountSidebarNavProps) => {
  const navHoverBg = useColorModeValue(
    "rgba(19, 164, 236, 0.12)",
    "rgba(19, 164, 236, 0.18)"
  );
  const navActiveBg = useColorModeValue(
    "rgba(19, 164, 236, 0.18)",
    "rgba(19, 164, 236, 0.24)"
  );

  return (
    <Stack>
      {items.map((item) => {
        const isNavigable = item.href && item.href !== "#";
        const normalizedPath = pathname?.toLowerCase();
        const normalizedHref = item.href.toLowerCase();
        const isActive =
          isNavigable && normalizedPath
            ? normalizedPath === normalizedHref
            : false;

        const sharedProps = {
          alignItems: "center" as const,
          gap: 3,
          px: 4,
          py: 2,
          rounded: "lg",
          bg: isActive ? navActiveBg : "transparent",
          color: isActive ? PRIMARY_COLOR : undefined,
          fontWeight: isActive ? "bold" : "medium",
          transition: "all 0.2s ease",
        };

        if (!isNavigable) {
          return (
            <Flex key={item.label} {...sharedProps}>
              <Icon as={item.icon} boxSize={5} />
              <Text>{item.label}</Text>
            </Flex>
          );
        }

        return (
          <ChakraLink
            key={item.label}
            as={NextLink}
            href={item.href}
            display="flex"
            {...sharedProps}
            _hover={{
              textDecoration: "none",
              bg: navHoverBg,
              color: PRIMARY_COLOR,
            }}
          >
            <Icon as={item.icon} boxSize={5} />
            <Text>{item.label}</Text>
          </ChakraLink>
        );
      })}
    </Stack>
  );
};

export default AccountSidebarNav;
