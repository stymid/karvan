import { FormFieldErrors } from "@/app/(auth)/signup/page";
import { Input } from "@heroui/input";
import { FormEvent, useEffect, useState } from "react";

function EmailInputCustom<T extends string>({
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
  const [value, setValue] = useState("");

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
      className=""
      classNames={{
        inputWrapper: "dark:bg-default-200",
        input: "text-left placeholder:text-right",
        helperWrapper: "text-right",
      }}
      labelPlacement="outside"
      name={name}
      placeholder={placeholder}
      label={label}
      type="email"
      isRequired
    />
  );
}

export default EmailInputCustom;
