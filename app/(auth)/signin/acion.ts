"use server";
import { signinSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";
import { SigninFormState } from "./types";

export async function signinUser(
  prevState: SigninFormState,
  formData: FormData,
): Promise<SigninFormState> {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = signinSchema.safeParse(values);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
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

  const supabase = await createClient();
  const supabaseResponse = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  return {
    values,
    supabaseResponse,
  };
}
