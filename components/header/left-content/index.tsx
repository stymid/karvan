import { NavbarContent, NavbarItem } from "@heroui/navbar";
import SearchInput from "../search-input";
import TaskItem from "../task-item";
import { ThemeSwitch } from "@/components/theme-switch";
import NextLink from "next/link";
import { BookBookmarkIcon } from "@/components/icons/book-bookmark-icon";
import { InboxIcon } from "@/components/icons/inbox-icon";

import SearchItem from "./items/search-item";
import ProjectItem from "./items/project-item";
import InboxItem from "./items/inbox-item";
import IdentityItem from "./items/identity-item";

const LeftContent = () => {
  return (
    <NavbarContent className="flex basis-1/5 sm:basis-full " justify="end">
      <SearchItem />
      <TaskItem />
      <NavbarItem className="flex items-center">
        <ThemeSwitch />
      </NavbarItem>
      <ProjectItem />
      <InboxItem />
      <IdentityItem />
    </NavbarContent>
  );
};

export default LeftContent;
