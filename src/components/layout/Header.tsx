"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16"
          >
            <Image
              src="/logo.png"
              alt="Apart Guru"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-semibold text-xl"
          >
            Apart Guru
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm">
          <Link
            href="/projects"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Проекты
          </Link>
          <Link
            href="/services"
            className="transition-colors hover:text-primary text-foreground/70"
          >
            Услуги
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
          <Link href="/contact">
            <Button size="sm">Получить подбор</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
