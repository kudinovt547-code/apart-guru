import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-3">Apart Guru</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Доходность апартаментов в СНГ по фактическим данным. Сравниваем проекты, показываем реальные цифры.
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
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Калькулятор NOI
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
