"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center px-4 justify-between">
        <Link href="/" className="flex flex-col items-center">
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
            className="font-semibold text-base leading-none -mt-2"
          >
            Apart Guru
          </motion.span>
        </Link>

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
      </div>
    </header>
  );
}
