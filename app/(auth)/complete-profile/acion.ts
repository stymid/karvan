"use server";
import { profileSchema } from "./schema";
import { CompleteProfileFormData, CompleteProfileFormState } from "./page";
import { createClient } from "@/utils/supabase/server";
import { AuthResponse } from "@supabase/supabase-js";

export async function createUser(
  prevState: CompleteProfileFormState,
  formData: FormData,
): Promise<CompleteProfileFormState> {
  const values = Object.fromEntries(
    formData.entries(),
  ) as Partial<CompleteProfileFormData>;
  console.log(values, 17);

  const parsedResult = profileSchema.safeParse(values);

  if (!parsedResult.success) {
    const errors: Record<string, string[]> = {};

    parsedResult.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      console.log(field);
      console.log(issue.message);

      if (!errors[field]) {
        errors[field] = [];
      }

      errors[field].push(issue.message);
    });
    console.log({ cos: errors }, 32);

    return {
      values,
      errors,
    };
  }

  let supabaseResult: AuthResponse;
  const supabase = await createClient();
  // supabaseResult = await supabase.auth.signUp({
  //   email: values.email,
  //   password: values.password,
  //   options: {
  //     emailRedirectTo: "http://localhost:3000/verify-email/callback",
  //   },
  // });

  // const {
  //   data: { session, user },
  //   error,
  // } = supabaseResult;

  return {
    values,
    success: true,
    // supabaseResponse: { error, session, user },
  };
}
