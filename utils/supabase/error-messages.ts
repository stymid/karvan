export type AuthErrorCode =
  | "unexpected_failure"
  | "validation_failed"
  | "bad_json"
  | "email_exists"
  | "phone_exists"
  | "bad_jwt"
  | "not_admin"
  | "no_authorization"
  | "user_not_found"
  | "session_not_found"
  | "session_expired"
  | "refresh_token_not_found"
  | "refresh_token_already_used"
  | "flow_state_not_found"
  | "flow_state_expired"
  | "signup_disabled"
  | "user_banned"
  | "provider_email_needs_verification"
  | "invite_not_found"
  | "bad_oauth_state"
  | "bad_oauth_callback"
  | "oauth_provider_not_supported"
  | "unexpected_audience"
  | "single_identity_not_deletable"
  | "email_conflict_identity_not_deletable"
  | "identity_already_exists"
  | "email_provider_disabled"
  | "phone_provider_disabled"
  | "too_many_enrolled_mfa_factors"
  | "mfa_factor_name_conflict"
  | "mfa_factor_not_found"
  | "mfa_ip_address_mismatch"
  | "mfa_challenge_expired"
  | "mfa_verification_failed"
  | "mfa_verification_rejected"
  | "insufficient_aal"
  | "captcha_failed"
  | "saml_provider_disabled"
  | "manual_linking_disabled"
  | "sms_send_failed"
  | "email_not_confirmed"
  | "phone_not_confirmed"
  | "reauth_nonce_missing"
  | "saml_relay_state_not_found"
  | "saml_relay_state_expired"
  | "saml_idp_not_found"
  | "saml_assertion_no_user_id"
  | "saml_assertion_no_email"
  | "user_already_exists"
  | "sso_provider_not_found"
  | "saml_metadata_fetch_failed"
  | "saml_idp_already_exists"
  | "sso_domain_already_exists"
  | "saml_entity_id_mismatch"
  | "conflict"
  | "provider_disabled"
  | "user_sso_managed"
  | "reauthentication_needed"
  | "same_password"
  | "reauthentication_not_valid"
  | "otp_expired"
  | "otp_disabled"
  | "identity_not_found"
  | "weak_password"
  | "over_request_rate_limit"
  | "over_email_send_rate_limit"
  | "over_sms_send_rate_limit"
  | "bad_code_verifier"
  | "anonymous_provider_disabled"
  | "hook_timeout"
  | "hook_timeout_after_retry"
  | "hook_payload_over_size_limit"
  | "hook_payload_invalid_content_type"
  | "request_timeout"
  | "mfa_phone_enroll_not_enabled"
  | "mfa_phone_verify_not_enabled"
  | "mfa_totp_enroll_not_enabled"
  | "mfa_totp_verify_not_enabled"
  | "mfa_webauthn_enroll_not_enabled"
  | "mfa_webauthn_verify_not_enabled"
  | "mfa_verified_factor_exists"
  | "invalid_credentials"
  | "email_address_not_authorized"
  | "email_address_invalid";

type ErrorMessageMap = {
  [K in AuthErrorCode]?: string;
};
export const SUPABASE_AUTH_ERROR_MESSAGES: ErrorMessageMap = {
  invalid_credentials: "ایمیل یا رمز عبور اشتباه است",
  email_exists: "این ایمیل قبلاً ثبت‌نام شده است",
  user_already_exists: "کاربری با این مشخصات وجود دارد",
  email_not_confirmed: "ایمیل شما هنوز تأیید نشده است",
  weak_password: "رمز عبور ضعیف است",
  same_password: "رمز جدید نمی‌تواند مشابه رمز قبلی باشد",

  over_request_rate_limit: "درخواست‌های بیش از حد، لطفاً کمی بعد تلاش کنید",
  over_email_send_rate_limit: "ارسال ایمیل بیش از حد مجاز بوده است",
  over_sms_send_rate_limit: "ارسال پیامک بیش از حد مجاز بوده است",

  signup_disabled: "ثبت‌نام در حال حاضر غیرفعال است",
  user_banned: "دسترسی این کاربر مسدود شده است",

  captcha_failed: "تأیید امنیتی ناموفق بود",

  otp_expired:
    "لینک تأیید منقضی شده است. لطفاً دوباره درخواست تأیید ایمیل دهید",

  bad_code_verifier: "لینک تأیید معتبر نیست یا قبلاً استفاده شده است",

  flow_state_expired: "فرآیند تأیید منقضی شده است. لطفاً دوباره ثبت‌نام کنید",

  reauth_nonce_missing:
    "فرآیند تأیید ناقص است. لطفاً دوباره از طریق ایمیل اقدام کنید",

  reauthentication_needed: "برای ادامه لازم است دوباره احراز هویت انجام شود",

  request_timeout: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید",

  validation_failed: "لینک تایید منقضی شده است. لطفاً دوباره وارد شوید.",

  unexpected_failure: "خطای غیرمنتظره‌ای رخ داده است",

  flow_state_not_found:
    "  نشست تأیید ایمیل منقضی شده است. لطفاً دوباره وارد شوید یا لینک جدید دریافت کنید. ",
};
export function getSupabaseAuthErrorMessage(errorCode?: string | null): string {
  if (!errorCode) {
    return "خطای نامشخصی رخ داده است";
  }

  return (
    SUPABASE_AUTH_ERROR_MESSAGES[errorCode as AuthErrorCode] ??
    "خطای نامشخصی رخ داده است"
  );
}
// ==================completeprofile route errors
export type ProfileErrorCode =
  | "validation_failed"
  | "not_authorized"
  | "user_not_found"
  | "email_exists"
  | "phone_exists"
  | "conflict"
  | "request_timeout"
  | "unexpected_failure";
export const PROFILE_ERROR_MESSAGES: Record<ProfileErrorCode, string> = {
  validation_failed: "اطلاعات وارد شده معتبر نیست",
  not_authorized: "دسترسی غیرمجاز",
  user_not_found: "کاربر یافت نشد",

  email_exists: "این ایمیل قبلاً استفاده شده است",
  phone_exists: "این شماره قبلاً ثبت شده است",
  conflict: "اطلاعات تکراری است",

  request_timeout: "ارتباط با سرور برقرار نشد",
  unexpected_failure: "خطای غیرمنتظره‌ای رخ داده است",
};
export function getProfileErrorMessage(errorCode?: string | null): string {
  if (!errorCode) {
    return "خطای نامشخصی رخ داده است";
  }

  return (
    PROFILE_ERROR_MESSAGES[errorCode as ProfileErrorCode] ??
    "خطای نامشخصی رخ داده است"
  );
}

// ================== signin route errors
// signin.errors.ts
export type SigninErrorCode =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "too_many_requests"
  | "request_timeout"
  | "unexpected_failure";
export const SIGNIN_ERROR_MESSAGES: Record<SigninErrorCode, string> = {
  invalid_credentials: "ایمیل یا رمز عبور اشتباه است",

  email_not_confirmed: "ایمیل شما هنوز تأیید نشده است",

  too_many_requests:
    "تعداد تلاش‌ها بیش از حد مجاز است، لطفاً بعداً امتحان کنید",

  request_timeout: "ارتباط با سرور برقرار نشد",

  unexpected_failure: "خطای غیرمنتظره‌ای رخ داده است",
};
export function getSigninErrorMessage(errorCode?: string | null): string {
  if (!errorCode) {
    return "خطای نامشخصی رخ داده است";
  }

  return (
    SIGNIN_ERROR_MESSAGES[errorCode as SigninErrorCode] ??
    "خطای نامشخصی رخ داده است"
  );
}
