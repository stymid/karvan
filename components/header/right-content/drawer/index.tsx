"use client";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/use-disclosure";

import {
  Drawer as HeroDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";

import { ReactNode } from "react";
import { HamburgerIcon } from "@/components/icons/hamburger-icon";

export default function Drawer({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" isIconOnly className="w-10 h-10 p-0" onPress={onOpen}>
        <HamburgerIcon className="fill-white" />
      </Button>
      <HeroDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              {children}
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </HeroDrawer>
    </>
  );
}
