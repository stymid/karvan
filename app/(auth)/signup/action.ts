"use server";
import { signupSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";
import { SignupFormState } from "./types";
import { headers } from "next/headers";

export async function createUser(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) throw new Error("Missing host header");

  const siteUrl = `${proto}://${host}`;

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
      attemptId: 1 + prevState.attemptId,
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
      emailRedirectTo: `${siteUrl}/verify-email/callback`,
    },
  });

  return {
    errors: {},
    values,
    authResultJSON: JSON.stringify(supabaseResult),
    attemptId: 1 + prevState.attemptId,
  };
}
