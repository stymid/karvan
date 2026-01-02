"use client";

import { getSupabaseErrorMessage } from "@/utils/supabase/error-messages";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";

const Toast = ({ isError }: { isError: string }) => {
  useEffect(() => {
    if (isError)
      addToast({
        description: getSupabaseErrorMessage(isError),
        timeout: 5000,
      });
  }, [isError]);
  console.log(isError);

  return <div></div>;
};

export default Toast;
