"use client";

import NextLink from "next/link";
import { Drawer, Portal, Button, CloseButton } from "@chakra-ui/react";

import { ColorModeButton, useColorModeValue } from "../ui/color-mode";

import { LuMenu } from "react-icons/lu";
import Navlink from "./Navlink";
import type { NavlinkProps } from "./Navlink";
import { NAV_ITEMS } from "./Navlink";

export default function MobileNav({
  items = NAV_ITEMS,
  primaryColor = "pink.600",
}: NavlinkProps) {
  /* const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 800px)"); */

  const IconBGColor = useColorModeValue("gray.800", "pink.600");
  const DrawerBGColor = useColorModeValue("gray.800", "pink.800");
  const titleColor = useColorModeValue("gray.800", "gray.200");
  

  return (
    <div id="mobileNav">
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button size={"sm"} bg={IconBGColor}>
            <LuMenu color= "white" />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title color={titleColor}>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body bg={DrawerBGColor}>
                <Navlink />
              </Drawer.Body>
              <Drawer.Footer>
                <ColorModeButton
                  display={{ sm: "inline-flex" }}
                />
                <Button>Sign Out</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </div>
  );
}
