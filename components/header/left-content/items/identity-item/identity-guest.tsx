"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { UserCircleIcon } from "@/components/icons/user-circle-icon";
import Link from "next/link";

export default function IdentityGuest() {
  return (
    <Dropdown
      className="p-0"
      classNames={{
        base: "before:bg-default-200 ",
        content: "p-0 border-small border-divider bg-background",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Button
          size="sm"
          color="primary"
          endContent={<UserCircleIcon />}
          variant="light"
          className="p-0 sm:p-3 min-w-8 sm:min-w-12 text-foreground"
        >
          <span className="hidden sm:block">مهمان</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="guest"
        className="p-0"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="signin & signup">
          <DropdownItem key="signup">
            <Link className="block w-full" href="/signin">
              ورود
            </Link>
          </DropdownItem>
          <DropdownItem key="signin">
            <Link className="block w-full" href="/signup">
              ثبت نام
            </Link>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
