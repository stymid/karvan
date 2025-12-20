import { NextRequest } from "next/server";
import { createMiddlewareClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request);

  // this line do refresh the token
  await supabase.auth.getUser();
  console.log("dare kar mokone");

  return supabaseResponse;
}
