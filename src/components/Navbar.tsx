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
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-40 w-full border-b border-border/40 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 shadow-lg shadow-brand-royal-purple/5 backdrop-blur-xl"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-16"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/images/logo-horizontal.png"
              alt="JOSA.AI"
              width={2011}
              height={754}
              className="h-16 w-auto transition-all group-hover:drop-shadow-lg"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-soft-lavender/50 hover:text-primary ${
                isActive("/services")
                  ? "text-primary"
                  : "text-brand-deep-navy"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Services
              <motion.svg
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
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
            </motion.button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-border bg-popover p-4 shadow-xl shadow-brand-royal-purple/10 backdrop-blur-xl"
                  role="menu"
                  aria-label="Services menu"
                >
                  {/* Glow effect */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand-royal-purple/5 to-brand-tech-blue/5" />

                  <div className="relative z-10">
                    <div className="mb-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Core Services
                      </p>
                      <div className="space-y-1">
                        {primaryServices.map((service, index) => (
                          <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={`/services/${service.slug}`}
                              role="menuitem"
                              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-deep-navy transition-all hover:bg-brand-soft-lavender/50 hover:text-primary"
                            >
                              <span className="text-base">{service.icon}</span>
                              <span>{service.shortTitle}</span>
                              <motion.span
                                className="ml-auto h-1 w-0 rounded-full bg-brand-mauve-purple opacity-0 transition-all group-hover:w-2 group-hover:opacity-100"
                                animate={{ width: [0, 0, 0] }}
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Additional Services
                      </p>
                      <div className="space-y-1">
                        {secondaryServices.map((service, index) => (
                          <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                          >
                            <Link
                              href={`/services/${service.slug}`}
                              role="menuitem"
                              className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-deep-navy transition-all hover:bg-brand-soft-lavender/50 hover:text-primary"
                            >
                              <span className="text-base">{service.icon}</span>
                              <span>{service.shortTitle}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 border-t border-border pt-3">
                      <Link
                        href="/services"
                        role="menuitem"
                        className="block text-center text-sm font-medium text-primary transition-colors hover:text-brand-mauve-purple"
                      >
                        View all services
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-soft-lavender/50 hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-brand-deep-navy"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-royal-purple origin-left transition-transform duration-200 ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </motion.div>
          ))}

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              render={<Link href="https://link.josa.ai/widget/bookings/tech-audit-calendar" />}
              className="ml-2 rounded-lg bg-primary text-white transition-all hover:bg-brand-mauve-purple hover:shadow-lg hover:shadow-brand-mauve-purple/20"
            >
              Book a Call
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/logo-horizontal.png"
                    alt="JOSA.AI"
                    width={2011}
                    height={754}
                    className="h-8 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 pt-2">
                {/* Mobile services accordion */}
                <motion.button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-brand-deep-navy transition-colors hover:bg-brand-soft-lavender/50"
                  whileTap={{ scale: 0.98 }}
                >
                  Services
                  <motion.svg
                    className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

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
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-brand-deep-navy transition-colors hover:bg-brand-soft-lavender/50 hover:text-primary"
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
                              className="block px-2 py-1.5 text-sm font-medium text-primary transition-colors hover:text-brand-mauve-purple"
                            />
                          }
                        >
                          View all services
                        </SheetClose>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-soft-lavender/50 hover:text-primary ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-brand-deep-navy"
                        }`}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}

                <div className="mt-4 px-3">
                  <SheetClose
                    render={
                      <Link
                        href="https://link.josa.ai/widget/bookings/tech-audit-calendar"
                        className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-mauve-purple"
                      />
                    }
                  >
                    Book a Call
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
