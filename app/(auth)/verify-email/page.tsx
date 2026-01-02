import { createClient } from "@/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import Toast from "./toast";
import { Link } from "@heroui/link";

type params = { code: string };
const VerifEmail = async ({
  searchParams,
}: {
  searchParams: Promise<params>;
}) => {
  const p = (await searchParams).code;
  console.log(p);
  const l = await createClient();
  const k = await l.auth.exchangeCodeForSession(p);
  console.log("---------");
  console.log(k, 99);
  console.log("---------");
  return (
    <div>
      <Toast isError={typeof k.error?.code === "string" ? k.error?.code : ""} />
      {k.error?.code ? (
        "خطایی رخ داده است مجددن تلاش کنید"
      ) : k.data.session ? (
        <div>
          <p>
            ایمیل شما تایید شد و با موفقیت وارد شدید لطفن با وارد شدن به صفحه
            زیر پروفایل خود را کامل کنید
          </p>

          <Link href="/complete-profile">تکمیل پروفایل</Link>
        </div>
      ) : (
        <div>
          <p>
            ایمیل شدما با موفقعیت تایید شد لطفن با پسوورد و ایمیل خود وارد شوید.
          </p>
          <Link href="/signin">وارد شوید.</Link>
        </div>
      )}
    </div>
  );
};

export default VerifEmail;
