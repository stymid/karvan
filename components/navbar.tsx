"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";
import HeaderDrawer from "./header-drawer";
import TaskItem from "./header/task-item";
import { BookBookmarkIcon } from "./icons/book-bookmark-icon";
import { InboxIcon } from "./icons/inbox-icon";
import AvatarItem from "./header/avatar-item";
import SearchInput from "./header/search-input";

export const Navbar = () => {
  return (
    <HeroUINavbar shouldHideOnScroll maxWidth="xl" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <HeaderDrawer />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-extrabold">کاروان</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full " justify="end">
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2 items-center">
          <TaskItem />
        </NavbarItem>
        <NavbarItem className="flex gap-2 items-center">
          <ThemeSwitch />
          <NextLink
            className="hidden sm:flex items-center "
            aria-label="projects"
            href={"/project"}
          >
            <BookBookmarkIcon className="fill-white" />
          </NextLink>

          <NextLink
            className="flex items-center "
            aria-label="Inbox"
            href={"/inbox"}
          >
            <InboxIcon className="text-default-500" />
          </NextLink>
        </NavbarItem>

        <NavbarItem className="flex gap-2 items-center">
          <AvatarItem />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
