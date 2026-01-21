"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
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
