import { InboxIcon } from "@/components/icons/inbox-icon";
import { NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import React from "react";

const InboxItem = () => {
  return (
    <NavbarItem className="flex gap-2 items-center">
      <Link className="flex items-center " aria-label="Inbox" href={"/inbox"}>
        <InboxIcon className="text-default-500" />
      </Link>
    </NavbarItem>
  );
};

export default InboxItem;
