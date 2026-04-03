"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  services,
  primaryServices,
  secondaryServices,
} from "@/lib/services-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
];

export function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="bg-slate-50/70 backdrop-blur-md fixed top-0 w-full z-50 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-8 h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-aiskillzone.png"
            alt="AISkillZone"
            width={400}
            height={80}
            className="h-[50px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex font-heading font-medium text-sm tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 ${
                isActive(link.href)
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-blue-500"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 transition-colors duration-300 ${
                isActive("/services")
                  ? "text-blue-600 font-bold border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-blue-500"
              }`}
            >
              Services
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl p-4 shadow-xl"
                  role="menu"
                  aria-label="Services menu"
                >
                  <div className="mb-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Core Services
                    </p>
                    <div className="space-y-1">
                      {primaryServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          role="menuitem"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50 hover:text-blue-600"
                        >
                          <span className="text-base">{service.icon}</span>
                          <span>{service.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Additional Services
                    </p>
                    <div className="space-y-1">
                      {secondaryServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          role="menuitem"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50 hover:text-blue-600"
                        >
                          <span className="text-base">{service.icon}</span>
                          <span>{service.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <Link
                      href="/services"
                      role="menuitem"
                      className="block text-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
                    >
                      View all services
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/logo-aiskillzone.png"
                    alt="AISkillZone"
                    width={400}
                    height={80}
                    className="h-10 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 pt-2">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-blue-600 ${
                          isActive(link.href)
                            ? "text-blue-600"
                            : "text-slate-700"
                        }`}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                {/* Mobile services accordion */}
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Services
                  <svg
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 pl-4 pb-2">
                        {services.map((service) => (
                          <SheetClose
                            key={service.slug}
                            render={
                              <Link
                                href={`/services/${service.slug}`}
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                              />
                            }
                          >
                            <span>{service.icon}</span>
                            {service.shortTitle}
                          </SheetClose>
                        ))}
                        <SheetClose
                          render={
                            <Link
                              href="/services"
                              className="block px-2 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
                            />
                          }
                        >
                          View all services
                        </SheetClose>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
