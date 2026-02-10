import * as z from "zod";

const biographySchema = z
  .string()
  .trim()
  .min(10, { message: "بیوگرافی باید حداقل ۱۰ کاراکتر باشد." })
  .max(200, { message: "بیوگرافی نباید بیشتر از ۲۰۰ کاراکتر باشد." });
const emailSchema = z.email({ message: "لطفاً یک ایمیل معتبر وارد کنید." });
const nameBase = z
  .string()
  .trim()
  .min(3, { message: "حداقل ۳ کاراکتر" })
  .max(40, { message: "حداکثر ۴۰ کاراکتر" })
  .regex(/^[A-Za-z\u0600-\u06FF\s]+$/, { message: "فقط حروف مجاز هستند" });

const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "نام کاربری حداقل ۳ کاراکتر است" })
  .max(30, { message: "نام کاربری حداکثر ۳۰ کاراکتر است" })
  .regex(/^[a-z0-9_]+$/, {
    message: "نام کاربری فقط شامل حروف انگلیسی، عدد و _ است",
  })
  .transform((v) => v.toLowerCase());
const birthDateSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "تاریخ تولد معتبر نیست",
  })
  .refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      return date < now;
    },
    {
      message: "تاریخ تولد نمی‌تواند در آینده باشد",
    },
  );
const workStatusSchema = z.enum([
  "open_to_work",
  "busy",
  "inactive",
  "resting",
]);
const phoneSchema = z
  .string()
  .trim()
  .regex(/^(\+98|0)?9\d{9}$/, {
    message: "شماره موبایل معتبر نیست",
  })
  .optional();
export const profileSchema = z.object({
  email: emailSchema,
  first_name: nameBase,
  last_name: nameBase,
  username: usernameSchema,
  biography: biographySchema.optional(),
  phone: phoneSchema.optional(),
  birth_date: birthDateSchema.optional(),
  work_status: workStatusSchema.optional(),
});
