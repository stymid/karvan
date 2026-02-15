import {
  AuthError,
  User,
  Session,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import { profileSchema } from "./schema";
import z from "zod";

type SupabaseSignUpResponse = {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
};
export type CompleteProfileFormData = z.infer<typeof profileSchema>;

export const completeProfileFormInitialState: CompleteProfileFormState = {
  values: {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    biography: "",
    phone: "",
    birth_date: "",
    work_status: undefined,
  },
};

export const PROFILE_FIELD_NAMES = [
  "username",
  "first_name",
  "last_name",
  "email",
  "biography",
  "phone",
  "birth_date",
  "work_status",
] as const;
export type ProfileFieldName = (typeof PROFILE_FIELD_NAMES)[number];

export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;
export type CompleteProfileErrors = FormFieldErrors<ProfileFieldName>;

export type CompleteProfileFormState = {
  values: Partial<CompleteProfileFormData>;
  errors?: CompleteProfileErrors;
  supabaseResponse?: PostgrestSingleResponse<null>;
};
