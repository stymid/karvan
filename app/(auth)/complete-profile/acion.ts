"use server";
import { profileSchema } from "./schema";
import { CompleteProfileFormState } from "./page";
import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";

export async function createUser(
  prevState: CompleteProfileFormState,
  formData: FormData,
): Promise<CompleteProfileFormState> {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmpassword: formData.get("confirmpassword") as string,
  };

  const parsedResult = profileSchema.safeParse(values);

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
