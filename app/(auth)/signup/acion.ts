"use server";

import { email, z } from "zod";
import { signupSchema } from "./schema";
import { SignupFormState } from "./page";

export async function createUser(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmpassword: formData.get("confirmpassword") as string,
  };
  console.log(values, 1);

  const result = signupSchema.safeParse(values);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;

      if (!errors[field]) {
        errors[field] = [];
      }

      errors[field].push(issue.message);
    });
    console.log(errors);

    return {
      values,
      errors,
    };
  }

  return {
    values,
    success: true,
  };
}
