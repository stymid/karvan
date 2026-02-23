import { createClient } from "@/utils/supabase/server";
import IdentityAuth from "./identity-auth";
import IdentityGuest from "./identity-guest";

const IdentityGate = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ? <IdentityAuth /> : <IdentityGuest />;
};

export default IdentityGate;
