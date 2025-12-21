import React, { ReactNode, Suspense } from "react";

const IdentityBoundary = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={"loading..."}>{children}</Suspense>;
};

export default IdentityBoundary;
