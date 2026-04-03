"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { services, primaryServices, secondaryServices } from "@/lib/services-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
];

function navLinkClasses(active: boolean) {
  return active
    ? "rounded-full bg-slate-950 px-4 py-2 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
    : "rounded-full px-4 py-2 text-slate-600 transition-all duration-300 hover:bg-white/70 hover:text-slate-950";
}

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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        className="nav-shell mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.6rem] px-4 md:h-[74px] md:px-6"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-aiskillzone.png"
            alt="AISkillZone"
            width={400}
            height={80}
            className="h-9 w-auto md:h-11"
            priority
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClasses(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}

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
              className={`${navLinkClasses(isActive("/services"))} inline-flex items-center gap-1.5`}
            >
              Services
              <motion.span
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-3 w-[30rem] overflow-hidden rounded-[2rem] border border-white/50 bg-white/82 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
                  role="menu"
                  aria-label="Services menu"
                >
                  <div className="mb-4 flex items-center justify-between rounded-[1.5rem] bg-slate-950 px-4 py-3 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-white/65">
                        Capability Library
                      </p>
                      <p className="mt-1 text-sm text-white/85">
                        Browse the services behind the execution layer.
                      </p>
                    </div>
                    <Sparkles className="h-5 w-5 text-sky-300" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.5rem] bg-slate-50 p-3">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Core Services
                      </p>
                      <div className="space-y-1.5">
                        {primaryServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            role="menuitem"
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition-all hover:bg-white hover:text-slate-950"
                          >
                            <span className="text-base">{service.icon}</span>
                            <span>{service.shortTitle}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] bg-slate-50 p-3">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        Additional
                      </p>
                      <div className="space-y-1.5">
                        {secondaryServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            role="menuitem"
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition-all hover:bg-white hover:text-slate-950"
                          >
                            <span className="text-base">{service.icon}</span>
                            <span>{service.shortTitle}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/services"
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-0.5"
                    >
                      View all services
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full bg-white/70"
                />
              }
            >
              <Menu className="h-5 w-5 text-slate-900" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 overflow-y-auto border-l-white/20 bg-slate-950/92 text-white backdrop-blur-2xl"
            >
              <SheetHeader className="pb-0">
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

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  Navigation
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                            isActive(link.href)
                              ? "bg-white text-slate-950"
                              : "bg-white/6 text-white/84 hover:bg-white/10"
                          }`}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                      Services
                    </p>
                    <p className="mt-1 text-sm text-white/72">
                      Browse the full capabilities list.
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid gap-2">
                        {services.map((service) => (
                          <SheetClose
                            key={service.slug}
                            render={
                              <Link
                                href={`/services/${service.slug}`}
                                className="flex items-center gap-3 rounded-2xl bg-white/6 px-3 py-3 text-sm text-white/82 transition-colors hover:bg-white/10"
                              />
                            }
                          >
                            <span className="text-base">{service.icon}</span>
                            {service.shortTitle}
                          </SheetClose>
                        ))}
                        <SheetClose
                          render={
                            <Link
                              href="/services"
                              className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950"
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
