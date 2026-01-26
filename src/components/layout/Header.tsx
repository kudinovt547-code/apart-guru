"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 opacity-95">
            <Image
              src="/logo.jpg"
              alt="Apart Guru"
              fill
              className="object-contain"
              style={{ filter: 'hue-rotate(8deg) saturate(0.75) brightness(1.08)' }}
            />
          </div>
          <span className="font-semibold text-xl">Apart Guru</span>
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
