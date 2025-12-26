"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import PasswordInputCustom from "@/components/password-input-custom";
import { createUser } from "./acion";
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

export type SignupFieldErrors = "email" | "password" | "confirmpassword";

export type SignupErrors = Partial<Record<SignupFieldErrors, string[]>>;

export type SignupFormState = {
  values: Partial<SignupFormData>;
  errors?: SignupErrors;
  success?: boolean;
};
export default function Page() {
  const [state, formAction, pending] = useActionState(
    createUser,
    signupInitialState
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});
  console.log(state, "component");

  useEffect(() => {
    if (state.errors) setFormErrors(state.errors);
  }, [state]);
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
          <Input
            onChange={() => {
              setFormErrors((prev) => ({
                ...prev,
                email: undefined,
              }));
            }}
            isInvalid={!!formErrors?.email}
            errorMessage={
              formErrors?.email && (
                <ul className="mt-1 text-sm text-danger space-y-1">
                  {formErrors.email.map((msg, i) => (
                    <li key={i}>• {msg}</li>
                  ))}
                </ul>
              )
            }
            defaultValue={state.values.email}
            dir="ltr"
            className=""
            classNames={{ input: "text-left placeholder:text-right" }}
            labelPlacement="outside"
            name="email"
            placeholder="ایمیل خود را وارد کنید"
            label="ایمیل"
            type="email"
            isRequired
          />
          <PasswordInputCustom
            onChange={() => {
              setFormErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
            }}
            isInvalid={!!formErrors?.password}
            errorMessage={
              formErrors?.password && (
                <ul className="mt-1 text-sm text-danger space-y-1">
                  {formErrors.password?.map((msg, i) => (
                    <li key={i}>• {msg}</li>
                  ))}
                </ul>
              )
            }
            defaultValue={state.values.password}
            label="رمز"
            name="password"
            placeholder="رمز خودراوارد کنید"
          />
          <PasswordInputCustom
            onChange={() => {
              setFormErrors((prev) => ({
                ...prev,
                confirmpassword: undefined,
              }));
            }}
            isInvalid={!!formErrors?.confirmpassword}
            errorMessage={
              formErrors?.confirmpassword && (
                <ul className="mt-1 text-sm text-danger space-y-1">
                  {formErrors.confirmpassword.map((msg, i) => (
                    <li key={i}>• {msg}</li>
                  ))}
                </ul>
              )
            }
            defaultValue={state.values.confirmpassword}
            label="تایید رمز"
            name="confirm_password"
            placeholder="رمز خود را دوباره تکرار کنید"
          />
          <Button
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
