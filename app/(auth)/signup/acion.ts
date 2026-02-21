"use server";
import { signupSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";
import { SignupFormState } from "./types";

export async function createUser(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const siteUrl =
    process.env.VERCEL_ENV === "production"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
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
      attemptId: prevState.attemptId + 1,
      values,
      errors,
    };
  }

  const supabase = await createClient();
  const supabaseResult = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo: `${siteUrl}/verify-email/callback`,
    },
  });

  return {
    attemptId: prevState.attemptId + 1,
    errors: {},
    values,
    authResultJSON: JSON.stringify(supabaseResult),
  };
}
