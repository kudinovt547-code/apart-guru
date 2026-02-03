"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/" className="flex flex-col items-center -mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
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
          <Link
            href="/"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Главная
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            База
          </Link>
          <Link
            href="/invest"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Инвестировать
          </Link>
          <Link
            href="/compare"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Сравнение
          </Link>
          <Link
            href="/calculator"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Калькулятор
          </Link>
          <Link
            href="/services"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Услуги
          </Link>
          <Link
            href="/community"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Сообщество
          </Link>
          <Link
            href="/legal"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Правовая информация
          </Link>
          <Link href="/contact">
            <Button size="sm">Получить подбор</Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
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
              <Link
                href="/"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                href="/projects"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                База
              </Link>
              <Link
                href="/invest"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Инвестировать
              </Link>
              <Link
                href="/compare"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Сравнение
              </Link>
              <Link
                href="/calculator"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Калькулятор
              </Link>
              <Link
                href="/services"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Услуги
              </Link>
              <Link
                href="/community"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Сообщество
              </Link>
              <Link
                href="/legal"
                className="transition-colors hover:text-primary text-foreground/70 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Правовая информация
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">Получить подбор</Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
