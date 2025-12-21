import { Navbar as HeroUINavbar } from "@heroui/navbar";

import LeftContent from "./left-content";
import RightContent from "./right-content";

export const Header = () => {
  return (
    <HeroUINavbar shouldHideOnScroll maxWidth="xl" position="static">
      <RightContent />
      <LeftContent />
    </HeroUINavbar>
  );
};
