import DrawerContentAuth from "./drawer-content-auth";
import DrawerContentGuest from "./drawer-content-guest";
import { createClient } from "@/utils/supabase/server";

const DrawerContent = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? <DrawerContentAuth /> : <DrawerContentGuest />;
};

export default DrawerContent;
