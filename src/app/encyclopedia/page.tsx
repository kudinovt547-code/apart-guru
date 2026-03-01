"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  HomeIcon, 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  History, 
  AlertTriangle, 
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Hotel,
  Banknote,
  BarChart3,
  Clock,
  ShieldAlert
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "definition",
    title: "Что такое апартаменты",
    icon: <Building2 className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          <strong className="text-foreground">Апартаменты</strong> — это помещения в многоквартирном доме, которые имеют юридический статус <strong className="text-foreground">нежилого помещения</strong>.
        </p>
        
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Ключевые отличия от квартир:</h4>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Юридический статус: нежилое помещение (не прописаться)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">НДС: при покупке от юрлица может быть НДС 20%</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Налог на имущество: как у коммерческой недвижимости (выше)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Ипотека: специальные программы, ставки обычно выше</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Назначение: изначально предназначены для коммерческого использования</span>
            </li>
          </ul>
        </div>
        
        <p className="text-muted-foreground text-sm">
          По факту апартаменты часто выглядят как обычные квартиры, но юридически остаются коммерческой недвижимостью с соответствующими ограничениями и налогообложением.
        </p>
      </div>
    ),
  },
  {
    id: "types",
    title: "Виды апартаментов",
    icon: <Hotel className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🏨 Апарт-отели</h4>
            <p className="text-sm text-muted-foreground">Управляются как гостиница, есть reception, room service. Доходность 8-12% в год.</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🏢 Сервисные апартаменты</h4>
            <p className="text-sm text-muted-foreground">Больше похожи на квартиры, минимальный сервис. Доходность 6-10% в год.</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎨 Лофты</h4>
            <p className="text-sm text-muted-foreground">Открытые планировки, высокие потолки, обычно в исторических зданиях. Больше для статуса.</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🏖️ Кондо-отели</h4>
            <p className="text-sm text-muted-foreground">В курортных зонах, управляются как отель. Высокая сезонность, доходность 5-15% в год.</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2">⏰ Таймшер</h4>
            <p className="text-sm text-muted-foreground">Покупка права пользования на определённые недели в году. Редко окупается как инвестиция.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "advantages",
    title: "Преимущества перед другими инвестициями",
    icon: <TrendingUp className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              vs Квартиры
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Выше доходность (6-12% vs 3-6%)</li>
              <li>• Профессиональное управление</li>
              <li>• Меньше головной боли</li>
              <li>• Но: выше налоги, сложнее продать</li>
            </ul>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              vs Вклады
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Потенциально выше доходность</li>
              <li>• Защита от инфляции</li>
              <li>• Рост стоимости актива</li>
              <li>• Но: выше риски, меньше ликвидность</li>
            </ul>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              vs Акции
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Стабильный денежный поток</li>
              <li>• Меньше волатильность</li>
              <li>• Понятная модель дохода</li>
              <li>• Но: меньше ликвидность, входной порог</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            <strong>Важно:</strong> Доходность апартаментов сильно зависит от локации, УК и рыночной ситуации. 
            Обещания 15-20% годовых — скорее маркетинг, чем реальность.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "economics",
    title: "Экономика апартаментов",
    icon: <Calculator className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Формула дохода:</h4>
          <p className="text-lg font-mono">
            <strong>NOI = (ADR × Occupancy × 365) - Расходы</strong>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Доходы:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>ADR</strong> (Average Daily Rate) — средний чек за ночь</li>
              <li>• <strong>Occupancy</strong> — загрузка, % занятых дней</li>
              <li>• Дополнительные услуги (парковка, завтрак)</li>
            </ul>
            
            <h4 className="font-semibold mt-4">Каналы бронирования:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Booking.com, Airbnb (комиссия 10-15%)</li>
              <li>• Прямые брони (сайт отеля, телефон)</li>
              <li>• Корпоративные клиенты</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Расходы:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Комиссия УК (15-25% от валовой выручки)</li>
              <li>• Коммунальные платежи</li>
              <li>• Ремонтный фонд (3-5% от выручки)</li>
              <li>• Комиссии площадок бронирования</li>
              <li>• Налоги (имущество, доходы)</li>
            </ul>
            
            <h4 className="font-semibold mt-4">Сезонность:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Москва: +20-30% летом, -15% зимой</li>
              <li>• Сочи: +50% летом, -40% зимой</li>
              <li>• Санкт-Петербург: белые ночи = пик</li>
            </ul>
          </div>
        </div>
        
        <div className="border-l-4 border-orange-500 pl-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Роль УК критична:</strong> хорошая УК может поднять загрузку на 10-15% 
            за счёт yield management, работы с каналами и сервиса. Плохая — убить проект даже в хорошей локации.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "terminology",
    title: "Терминология",
    icon: <BookOpen className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-3">
              <h5 className="font-semibold">ADR (Average Daily Rate)</h5>
              <p className="text-sm text-muted-foreground">Средний тариф за ночь. Москва: 3,000-8,000₽, регионы: 1,500-4,000₽</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3">
              <h5 className="font-semibold">RevPAR (Revenue Per Available Room)</h5>
              <p className="text-sm text-muted-foreground">ADR × Occupancy. Показывает эффективность номера</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-3">
              <h5 className="font-semibold">NOI (Net Operating Income)</h5>
              <p className="text-sm text-muted-foreground">Чистый операционный доход после всех расходов</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-3">
              <h5 className="font-semibold">Occupancy Rate</h5>
              <p className="text-sm text-muted-foreground">Загрузка в %. Хорошо: 70%+, отлично: 80%+</p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-3">
              <h5 className="font-semibold">ROI (Return On Investment)</h5>
              <p className="text-sm text-muted-foreground">Доходность инвестиций. NOI / Стоимость покупки</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="border-l-4 border-indigo-500 pl-3">
              <h5 className="font-semibold">Cap Rate</h5>
              <p className="text-sm text-muted-foreground">NOI / Рыночная стоимость объекта</p>
            </div>
            
            <div className="border-l-4 border-pink-500 pl-3">
              <h5 className="font-semibold">Payback Period</h5>
              <p className="text-sm text-muted-foreground">Срок окупаемости в годах. Реально: 12-20 лет</p>
            </div>
            
            <div className="border-l-4 border-teal-500 pl-3">
              <h5 className="font-semibold">IRR (Internal Rate of Return)</h5>
              <p className="text-sm text-muted-foreground">Внутренняя норма доходности с учётом роста стоимости</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-3">
              <h5 className="font-semibold">GOP (Gross Operating Profit)</h5>
              <p className="text-sm text-muted-foreground">Валовая операционная прибыль до вычета комиссии УК</p>
            </div>
            
            <div className="border-l-4 border-cyan-500 pl-3">
              <h5 className="font-semibold">УК (Управляющая Компания)</h5>
              <p className="text-sm text-muted-foreground">Оператор, который ведёт весь бизнес-процесс</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <h5 className="font-semibold mb-2">Маркетинговые термины:</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>ГОТ</strong> — Гарантированная доходность. Часто только первые 1-2 года.</li>
            <li>• <strong>Revenue Management</strong> — управление ценами в зависимости от спроса и сезона.</li>
            <li>• <strong>Buyback</strong> — обещание выкупить апартаменты через N лет по фиксированной цене.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "history",
    title: "История апартаментов в России",
    icon: <History className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold">2010-2014: Зарождение</h4>
            <p className="text-sm text-muted-foreground">
              Первые апарт-отели в Москве и СПб. Формат копировали с Европы. 
              Основные игроки: Capital Group, AFI Development. Цены: 120-180 тыс₽/м².
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold">2015-2017: Первые проблемы</h4>
            <p className="text-sm text-muted-foreground">
              Кризис, санкции, падение турпотока. Многие УК обанкротились или ушли. 
              Инвесторы поняли: красивые проспекты ≠ реальные доходы.
            </p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold">2018-2019: Стабилизация</h4>
            <p className="text-sm text-muted-foreground">
              Выживали сильные УК с прозрачной отчётностью. Развитие внутреннего туризма. 
              Появление чётких стандартов и регулирования рынка.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold">2020-2022: Пандемийный бум</h4>
            <p className="text-sm text-muted-foreground">
              COVID → внутренний туризм → рост спроса на апартаменты в курортных зонах. 
              Сочи, Краснодар, Казань стали хитами. Цены выросли на 30-50%.
            </p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h4 className="font-semibold">2023-2024: Коррекция</h4>
            <p className="text-sm text-muted-foreground">
              Перенасыщение рынка, рост ставок ЦБ, снижение покупательской способности. 
              Много объектов с низкой загрузкой. Фокус на качество, а не количество.
            </p>
          </div>
        </div>
        
        <div className="bg-primary/10 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Ключевые уроки:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Рынок цикличен. Периоды роста сменяются спадами</li>
            <li>• УК — ключевой фактор успеха. Без них проект мёртв</li>
            <li>• Обещания доходности 15-20% обычно не оправдываются</li>
            <li>• Локация решает всё: центр Москвы ≠ спальный район</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "risks",
    title: "Риски",
    icon: <AlertTriangle className="h-6 w-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                Юридические риски
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Нельзя прописаться (нежилое помещение)</li>
                <li>• Высокие налоги на имущество</li>
                <li>• НДС при покупке от юрлица</li>
                <li>• Сложности с ипотекой</li>
                <li>• Изменения в законодательстве</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Рыночные риски</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Падение турпотока (кризис, пандемия)</li>
                <li>• Рост конкуренции (новые объекты)</li>
                <li>• Сезонность доходов</li>
                <li>• Изменение потребительских предпочтений</li>
                <li>• Экономическая нестабильность</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
              <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Операционные риски</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Банкротство/уход УК</li>
                <li>• Плохое управление объектом</li>
                <li>• Завышенные расходы УК</li>
                <li>• Непрозрачная отчётность</li>
                <li>• Конфликты с другими собственниками</li>
              </ul>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Риски ликвидности</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Сложно быстро продать</li>
                <li>• Узкий круг покупателей</li>
                <li>• Дисконт при срочной продаже (20-30%)</li>
                <li>• Зависимость от рыночной конъюнктуры</li>
                <li>• Высокие транзакционные издержки</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-red-500">
          <h4 className="font-semibold mb-2">🚩 Красные флаги:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Обещания доходности выше 15% годовых</li>
            <li>• Отсутствие прозрачной отчётности УК</li>
            <li>• Скрытые комиссии и доплаты</li>
            <li>• Новая УК без track record</li>
            <li>• Локация в &laquo;серой зоне&raquo; (промзона, окраина)</li>
            <li>• Давление продавцов &laquo;купи сейчас или потеряешь&raquo;</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "howto",
    title: "Как выбрать апартамент",
    icon: <CheckCircle2 className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Чек-лист для анализа
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">💰 Финансы</h5>
                <ul className="text-sm space-y-1">
                  <li>□ ADR и его динамика по сезонам</li>
                  <li>□ Историческая загрузка (3+ года)</li>
                  <li>□ RevPAR и сравнение с конкурентами</li>
                  <li>□ Полная структура расходов</li>
                  <li>□ NOI после всех затрат</li>
                  <li>□ Реальная окупаемость (не менее 12 лет)</li>
                </ul>
                
                <h5 className="font-medium mb-2 mt-4">🏢 УК и договор</h5>
                <ul className="text-sm space-y-1">
                  <li>□ Опыт работы УК (5+ лет)</li>
                  <li>□ Прозрачная отчётность</li>
                  <li>□ Условия расторжения договора</li>
                  <li>□ Кто несёт риски простоя</li>
                  <li>□ Размер и структура комиссии УК</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">📍 Локация</h5>
                <ul className="text-sm space-y-1">
                  <li>□ Транспортная доступность</li>
                  <li>□ Туристическая привлекательность</li>
                  <li>□ Развитая инфраструктура</li>
                  <li>□ Конкурентное окружение</li>
                  <li>□ Перспективы развития района</li>
                </ul>
                
                <h5 className="font-medium mb-2 mt-4">⚖️ Юридическое</h5>
                <ul className="text-sm space-y-1">
                  <li>□ Разрешение на гостиничную деятельность</li>
                  <li>□ Право собственности без обременений</li>
                  <li>□ НДС и налоговые последствия</li>
                  <li>□ Возможность получения ипотеки</li>
                  <li>□ Условия страхования</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
          <h4 className="font-semibold mb-3 text-center">🎯 Нужна помощь с выбором?</h4>
          <p className="text-center text-muted-foreground mb-4">
            Проанализируем конкретные объекты по всем параметрам и дадим честное заключение
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a href="/calculator" className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Калькулятор доходности
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/services" className="flex items-center gap-2">
                Консультация эксперта
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    ),
  },
];

export default function EncyclopediaPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Энциклопедия апартаментов
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Всё об инвестициях в апартаменты: от терминологии до рисков. Только факты, без маркетинговых обещаний.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Encyclopedia Sections */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {sections.map((section, idx) => (
              <AnimatedCard key={section.id} delay={0.05 + idx * 0.03}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {section.icon}
                        </div>
                        <h3 className="text-xl font-bold">{section.title}</h3>
                      </div>
                      <div className="text-muted-foreground">
                        {expandedSections.has(section.id) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </button>
                    
                    {expandedSections.has(section.id) && (
                      <div className="px-6 pb-6 border-t border-border">
                        <div className="pt-4">
                          {section.content}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы инвестировать в апартаменты?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Используйте наш калькулятор для оценки доходности или получите персональную консультацию
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/calculator" className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Калькулятор доходности
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/services" className="flex items-center gap-2">
                  Консультация эксперта
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}