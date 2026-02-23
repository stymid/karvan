import { Skeleton } from "@heroui/skeleton";
import React from "react";

const WorkStatusSkeleton = () => {
  return (
    <Skeleton className="rounded-full border border-default w-20">
      <div className="h-6 bg-default-300" />
    </Skeleton>
  );
};

export default WorkStatusSkeleton;
