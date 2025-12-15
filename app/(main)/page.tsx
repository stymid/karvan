import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
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
    </div>
  );
}
