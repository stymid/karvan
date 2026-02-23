"use client";

import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";

import { NavbarItem } from "@heroui/navbar";
import { PlusIcon } from "@/components/icons/plus-icon";
import Avatar from "@/components/header/avatar";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QueryResult, QueryData, QueryError } from "@supabase/supabase-js";
import WorkStatus, { StatusWork } from "@/components/work-status";
import WorkStatusSkeleton from "@/components/work-status-skeleton";
import UserSkeleton from "@/components/user-skeleton";
import AvatarSkeleton from "@/components/avatar-skeleton";

export default function IdentityAuth() {
  const [avatarSrc, setAvatarSrc] = useState<string>();
  const [fullname, setFullname] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [workStatus, setworkStatus] = useState<StatusWork>();
  const [pending, setPending] = useState<boolean>();

  const router = useRouter();
  useEffect(() => {
    setPending(true);
    async function getAvatarUrl() {
      const supabase = createClient();
      const query = supabase
        .from("profiles")
        .select("first_name,last_name,avatar_url,username,work_status")
        .limit(1);
      type ProfileRow = QueryData<typeof query>[number];

      const { data, error } = await query;
      if (error) {
        setPending(false);
        return;
      }
      const row: ProfileRow | undefined = data?.[0];
      const path = row?.avatar_url;
      const tempFullname = row?.first_name + " " + row?.last_name;
      const tempUsername = row?.username;
      const tempWorkStatus = row?.work_status;

      console.log(row);

      if (path) {
        const { data } = supabase.storage.from("avatars").getPublicUrl(path);
        console.log(data);

        setAvatarSrc(data.publicUrl);
        setPending(false);
      }
      if (tempFullname) {
        setFullname(tempFullname);
      }
      if (tempUsername) {
        setUsername(tempUsername);
      }
      if (tempWorkStatus) {
        setworkStatus(tempWorkStatus);
      }
    }
    getAvatarUrl();
  }, []);
  return (
    <NavbarItem className="flex gap-2 items-center">
      <Dropdown
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "p-0 border-small border-divider bg-background",
        }}
        radius="sm"
      >
        <DropdownTrigger>
          <Button
            className="border-none bg-transparent data-[hover=true]:!bg-transparent "
            disableRipple
            isIconOnly
            variant="ghost"
          >
            <Avatar pending={pending} src={avatarSrc} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          className="p-3"
          disabledKeys={["profile"]}
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
          <DropdownSection showDivider aria-label="Profile & Actions">
            <DropdownItem
              key="profile"
              isReadOnly
              className="h-14 gap-2 opacity-100"
            >
              {pending ? (
                <UserSkeleton />
              ) : (
                <User
                  avatarProps={{
                    size: "sm",
                    src: avatarSrc || "",
                  }}
                  classNames={{
                    base: "flex gap-3",
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  dir="ltr"
                  description={"@" + username}
                  name={fullname}
                />
              )}
            </DropdownItem>
            <DropdownItem key="status">
              {workStatus ? (
                <WorkStatus status={workStatus} />
              ) : (
                <WorkStatusSkeleton />
              )}
            </DropdownItem>
            <DropdownItem key="dashboard">داشبورد</DropdownItem>
            <DropdownItem key="settings">تنظیمات</DropdownItem>
            <DropdownItem key="new_project">
              <span className="flex flex-row gap-0">پروژه جدید</span>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider aria-label="Preferences">
            <DropdownItem key="quick_search" shortcut="⌘K">
              Quick search
            </DropdownItem>
            <DropdownItem
              key="theme"
              isReadOnly
              className="cursor-default"
              endContent={
                <select
                  className="z-10 outline-solid outline-transparent w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                  id="theme"
                  name="theme"
                >
                  <option>System</option>
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              }
            >
              Theme
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>

            <DropdownItem key="logout">
              <button
                onClick={async () => {
                  const supabase = createClient();

                  await supabase.auth.signOut();
                  router.refresh();
                }}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Log Out
              </button>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  );
}
