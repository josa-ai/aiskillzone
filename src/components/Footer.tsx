"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/services-data";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-mauve-purple/20 bg-brand-midnight-plum text-brand-soft-lavender">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-royal-purple/20 blur-3xl" />
        <div className="absolute -right-20 top-0 h-60 w-60 rounded-full bg-brand-tech-blue/10 blur-3xl" />

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute -bottom-10 -right-10 text-6xl opacity-10"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
            <polygon points="40,5 70,22.5 70,57.5 40,75 10,57.5 10,22.5" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute -left-5 top-1/4 text-4xl opacity-5"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
            <circle cx="30" cy="30" r="25" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo and description */}
        <div className="mb-10">
          <Link href="/" className="group inline-block">
            <Image
              src="/images/logo-vertical.png"
              alt="JOSA.AI"
              width={120}
              height={120}
              className="h-24 w-auto transition-transform group-hover:scale-105"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-brand-soft-lavender/70">
            We build AI into your business. Custom websites, voice AI, smart
            automation, and training for small businesses across Central Florida.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Services */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue" />
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-2 text-sm text-brand-soft-lavender/80 transition-all hover:text-brand-mauve-purple"
                  >
                    <span className="h-1 w-0 rounded-full bg-brand-mauve-purple/50 transition-all group-hover:w-2" />
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue" />
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-brand-soft-lavender/80 transition-all hover:text-brand-mauve-purple"
                  >
                    <span className="h-1 w-0 rounded-full bg-brand-mauve-purple/50 transition-all group-hover:w-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue" />
              Location
            </h3>
            <p className="text-sm text-brand-soft-lavender/80">
              Lakeland, FL
            </p>
            <p className="mt-1 text-sm text-brand-soft-lavender/60">
              Serving Central Florida &amp; beyond
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue" />
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@josa.ai"
                  className="group flex items-center gap-2 text-sm text-brand-tech-blue transition-all hover:text-brand-mauve-purple"
                >
                  <span className="h-1 w-0 rounded-full bg-brand-mauve-purple/50 transition-all group-hover:w-2" />
                  info@josa.ai
                </a>
              </li>
            </ul>

            {/* Social links with hover animation */}
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft-lavender/10 text-brand-soft-lavender/60 transition-all hover:bg-brand-mauve-purple/20 hover:text-brand-mauve-purple"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg bg-brand-mauve-purple/0 transition-all group-hover:bg-brand-mauve-purple/20" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-soft-lavender/20 pt-8 sm:flex-row">
          <p className="text-xs text-brand-soft-lavender/60">
            &copy; {new Date().getFullYear()} JOSA.AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="group flex items-center gap-1 text-xs text-brand-soft-lavender/60 transition-colors hover:text-brand-mauve-purple"
            >
              Privacy Policy
              <motion.span
                className="h-px w-0 rounded-full bg-brand-mauve-purple transition-all group-hover:w-3"
                animate={{ width: [0, 0, 0] }}
              />
            </Link>
            <Link
              href="/terms"
              className="group flex items-center gap-1 text-xs text-brand-soft-lavender/60 transition-colors hover:text-brand-mauve-purple"
            >
              Terms of Service
              <motion.span
                className="h-px w-0 rounded-full bg-brand-mauve-purple transition-all group-hover:w-3"
                animate={{ width: [0, 0, 0] }}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
