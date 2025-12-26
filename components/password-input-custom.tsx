import { Input } from "@heroui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { EyeIcon } from "./icons/eye-icon";
import { EyeClosedIcon } from "./icons/eye-closed-icon";

const PasswordInputCustom = ({
  label,
  name,
  placeholder,
  defaultValue,
  isInvalid,
  errorMessage,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string | undefined;
  isInvalid?: boolean;
  errorMessage?: JSX.Element | undefined;
  onChange?: (event: FormEvent) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const [passValue, setPassValue] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setPassValue(defaultValue || "");
  }, []);
  return (
    <Input
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      defaultValue={defaultValue}
      dir="ltr"
      classNames={{
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
        setPassValue(e.target.value);
      }}
      value={passValue}
      startContent={
        <button
          aria-label="toggle password visibility"
          className="focus:outline-solid outline-transparent"
          type="button"
          onClick={toggleVisibility}
        >
          {passValue ? (
            isVisible ? (
              <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
            )
          ) : (
            <span className="block" /> // placeholder space
          )}
        </button>
      }
    />
  );
};

export default PasswordInputCustom;
