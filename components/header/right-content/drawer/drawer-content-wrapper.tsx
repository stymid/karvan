import { Suspense } from "react";
import DrawerContent from "./drawer-content";

const DrawerContentWrapper = () => {
  return (
    <Suspense fallback={"Loading.."}>
      <DrawerContent />
    </Suspense>
  );
};

export default DrawerContentWrapper;
