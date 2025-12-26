"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { useState } from "react";
import { EyeIcon } from "@/components/icons/eye-icon";
import { EyeClosedIcon } from "@/components/icons/eye-closed-icon";
import PasswordInputCustom from "@/components/password-input-custom";

export default function Page() {
  return (
    <>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold">ثبت نام</h1>
        <p className="text-small text-default-500">
          برای ساخت حساب، ایمیل و رمز عبور خود را وارد کنید.
        </p>
      </CardHeader>
      <CardBody>
        <input className="" />
        <Form className="flex flex-col gap-4">
          <Input
            classNames={{ input: "text-left placeholder:text-right" }}
            labelPlacement="outside"
            name="email"
            placeholder="ایمیل خود را وارد کنید."
            label="ایمیل"
            type="email"
            isRequired
          />
          <PasswordInputCustom
            label="رمز"
            name="password"
            placeholder="رمز خودراوارد کنید"
          />
          <PasswordInputCustom
            label="تایید رمز"
            name="confirm_password"
            placeholder="رمز خود را دوباره تکرار کنید"
          />
          <Button
            color="primary"
            className="mt-2 w-full"
            // isLoading={true}
            // isDisabled={true}
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
