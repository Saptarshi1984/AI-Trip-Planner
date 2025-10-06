"use client";

import NextLink from "next/link";
import { Drawer, Portal, Button, CloseButton } from "@chakra-ui/react";

import { ColorModeButton, useColorModeValue } from "../ui/color-mode";

import { LuMenu } from "react-icons/lu";

import type { NavlinkProps } from "./Navlink";
import { NAV_ITEMS } from "./Navlink";

export default function MobileNav({
  items = NAV_ITEMS,
  primaryColor = "pink.600",
}: NavlinkProps) {
  /* const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 800px)"); */
  const linkColor = useColorModeValue("gray.700", "gray.100");
  const linkHoverColor = useColorModeValue(primaryColor, primaryColor);
  const drawerBg = useColorModeValue("white", "gray.900");
  const menuIconColor = useColorModeValue("gray.800", "white");

  return (
    <>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            <LuMenu color={menuIconColor} />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
