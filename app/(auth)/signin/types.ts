import { AuthTokenResponsePassword, User } from "@supabase/supabase-js";
import { signinSchema } from "./schema";
import z from "zod";

export type SigninFormData = z.infer<typeof signinSchema>;

export const completeProfileFormInitialState: SigninFormState = {
  values: {
    email: "",
    password: "",
  },
};

export const SIGNIN_FIELD_NAMES = ["email", "password"] as const;
export type SigninFieldName = (typeof SIGNIN_FIELD_NAMES)[number];

export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;
export type SigninErrors = FormFieldErrors<SigninFieldName>;

export type SigninFormState = {
  values: Partial<SigninFormData>;
  errors?: SigninErrors;
  supabaseResponse?: AuthTokenResponsePassword;
};
