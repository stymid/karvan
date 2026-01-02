import { createClient } from "@/utils/supabase/server";

const CompleteProfile = async () => {
  const supabase = await createClient();
  const res = await supabase.auth.getUser();
  console.log(res, 6);

  return <div>CompleteProfile</div>;
};

export default CompleteProfile;
