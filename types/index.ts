import { SVGProps } from "react";
import type { WorkStatusIndex } from "./workstatus";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type WorkStatus = WorkStatusIndex;
