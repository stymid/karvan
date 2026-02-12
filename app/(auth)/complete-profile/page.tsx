"use client";

import AvatarUploader from "@/components/avatar-uploader";
import React from "react";
import { CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";

import { createUser } from "./acion";
import { profileSchema } from "./schema";
import z from "zod";

import { AuthError, User, Session } from "@supabase/supabase-js";
import { addToast } from "@heroui/toast";
import { getSupabaseErrorMessage } from "@/utils/supabase/error-messages";
import InputCustom from "@/components/input-custom";

import { parseDate, type DateValue } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import DatePickerCustome from "@/components/date-picker-custome";
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

export type ProfileFieldName =
  | "username"
  | "first_name"
  | "last_name"
  | "email"
  | "biography"
  | "phone"
  | "birth_date"
  | "work_status";
export type FormFieldErrors<T extends string> = Partial<Record<T, string[]>>;
export type CompleteProfileErrors = FormFieldErrors<ProfileFieldName>;

export type CompleteProfileFormState = {
  values: Partial<CompleteProfileFormData>;
  errors?: CompleteProfileErrors;
  success?: boolean;
  supabaseResponse?: SupabaseSignUpResponse;
};
const CompleteProfile = () => {
  const [state, formAction, pending] = useActionState(
    createUser,
    completeProfileFormInitialState,
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});
  const [supabaseRes, setSupabaseRes] = useState<SupabaseSignUpResponse>();
  // const [date, setDate] = useState<DateValue | null>(null);

  const changeErrorState = (key: ProfileFieldName) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  useEffect(() => {
    if (state.errors) return setFormErrors(state.errors);
    setSupabaseRes(state.supabaseResponse);
  }, [state]);
  console.log(supabaseRes);
  if (supabaseRes?.error?.code)
    addToast({
      description: getSupabaseErrorMessage(supabaseRes?.error?.code),
    });
  if (supabaseRes?.user?.id)
    return (
      <div>
        یک لنیک فعال سازی برای جیمیل شما ارسال شده
        <Link href="/signin"> وارد شوید</Link>
      </div>
    );

  return (
    <div>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-small text-default-500">
          لطفن فیلد های زیر را پر کنید
        </h1>
      </CardHeader>

      <Divider />

      <CardBody>
        <div className="flex justify-center w-full">
          <AvatarUploader />
        </div>
        <Form action={formAction} className="flex flex-col gap-4">
          <InputCustom
            name="username"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="نام کاربری"
            type="text"
            placeholder="نام کاربری خود را وارد کنید"
            isRequired
          />
          <InputCustom
            name="first_name"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="نام"
            type="text"
            placeholder="نام خود را وارد کنید"
            isRequired
          />
          <InputCustom
            name="last_name"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="نام خانوادگی"
            type="text"
            placeholder="نام خانوادگی خود را وارد کنید"
          />
          <InputCustom
            name="biography"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="بایو"
            type="text"
            placeholder="در چند پاراگراف خود را توضیف کنید"
          />
          <InputCustom
            name="email"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            defaultValue={state.values.email}
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
          />
          <InputCustom
            name="phone"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="شماره همراه"
            type="tel"
            placeholder="شماره موبایل خود را وارد کنید"
          />
          {/* <I18nProvider locale="fa-IR-u-ca-persian">
            <DatePicker
              isInvalid={!!formErrors?.["birth_date"]}
              errorMessage={
                formErrors?.["birth_date"] && (
                  <ul className="mt-1 text-sm text-danger space-y-1">
                    {formErrors?.["birth_date"]?.map((msg, i) => (
                      <li key={i}>• {msg}</li>
                    ))}
                  </ul>
                )
              }
              classNames={{
                base: `
                  text-right
                  [&_[data-slot=input-field]]:justify-end
                  [&_[data-slot=input-field]]:flex
                  [&_[data-slot=input-field]]:flex-row-reverse
                  [&_[data-slot=input-field]]:flex-
                  [&_[data-slot=input-field]]:text-right
                `,
              }}
              name="birth_date"
              variant="bordered"
              dir="rtr"
              labelPlacement="outside"
              label={"تاریخ تولد"}
              disableAnimation
              firstDayOfWeek="sat"
              showMonthAndYearPickers
              value={date}
              onChange={(v) => {
                changeErrorState("birth_date");
                setDate(v);
              }}
            />{" "}
          </I18nProvider> */}
          <DatePickerCustome
            formErrors={formErrors}
            changeErrorState={changeErrorState}
            name="birth_date"
            variant="bordered"
            labelPlacement="outside"
            label={"تاریخ تولد"}
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
    </div>
  );
};

export default CompleteProfile;
