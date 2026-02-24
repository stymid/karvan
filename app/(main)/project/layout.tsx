import ProjectBreadcrumb from "@/components/project-breadcrumb";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ProjectBreadcrumb />
      {children}
    </div>
  );
};

export default Layout;
