import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-frosted-blue/30 px-6 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-royal-purple">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-brand-deep-navy md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-brand-deep-navy/70">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-royal-purple px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-mauve-purple"
      >
        Go back home
      </Link>
    </section>
  );
}
