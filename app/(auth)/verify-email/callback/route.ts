import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("route", code);
  console.log("route", code);

  if (!code) {
    return NextResponse.redirect(new URL("/signin?e=missing_code", url.origin));
  }

  const supabase = await createClient();

  const { error, data } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/signin?e=${encodeURIComponent(error.code ?? "verify_failed")}`,
        url.origin,
      ),
    );
  }

  return NextResponse.redirect(new URL("/complete-profile", url.origin));
}
