"use client";
// This componnet desigined for pick a date
import { FormFieldErrors } from "@/app/(auth)/signup/page";

import type { DatePickerProps } from "@heroui/date-picker";

import { FormEvent, useEffect, useState } from "react";
import type { CalendarDate } from "@internationalized/date";

import { I18nProvider } from "@react-aria/i18n";
import { DatePicker } from "@heroui/date-picker";
import { mergeClassNames } from "@/utils/merge-classnames";

const baseClassNames: DatePickerProps["classNames"] = {
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
const DatePickerCustom = <T extends string>({
  label,
  labelPlacement = "outside",
  name,
  defaultValue = null,
  onChange,
  changeErrorState,
  formErrors,
  isRequired = false,
  className,
  variant,
  classNames,
}: {
  label?: string;
  labelPlacement?: LabelPlacementType;
  name: T;

  defaultValue?: DatePickerProps["value"] | null;
  onChange?: (event: FormEvent) => void;
  changeErrorState: (name: T) => void;
  formErrors: FormFieldErrors<T>;
  isRequired?: boolean;
  className?: string;
  variant: DatePickerProps["variant"];
  classNames?: DatePickerProps["classNames"];
}) => {
  const [date, setDate] = useState<DatePickerProps["value"] | null>(null);

  useEffect(() => {
    if (defaultValue) setDate(defaultValue);
  }, []);
  return (
    <I18nProvider locale="fa-IR-u-ca-persian">
      <DatePicker
        isInvalid={!!formErrors?.[name]}
        errorMessage={
          formErrors?.[name] && (
            <ul className="mt-1 text-sm text-danger space-y-1">
              {formErrors?.[name]?.map((msg, i) => <li key={i}>• {msg}</li>)}
            </ul>
          )
        }
        defaultValue={defaultValue}
        className={className}
        classNames={mergeClassNames(baseClassNames, classNames)}
        label={label}
        labelPlacement={labelPlacement}
        name={name}
        variant={variant}
        dir="rtr"
        isRequired={isRequired}
        disableAnimation
        firstDayOfWeek="sat"
        showMonthAndYearPickers
        value={date}
        onChange={(v) => {
          changeErrorState(name);
          setDate(v);
        }}
      />{" "}
    </I18nProvider>
  );
};

export default DatePickerCustom;
