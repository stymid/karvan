import { IconSvgProps } from "@/types";
import * as React from "react";

export const LogoIcon = ({
  size = "24",
  className = "",
  ...props
}: {
  size?: string;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--karvan-start)" />
          <stop offset="100%" stopColor="var(--karvan-end)" />
        </linearGradient>

        <mask id="holes" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="256" height="256" rx="36" fill="#fff" />

          <circle cx="104" cy="106" r="16" fill="#000" />
          <circle cx="128" cy="146.56" r="16" fill="#000" />
          <circle cx="152" cy="106" r="16" fill="#000" />
        </mask>
      </defs>

      <rect
        x="16"
        y="16"
        width="224"
        height="224"
        rx="36"
        fill="url(#grad)"
        mask="url(#holes)"
      />
    </svg>
  );
};
