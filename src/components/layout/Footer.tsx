"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ opacity: 0, rotate: -180, scale: 0 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.6 } }}
                className="relative w-14 h-14"
              >
                <Image src="/logo.png" alt="Apart Guru" fill className="object-contain" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-semibold text-lg"
              >
                Apart Guru
              </motion.h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Подбор апартаментов с реальной доходностью. Сопровождаем сделки и защищаем инвестиции.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services"   className="hover:text-primary transition-colors">Услуги</Link></li>
              <li><Link href="/projects"   className="hover:text-primary transition-colors">База данных</Link></li>
              <li><Link href="/news"       className="hover:text-primary transition-colors">Новости рынка</Link></li>
              <li><Link href="/calculator" className="hover:text-primary transition-colors">Калькулятор доходности</Link></li>
              <li><Link href="/compare"    className="hover:text-primary transition-colors">Сравнение проектов</Link></li>
              <li><Link href="/contact"    className="hover:text-primary transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:kudinovt549@gmail.com" className="hover:text-primary transition-colors">
                  kudinovt549@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+79817389197" className="hover:text-primary transition-colors">
                  +7 981 738-91-97
                </a>
              </li>
              <li>
                <a href="https://t.me/apartgurusupp" target="_blank" rel="noopener noreferrer"
                  className="hover:text-primary transition-colors">
                  Telegram: @apartgurusupp
                </a>
              </li>
              <li>
                <Link href="/legal" className="hover:text-primary transition-colors">
                  Правовая информация
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Apart Guru. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
