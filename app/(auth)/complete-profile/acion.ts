"use server";
import { profileSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";
import { filterFormData } from "@/utils/filter-form-data";
import {
  CompleteProfileFormData,
  CompleteProfileFormState,
  PROFILE_FIELD_NAMES,
} from "./types";

export async function saveUserProfile(
  prevState: CompleteProfileFormState,
  formData: FormData,
): Promise<CompleteProfileFormState> {
  const values = filterFormData<CompleteProfileFormData>(
    formData,
    PROFILE_FIELD_NAMES,
  );

  const parsedResult = profileSchema.safeParse(values);

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
      values,
      errors,
    };
  }

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.id) {
    return {
      values,
    };
  }
  const supabaseResult = await supabase
    .from("profiles")
    .update(values)
    .eq("id", user.id);

  return {
    values,
    supabaseResponse: supabaseResult,
  };
}
