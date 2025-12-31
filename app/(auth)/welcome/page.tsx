"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    const supabase = createClient();

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (!error) {
        router.replace("/complete-profile");
      }
    });
  }, [code]);

  return <p>در حال تایید ایمیل...</p>;
}
