import { createClient } from "@/utils/supabase/server";
import IdentityAuth from "./identity-auth";
import IdentityGuest from "./identity-guest";

const IdentityGate = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? <IdentityAuth /> : <IdentityGuest />;
};

export default IdentityGate;
