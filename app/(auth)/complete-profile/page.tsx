"use client";

import AvatarUploader from "@/components/avatar-uploader";
import React from "react";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { useActionState, useEffect, useState } from "react";

import { saveUserProfile } from "./acion";

import { addToast } from "@heroui/toast";
import { getProfileErrorMessage } from "@/utils/supabase/error-messages";
import InputCustom from "@/components/input-custom";
import DatePickerCustom from "@/components/date-picker-custom";
import SelectCustom from "@/components/select-custom";
import { completeProfileFormInitialState, ProfileFieldName } from "./types";
import { useRouter } from "next/navigation";

const CompleteProfile = () => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    saveUserProfile,
    completeProfileFormInitialState,
  );
  const [formErrors, setFormErrors] = useState(state?.errors ?? {});
  // const [supabaseRes, setSupabaseRes] =
  //   useState<PostgrestSingleResponse<null>>();
  // const [date, setDate] = useState<DateValue | null>(null);

  const changeErrorState = (key: ProfileFieldName) => {
    setFormErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  useEffect(() => {
    if (state.errors) return setFormErrors(state.errors);
    // setSupabaseRes(state.supabaseResponse);
  }, [state]);
  useEffect(() => {
    if (!state.supabaseResponse) return;
    if (state.supabaseResponse?.status === 204) {
      addToast({
        description: `با موفقیت ذخیره شد. \n به کاروان خوش امدید.`,
        color: "success",
      });
      router.push("/");
    }

    if (state.supabaseResponse?.error?.code)
      addToast({
        description: getProfileErrorMessage(state.supabaseResponse.error.code),
      });
  }, [state]);

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
            isRequired
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
            isRequired
          />
          <InputCustom
            name="phone"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            label="شماره همراه"
            type="tel"
            placeholder="شماره موبایل خود را وارد کنید"
            isRequired
          />

          <DatePickerCustom
            formErrors={formErrors}
            changeErrorState={changeErrorState}
            name="birth_date"
            variant="bordered"
            labelPlacement="outside"
            label={"تاریخ تولد"}
            isRequired
          />
          <SelectCustom
            label={"وضعیت کاری خود را انتخاب کن."}
            name="work_status"
            placeholder="وضعیت"
            changeErrorState={changeErrorState}
            formErrors={formErrors}
            variant="bordered"
            isRequired
          />

          <Button
            type="submit"
            color="primary"
            className="mt-2 w-full"
            isLoading={pending}
            isDisabled={pending}
          >
            ذخیره اطلاعات
          </Button>
        </Form>
      </CardBody>
      <Divider />
    </div>
  );
};

export default CompleteProfile;
