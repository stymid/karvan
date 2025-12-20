"use client";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import React from "react";
import { SearchIcon } from "../icons";

const SearchInput = () => {
  return (
    <Input
      aria-label="Search"
      size="sm"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="جستجو..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};

export default SearchInput;
