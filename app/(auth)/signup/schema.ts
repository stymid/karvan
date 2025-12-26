import { passwordErrors } from "@/constants/form-messages";
import * as z from "zod";

const {
  minLength,
  maxLength,
  uppercase,
  lowercase,
  number,
  special,
  mismatch,
} = passwordErrors;

const passwordSchema = z
  .string()
  .min(8, { message: minLength })
  .max(20, { message: maxLength })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercase,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercase,
  })
  .refine((password) => /[0-9]/.test(password), { message: number })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: special,
  });

const emailSchema = z.email({ message: "لطفن یک ایمیل معتبر وارد کنید." });
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: mismatch,
    path: ["confirmpassword"],
  });
