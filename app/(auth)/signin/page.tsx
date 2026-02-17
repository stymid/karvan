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
import {
  SigninErrors,
  SigninFieldName,
  SigninFormState,
  signinInitialState,
} from "./types";
import { addToast } from "@heroui/toast";
import { User } from "@supabase/supabase-js";

import { getSigninErrorMessage } from "@/utils/supabase/error-messages";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    signinUser,
    signinInitialState,
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});

  const changeErrorState = (key: SigninFieldName) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  useEffect(() => {
    if (state.errors) setFormErrors(state.errors);
  }, [state]);

  useEffect(() => {
    if (!state.supabaseResponse) return;

    if (state.supabaseResponse.data.user) {
      addToast({
        description: `با موفقیت وارد شدید.`,
        color: "success",
      });
      router.push("/");
    }

    if (state.supabaseResponse?.error?.code)
      addToast({
        description: getSigninErrorMessage(state.supabaseResponse.error.code),
        color: "danger",
      });
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
        تا به حال ثبت نام نکرده اید؟{" "}
        <Link color="secondary" href="/signup">
          ثبت نام کنید
        </Link>
      </CardFooter>
    </>
  );
}
