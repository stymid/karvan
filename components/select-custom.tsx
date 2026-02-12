import { Select, SelectItem } from "@heroui/select";

import { FormFieldErrors } from "@/app/(auth)/signup/page";

import type { SelectProps, SelectItemProps } from "@heroui/select";
import type { Selection, Key } from "@react-types/shared";

import { FormEvent, useEffect, useState } from "react";

import { mergeClassNames } from "@/utils/merge-classnames";
import { WorkStatus } from "@/types";
import { workStatusSchema } from "@/app/(auth)/complete-profile/schema";

const baseClassNames: SelectProps["classNames"] = {
  base: `
          text-right
          [&_[data-slot=input-field]]:justify-end
          [&_[data-slot=input-field]]:flex
          [&_[data-slot=input-field]]:flex-row-reverse
          [&_[data-slot=input-field]]:flex-
          [&_[data-slot=input-field]]:text-right
        `,
};

type LabelPlacementType = "inside" | "outside" | "outside-left";

const workstatus = workStatusSchema.options.map((status) => ({
  key: status,
  label: status.replaceAll("_", " "),
}));

export default function SelectCustom<T extends string>({
  label,
  labelPlacement = "outside",
  name,
  defaultSelectedKeys,
  onChange,
  changeErrorState,
  formErrors,
  isRequired = false,
  className,
  variant,
  classNames,
}: {
  label?: string | number;
  labelPlacement?: LabelPlacementType;
  name: T;
  defaultSelectedKeys?: Iterable<Key>;
  onChange?: (event: FormEvent) => void;
  changeErrorState: (name: T) => void;
  formErrors: FormFieldErrors<T>;
  isRequired?: boolean;
  className?: string;
  variant: SelectProps["variant"];
  classNames?: SelectProps["classNames"];
}) {
  const [select, setSelect] = useState<Selection>();

  useEffect(() => {
    if (defaultSelectedKeys) setSelect(new Set(defaultSelectedKeys));
  }, []);
  return (
    <Select
      label={label}
      isInvalid={!!formErrors?.[name]}
      errorMessage={
        formErrors?.[name] && (
          <ul className="mt-1 text-sm text-danger space-y-1">
            {formErrors?.[name]?.map((msg, i) => <li key={i}>• {msg}</li>)}
          </ul>
        )
      }
      defaultSelectedKeys={defaultSelectedKeys}
      className={className}
      classNames={mergeClassNames(baseClassNames, classNames)}
      labelPlacement={labelPlacement}
      name={name}
      variant={variant}
      dir="rtr"
      isRequired={isRequired}
      disableAnimation
      onSelectionChange={(keys) => {
        changeErrorState(name);
        setSelect(keys);
      }}
    >
      {workstatus.map((status) => (
        <SelectItem key={status.key}>{status.label}</SelectItem>
      ))}
    </Select>
  );
}
