import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const reasonsWhy = [
    {
      title: "Simple & Elegant",
      description:
        "Dive into blogging with an interface that's clean, distraction-free, and incredibly easy to use.",
    },
    {
      title: "Connect & Engage",
      description:
        "Respond to comments, interact with fellow writers, and build a community around your interests.",
    },
    {
      title: "Tailored to You",
      description:
        "From tech to art, fashion to philosophy, categorize your blog posts and tag your content to reach the right audience.",
    },
    {
      title: "Seamless Experience",
      description:
        "Register in moments using your existing social media accounts and start sharing your insights.",
    },
  ];

  return (
    <section className="min-h-screen flex justify-center">
      <div className="p-4 py-9 flex flex-col items-center">
        <div className="my-10 py-16 flex flex-col items-center">
          <h1 className="text-7xl font-extrabold z-20 bg-clip-text text-transparent bg-gradient-to-b from-primary to-neutral-500">
            Writicle
          </h1>
          <p className="py-5 text-2xl">
            Welcome to Writicle - Your New Creative Space!
          </p>
          <div>
            <p>Unleash Your Thoughts, Inspire the World!</p>
          </div>
          <div className="container text-center py-10">
            <p>
              At Writicle, we believe everyone has a story worth sharing.
              Whether you&apos;re a seasoned blogger or just starting out, our
              platform offers a sleek, intuitive space to express your ideas,
              engage with readers, and grow your personal or professional brand.
            </p>
          </div>
          <div className="flex flex-col items-center py-10">
            <h1 className="text-4xl">Why Join Writicle?</h1>
            <ul className="container grid gap-10 md:grid-cols-2 md:grid-rows-2 text-center py-10">
              {reasonsWhy.map((reason, i) => (
                <li key={i} className="dark:bg-primary shadow-md p-6 rounded-lg">
                  <h2 className="text-3xl font-semibold pb-4">
                    {reason.title}
                  </h2>
                  <p>{reason.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="flex justify-center items-center gap-10 py-6">
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
          </div> */}
        </div>
      </div>
    </section>
  );
}
