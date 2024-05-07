import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Articles } from "./_components/articles";

export default function Home() {
  return (
    <section className="min-h-screen flex justify-center">
      <div className="p-4 py-9 flex flex-col items-center">
        <div className="my-10 py-16 flex flex-col items-center">
          <h1 className="text-7xl font-extrabold z-20 bg-clip-text text-transparent bg-gradient-to-b from-primary to-neutral-500">
            Writicle
          </h1>
          <p className="py-5 text-2xl">
            A blog that provides you with the latest and greatest articles about
            music.
          </p>
          <div className="flex justify-center items-center gap-10 py-6">
            <Button
              asChild
              variant="default"
              className="text-white text-2xl font-semibold py-7 px-9"
              size="lg"
            >
              <Link href="/login">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="font-semibold text-2xl py-7 px-9"
              size="lg"
            >
              <Link href="/articles">See Articles</Link>
            </Button>
          </div>
        </div>
        <div className="my-5 flex flex-col items-center">
          <h1 className="text-2xl font-bold">Latest Articles</h1>
        </div>
        <Articles />
      </div>
    </section>
  );
}
