"use server";
import { signupSchema } from "./schema";
import { SignupFormState } from "./page";
import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";

export async function createUser(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  console.log(
    "srart-------------------------------------------------------------start"
  );

  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmpassword: formData.get("confirmpassword") as string,
  };

  const parsedResult = signupSchema.safeParse(values);

  if (!parsedResult.success) {
    const errors: Record<string, string[]> = {};

    parsedResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;

      if (!errors[field]) {
        errors[field] = [];
      }

      errors[field].push(issue.message);
      console.log(errors);
    });

    return {
      values,
      errors,
    };
  }
  console.log({
    email: values.email,
    password: values.password,
  });

  let supabaseResult: AuthResponse;
  const supabase = await createClient();
  supabaseResult = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: "http://localhost:3003/verify-email",
    },
  });
  console.log(supabaseResult);

  const {
    data: { session, user },
    error,
  } = supabaseResult;
  console.log(
    "end-------------------------------------------------------------end"
  );
  return {
    values,
    success: true,
    supabaseResponse: { error, session, user },
  };
}
