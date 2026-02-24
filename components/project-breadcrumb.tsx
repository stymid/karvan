"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
const ROUTE_LABELS: Record<string, string> = {
  project: "پروژه‌ها",
  new: "ساخت پروژه",
};
const ProjectBreadcrumb = () => {
  const pathname = usePathname()
    .split("/")
    .filter((m) => m);
  return (
    <div>
      <Breadcrumbs
        classNames={{ list: "bg-transparent", base: "bg-default-100" }}
        key={"sm"}
        radius={"full"}
        variant="solid"
      >
        {pathname.map((segment, i) => {
          const label = ROUTE_LABELS[segment] ?? segment;
          return (
            <BreadcrumbItem key={`${segment}-${i}`}>{label}</BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default ProjectBreadcrumb;
