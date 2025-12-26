"use server";
import { signinSchema } from "./schema";
import { SignupFormState } from "./page";
import { createClient } from "@/utils/supabase/server";

export async function signinUser(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  console.log(
    "srart--------------------------------signin-----------------------------start"
  );

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

  const supabase = await createClient();
  const result1 = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });
  console.log(result1);
  console.log(
    "end-------------------------------signin------------------------------end"
  );
  return {
    values,
    success: true,
  };
}
