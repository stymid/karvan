// This componnet desigined for now only for text, email and password type
import { FormFieldErrors } from "@/app/(auth)/signup/page";
import { mergeClassNames } from "@/utils/merge-classnames";
import { Input } from "@heroui/input";
import type { InputProps } from "@heroui/input";

import { FormEvent, useEffect, useState } from "react";
import { EyeIcon } from "./icons/eye-icon";
import { EyeClosedIcon } from "./icons/eye-closed-icon";

type InputTypes =
  | "text"
  | "email"
  | "url"
  | "password"
  | "tel"
  | "search"
  | "file";

const baseClassNames: InputProps["classNames"] = {
  inputWrapper: "dark:bg-default-200",
  input: "text-left placeholder:text-right",
  helperWrapper: "text-right",
};

function InputCustom<T extends string>({
  label,
  name,
  placeholder,
  defaultValue,
  onChange,
  changeErrorState,
  formErrors,
  isRequired = false,
  type,
  className,
  classNames,
}: {
  label: string;
  name: T;
  placeholder: string;
  defaultValue?: string | undefined;
  onChange?: (event: FormEvent) => void;
  changeErrorState: (name: T) => void;
  formErrors: FormFieldErrors<T>;
  isRequired?: boolean;
  type?: InputTypes;
  className?: string;
  classNames?: InputProps["classNames"];
}) {
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setValue(defaultValue || "");
  }, []);
  return (
    <Input
      onChange={(e) => {
        onChange ? onChange(e) : null;
        changeErrorState(name);
        setValue(e.target.value);
      }}
      isInvalid={!!formErrors?.[name]}
      errorMessage={
        formErrors?.[name] && (
          <ul className="mt-1 text-sm text-danger space-y-1">
            {formErrors?.[name]?.map((msg, i) => <li key={i}>• {msg}</li>)}
          </ul>
        )
      }
      value={value}
      defaultValue={defaultValue}
      dir="ltr"
      className={className}
      classNames={mergeClassNames(baseClassNames, classNames)}
      labelPlacement="outside"
      name={name}
      placeholder={placeholder}
      label={label}
      type={type === "password" ? (isVisible ? "text" : "password") : type}
      isRequired={isRequired}
      startContent={
        type === "password" ? (
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
        ) : null
      }
    />
  );
}

export default InputCustom;
