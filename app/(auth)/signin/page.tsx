"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import PasswordInputCustom from "@/components/password-input-custom";
import { signinUser } from "./acion";
import { signinSchema } from "./schema";
import z from "zod";
import EmailInputCustom from "@/components/email-input-custom";

export type SigninFormData = z.infer<typeof signinSchema>;

export const signinInitialState: SignupFormState = {
  values: {
    email: "",
    password: "",
  },
};

export type SigninFieldErrors = "email" | "password" | "confirmpassword";
export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;
export type SigninErrors = FormFieldErrors<SigninFieldErrors>;

export type SignupFormState = {
  values: Partial<SigninFormData>;
  errors?: SigninErrors;
  success?: boolean;
};
export default function Page() {
  const [state, formAction, pending] = useActionState(
    signinUser,
    signinInitialState
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});
  console.log("cos", state, "component");

  const changeErrorState = (key: SigninFieldErrors) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  useEffect(() => {
    if (state.errors) setFormErrors(state.errors);
  }, [state]);
  return (
    <>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold">وارد شوید</h1>
        <p className="text-small text-default-500">
          برای ورود، ایمیل و رمز عبور خود را وارد کنید.
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

          <Button
            type="submit"
            color="primary"
            className="mt-2 w-full"
            isLoading={pending}
            isDisabled={pending}
          >
            ورود{" "}
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
