export function filterFormData<T extends Record<string, unknown>>(
  formData: FormData,
  allowedKeys: readonly (keyof T)[],
): Partial<T> {
  const result: Partial<T> = {};

  for (const key of allowedKeys) {
    const value = formData.get(key as string);

    if (typeof value === "string" && value.trim() !== "") {
      result[key] = value as T[typeof key];
    }
  }

  return result;
}
