import { Skeleton } from "@heroui/skeleton";
import React from "react";

const AvatarSkeleton = () => {
  return (
    <div className="block rounded-full h-full w-full overflow-hidden">
      <Skeleton className="overflow-hidden rounded-full w-20 h-20" />;
    </div>
  );
};

export default AvatarSkeleton;
