import Link from "next/link";
import Image from "next/image";
import { primaryServices } from "@/lib/services-data";

export function Footer() {
  return (
    <footer className="bg-slate-100 w-full pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/images/logo-aiskillzone.png"
              alt="AISkillZone"
              width={400}
              height={80}
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed text-slate-500">
            Curating the future of enterprise intelligence through elite
            consulting and bespoke automation.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-slate-900">
            Services
          </h4>
          <ul className="space-y-4 text-sm leading-relaxed">
            {primaryServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-slate-500 hover:text-orange-500 transition-colors duration-200"
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-slate-900">
            Company
          </h4>
          <ul className="space-y-4 text-sm leading-relaxed">
            <li>
              <Link
                href="/portfolio"
                className="text-slate-500 hover:text-orange-500 transition-colors duration-200"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-slate-900">
            Follow
          </h4>
          <ul className="space-y-4 text-sm leading-relaxed">
            <li>
              <a
                href="#"
                className="text-slate-500 hover:text-orange-500 transition-colors duration-200"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-500 hover:text-orange-500 transition-colors duration-200"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-200">
        <p className="text-sm leading-relaxed text-slate-500 text-center">
          &copy; 2026 AISkillZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
