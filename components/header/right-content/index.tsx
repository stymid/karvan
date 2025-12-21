import { NavbarBrand, NavbarContent } from "@heroui/navbar";
import React from "react";
import Drawer from "./drawer";
import DrawerContent from "./drawer/drawer-content";
import NextLink from "next/link";
import { Logo } from "@/components/icons";
import DrawerContentWrapper from "./drawer/drawer-content-wrapper";

const RightContent = () => {
  return (
    <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <Drawer>
          <DrawerContentWrapper />
        </Drawer>
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <p className="font-extrabold">کاروان</p>
        </NextLink>
      </NavbarBrand>
    </NavbarContent>
  );
};

export default RightContent;
