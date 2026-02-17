"use server";
import { signupSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";
import { SignupFormState } from "./types";

export async function createUser(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
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
    });

    return {
      values,
      errors,
    };
  }

  let supabaseResult: AuthResponse;
  const supabase = await createClient();
  supabaseResult = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: "http://localhost:3000/verify-email/callback",
    },
  });

  const {
    data: { session, user },
    error,
  } = supabaseResult;

  return {
    values,
    success: true,
    supabaseResponse: { error, session, user },
  };
}
