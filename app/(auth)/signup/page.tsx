"use client";

import { CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Divider } from "@heroui/divider";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Page() {
  return (
    <>
      <CardHeader className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold">ثبت نام</h1>

        <p className="text-small text-default-500">
          لطفن ایمیل و رمزتون رو وارد کنید.
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <Input label="ایمیل" type="email" isRequired />
          <Input label="رمز" type="password" isRequired />
          <Input label="تایید رمز" type="password" isRequired />

          <Button color="primary" className="mt-2">
            ایجاد حساب
          </Button>
        </form>
      </CardBody>
      <Divider />
      <CardFooter>
        قبلن ثبت نام کرده اید؟{" "}
        <Link color="secondary" href="/singin">
          وارد شوید
        </Link>
      </CardFooter>
    </>
  );
}
