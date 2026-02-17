import { AuthError, AuthResponse, Session, User } from "@supabase/supabase-js";
import { signupSchema } from "./schema";
import z from "zod";

export type SignupFormData = z.infer<typeof signupSchema>;

export const signupInitialState: SignupFormState = {
  values: {
    email: "",
    password: "",
    confirmpassword: "",
  },
};
export const SIGNUP_FIELD_NAMES = [
  "email",
  "password",
  "confirmpassword",
] as const;
export type SignupFieldName = (typeof SIGNUP_FIELD_NAMES)[number];
export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;

export type SignupFieldErrors = "email" | "password" | "confirmpassword";
export type SignupErrors = FormFieldErrors<SignupFieldName>;

export type SignupFormState = {
  values: Partial<SignupFormData>;
  errors?: SignupErrors;

  supabaseResponse?: AuthResponse;
};
