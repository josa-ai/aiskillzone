import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f2f4f6]/30 px-6 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#004bca]">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-[#191c1e] md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-[#191c1e]/70">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#004bca] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0061ff]"
      >
        Go back home
      </Link>
    </section>
  );
}
