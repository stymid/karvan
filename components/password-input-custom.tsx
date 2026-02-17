import { Input } from "@heroui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { EyeIcon } from "./icons/eye-icon";
import { EyeClosedIcon } from "./icons/eye-closed-icon";
import { FormFieldErrors } from "@/app/(auth)/signup/types";

function PasswordInputCustom<T extends string>({
  label,
  name,
  placeholder,
  defaultValue,
  onChange,
  changeErrorState,
  formErrors,
}: {
  label: string;
  name: T;
  placeholder: string;
  defaultValue?: string | undefined;
  onChange?: (event: FormEvent) => void;
  changeErrorState: (name: T) => void;
  formErrors: FormFieldErrors<T>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const [value, setValue] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setValue(defaultValue || "");
  }, []);
  return (
    <Input
      errorMessage={
        formErrors?.[name] && (
          <ul className="mt-1 text-sm text-danger space-y-1">
            {formErrors?.[name]?.map((msg, i) => <li key={i}>• {msg}</li>)}
          </ul>
        )
      }
      isInvalid={!!formErrors?.[name]}
      defaultValue={defaultValue}
      dir="ltr"
      classNames={{
        inputWrapper: "dark:bg-default-200",
        input: "text-left placeholder:text-right",
        helperWrapper: "text-right",
      }}
      label={label}
      name={name}
      placeholder={placeholder}
      labelPlacement="outside"
      isRequired
      type={isVisible ? "text" : "password"}
      onChange={(e) => {
        onChange ? onChange(e) : null;
        changeErrorState(name);
        setValue(e.target.value);
      }}
      value={value}
      startContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-solid outline-transparent"
          type="button"
          onClick={toggleVisibility}
        >
          {value ? (
            isVisible ? (
              <EyeIcon className="text-2xl stroke-default-600 pointer-events-none text" />
            ) : (
              <EyeClosedIcon className="text-2xl fill-default-600 pointer-events-none" />
            )
          ) : (
            <span className="block" /> // placeholder space
          )}
        </button>
      }
    />
  );
}

export default PasswordInputCustom;
