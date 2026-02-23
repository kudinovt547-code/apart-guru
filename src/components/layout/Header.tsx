"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LeadFormModal } from "@/components/lead/LeadFormModal";

const NAV = [
  { href: "/services",    label: "Услуги" },
  { href: "/projects",    label: "База" },
  { href: "/news",        label: "Новости" },
  { href: "/calculator",  label: "Калькулятор" },
  { href: "/contact",     label: "Контакты" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/" className="flex flex-col items-center -mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className="relative w-28 h-28 flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Apart Guru"
              fill
              className="object-contain"
              quality={95}
              priority
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
            className="font-semibold text-base leading-none -mt-6"
          >
            Apart Guru
          </motion.span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-primary text-foreground/70 font-medium"
            >
              {label}
            </Link>
          ))}
          <Button size="sm" onClick={() => setLeadFormOpen(true)}>
            Получить shortlist
          </Button>
        </nav>

        {/* Mobile: menu button */}
        <div className="lg:hidden flex items-center">
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {NAV.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors hover:text-primary text-foreground/70 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Button
                size="sm"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLeadFormOpen(true);
                }}
              >
                Получить shortlist
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <LeadFormModal
        open={leadFormOpen}
        onOpenChange={setLeadFormOpen}
        sourcePage="header"
      />
    </header>
  );
}
