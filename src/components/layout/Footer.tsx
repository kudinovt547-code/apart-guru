import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.svg"
                  alt="Apart Guru"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg">Apart Guru</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Подбор апартаментов с реальной доходностью. Сопровождаем сделки и защищаем инвестиции.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Платформа</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Каталог проектов
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Калькулятор доходности
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Сравнение
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Получить подбор
                </Link>
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
