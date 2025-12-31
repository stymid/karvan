"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import PasswordInputCustom from "@/components/password-input-custom";
import { createUser } from "./acion";
import { signupSchema } from "./schema";
import z from "zod";
import EmailInputCustom from "@/components/email-input-custom";

export type SignupFormData = z.infer<typeof signupSchema>;

export const signupInitialState: SignupFormState = {
  values: {
    email: "",
    password: "",
    confirmpassword: "",
  },
};

export type SignupFieldErrors = "email" | "password" | "confirmpassword";
export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;
export type SignupErrors = FormFieldErrors<SignupFieldErrors>;

export type SignupFormState = {
  values: Partial<SignupFormData>;
  errors?: SignupErrors;
  success?: boolean;
  message?: { type: string; content: string };
};
export default function Page() {
  const [state, formAction, pending] = useActionState(
    createUser,
    signupInitialState
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});

  const changeErrorState = (key: SignupFieldErrors) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  useEffect(() => {
    if (state.errors) setFormErrors(state.errors);
  }, [state]);
  if (state.success)
    return (
      <div>
        یک لنیک فعال سازی برای جیمیل شما ارسال شده
        <Link href="/signin"> وارد شوید</Link>
      </div>
    );
  return (
    <>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold">ثبت نام</h1>
        <p className="text-small text-default-500">
          برای ساخت حساب، ایمیل و رمز عبور خود را وارد کنید.
        </p>
      </CardHeader>
      <CardBody>
        <Form action={formAction} className="flex flex-col gap-4">
          <EmailInputCustom
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            defaultValue={state.values.email}
            label="ایمیل"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
          />
          <PasswordInputCustom
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            defaultValue={state.values.password}
            label="رمز"
            name="password"
            placeholder="رمز خودراوارد کنید"
          />
          <PasswordInputCustom
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            defaultValue={state.values.confirmpassword}
            label="تایید رمز"
            name="confirmpassword"
            placeholder="رمز خود را دوباره تکرار کنید"
          />
          <Button
            onPress={() => {}}
            type="submit"
            color="primary"
            className="mt-2 w-full"
            isLoading={pending}
            isDisabled={pending}
          >
            ایجاد حساب
          </Button>
        </Form>
      </CardBody>
      <Divider />
      <CardFooter>
        قبلن ثبت نام کرده اید؟{" "}
        <Link color="secondary" href="/signin">
          وارد شوید
        </Link>
      </CardFooter>
    </>
  );
}
