"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import PasswordInputCustom from "@/components/password-input-custom";
import { createUser } from "./acion";

import EmailInputCustom from "@/components/email-input-custom";
import { addToast } from "@heroui/toast";
import { getSupabaseAuthErrorMessage } from "@/utils/supabase/error-messages";
import { SignupErrors, SignupFieldErrors, signupInitialState } from "./types";
import { AuthResponse } from "@supabase/supabase-js";

export default function Page() {
  const [state, formAction, pending] = useActionState(
    createUser,
    signupInitialState,
  );
  const [formErrors, setFormErrors] = useState<SignupErrors>(
    state?.errors ?? {},
  );

  const lastToastedAttemptId = useRef<number>(0);

  const changeErrorState = (key: SignupFieldErrors) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const supabaseRes = useMemo<AuthResponse | undefined>(() => {
    if (!state.authResultJSON) return undefined;
    try {
      return JSON.parse(state.authResultJSON);
    } catch {
      return undefined;
    }
  }, [state.authResultJSON]);
  useEffect(() => {
    console.log(state, 51);
    console.log(supabaseRes, 52);

    if (!supabaseRes?.error) return;
    if (lastToastedAttemptId.current === state.attemptId) return;

    lastToastedAttemptId.current = state.attemptId;

    const err = supabaseRes.error;
    addToast({
      description: err.code
        ? getSupabaseAuthErrorMessage(err.code)
        : (err.message ?? "خطای نامشخص"),
    });
  }, [supabaseRes, state.attemptId]);
  if (supabaseRes?.data.user?.id)
    return (
      <div>
        یک لنیک فعال سازی برای جیمیل شما ارسال شده
        <Link href="/signin"> وارد شوید</Link>
      </div>
    );
  if (supabaseRes?.data.session?.user.aud === "authenticated")
    return (
      <div>
        شما قبلن ثبت نام کرده اید و با موفقیت تایید شده اید.
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
