"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";
import PasswordInputCustom from "@/components/password-input-custom";
import { createUser } from "./acion";

import EmailInputCustom from "@/components/email-input-custom";
import { addToast } from "@heroui/toast";
import { getSupabaseAuthErrorMessage } from "@/utils/supabase/error-messages";
import {
  SignupErrors,
  SignupFieldErrors,
  SignupFormState,
  signupInitialState,
} from "./types";
import { AuthResponse } from "@supabase/supabase-js";
import { json } from "zod";

export default function Page() {
  const [state, formAction, pending] = useActionState(
    createUser,
    signupInitialState,
  );
  const [formErrors, setFormErrors] = useState<SignupErrors>(
    state?.errors ?? {},
  );
  const [supabaseRes, setSupabaseRes] = useState<AuthResponse>();

  const changeErrorState = (key: SignupFieldErrors) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };
  useEffect(() => {
    if (state.errors) return setFormErrors(state.errors);
    const supabaseResponse = state.supabaseResponse;
    setSupabaseRes(supabaseResponse ? JSON.parse(supabaseResponse) : false);
  }, [state]);
  console.log(state);

  if (supabaseRes?.error?.code)
    addToast({
      description: getSupabaseAuthErrorMessage(supabaseRes?.error?.code),
    });
  else if (supabaseRes?.error?.message)
    addToast({
      description: supabaseRes.error.message,
    });
  if (supabaseRes?.data.user?.id)
    return (
      <div>
        یک لنیک فعال سازی برای جیمیل شما ارسال شده
        <Link href="/signin"> وارد شوید</Link>
      </div>
    );
  if (supabaseRes?.data.session?.user.aud === "authenticated")
    <div>
      شما قبلن ثبت نام کرده اید و با موفقیت تایید شده اید.
      <Link href="/signin"> وارد شوید</Link>
    </div>;
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
