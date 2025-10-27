"use client";

import { useState, useEffect } from "react";
/* import NextLink from "next/link"; */
import {
  Drawer,
  Portal,
  Button,
  CloseButton,
  Separator,
  useBreakpointValue,
} from "@chakra-ui/react";

import { ColorModeButton, useColorModeValue } from "../ui/color-mode";

import { LuMenu } from "react-icons/lu";
import Navlink from "./Navlink";
import AccountSidebarNav from "./AccountSidebarNav";
import { usePathname } from "next/navigation";
import { checkAuthStatus } from "@/lib/appwrite.service";
import { signOutUser } from "@/lib/appwrite.service";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const IconBGColor = useColorModeValue("gray.800", "pink.600");
  const DrawerBGColor = useColorModeValue("gray.800", "pink.800");
  const titleColor = useColorModeValue("gray.800", "gray.200");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const handleAccountNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    async function getCurrentUser() {
      const user = await checkAuthStatus();

      if (user) {
        setAuth(true);
        return;
      } else setAuth(false);
    }

    void getCurrentUser();
  }, []);

  async function  handleSignOut () {
       await signOutUser();
       setLoading(true);
       setAuth(false);
       router.replace('/SignIn');
  }
  return (
    <div id="mobileNav">
      <Drawer.Root
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
      >
        <Drawer.Trigger asChild>
          <Button
            size={"sm"}
            bg={IconBGColor}
            onClick={() => setIsOpen(true)}
          >
            <LuMenu color="white" />
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
                <Separator w={"full"} my={10} />

                {auth && (
                  <AccountSidebarNav
                    pathname={pathname}
                    onClick={handleAccountNavClick}
                  />
                )}
              </Drawer.Body>
              <Drawer.Footer>
                <ColorModeButton display={{ sm: "inline-flex" }} />
                <Button 
                onClick={handleSignOut}
                loading={loading}
                >
                  Sign Out</Button>
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
