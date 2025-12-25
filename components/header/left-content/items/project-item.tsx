import { BookBookmarkIcon } from "@/components/icons/book-bookmark-icon";
import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import React from "react";

const ProjectItem = () => {
  return (
    <NavbarItem className="hidden sm:flex items-center">
      <Link aria-label="projects" href={"/project"}>
        <BookBookmarkIcon className="fill-white" />
      </Link>
    </NavbarItem>
  );
};

export default ProjectItem;
