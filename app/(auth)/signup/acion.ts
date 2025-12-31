"use server";
import { signupSchema } from "./schema";
import { SignupFormState } from "./page";
import { createClient } from "@/utils/supabase/server";

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
  try {
    const supabase = await createClient();
    const result = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "http://localhost:3003/welcome",
      },
    });
    console.log(result);
  } catch (err) {}
  console.log(
    "end-------------------------------------------------------------end"
  );
  return {
    values,
    success: true,
  };
}
