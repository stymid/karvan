import { title, subtitle } from "@/components/primitives";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const data = await supabase.from("profiles").select("*");
  console.log(data);

  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}> تیمت رو با&nbsp; &nbsp;</span>
          <span className={title({ color: "violet" })}>دوستات بساز</span>
          <br />
          <span className={title()}>پروژه بزن و پیشرفت کن </span>
          <div className={subtitle({ class: "mt-4" })}>
            پیشرفتت رو با دوستات به اشتراک بگذار
          </div>
        </div>
      </section>
    </main>
  );
}
