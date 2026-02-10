import { LogoIcon } from "@/components/icons/logo-icon";
import { Card } from "@heroui/card";
import { ReactNode } from "react";
import "@/styles/cropper.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-linear-to-tr from-primary-300 to-primary-50 border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg overflow-hidden">
      <div className="flex gap-3 bg-transparent">
        <LogoIcon />
        <div className="flex flex-col">
          <p className="text-md">کاروان</p>
          <p className="text-small text-default-500">به کاروان خوش امدید.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <Card
          isBlurred
          className="border-none dark:bg-default-100/100 flex-1 max-w-[610px] mx-auto "
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export default Layout;
