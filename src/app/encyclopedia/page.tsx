/* eslint-disable react/no-unescaped-entities */
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
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Апартаменты</strong> — это нежилые коммерческие помещения, которые по планировке и обстановке максимально приближены к жилым квартирам, но имеют принципиально иной правовой статус. Они создавались как компромиссное решение между гостиничными номерами и жилой недвижимостью для инвестиционных целей.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            Главная особенность апартаментов — возможность легального коммерческого использования без смены назначения помещения. Это делает их привлекательными для инвесторов, желающих получать доход от краткосрочной аренды, не нарушая законодательство о жилищном фонде.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            В отличие от самовольного перевода квартир в коммерческий найм, апартаменты изначально проектируются и строятся как коммерческие объекты с соответствующими техническими характеристиками, системами безопасности и возможностями для ведения гостиничного бизнеса.
          </p>
        </div>
        
        <div className="bg-primary/10 p-6 rounded-lg space-y-4">
          <h4 className="font-semibold mb-3">Юридические нюансы и отличия от квартир:</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Правовой статус</p>
                  <p className="text-sm text-muted-foreground">Нежилое помещение по документам. Невозможно зарегистрировать постоянную прописку или временную регистрацию для проживания.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Налогообложение НДС</p>
                  <p className="text-sm text-muted-foreground">При покупке от застройщика-юрлица НДС 20% включается в стоимость. При перепродаже между физлицами НДС не применяется.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Налог на имущество</p>
                  <p className="text-sm text-muted-foreground">Рассчитывается как для коммерческой недвижимости по кадастровой стоимости. Ставка 0.5-2.2% вместо 0.1-0.3% для жилья.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Ипотечное кредитование</p>
                  <p className="text-sm text-muted-foreground">Требуются специальные программы коммерческого кредитования. Ставки выше на 2-4% по сравнению с жилой ипотекой, первоначальный взнос от 30-50%.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Коммунальные услуги</p>
                  <p className="text-sm text-muted-foreground">Тарифы для нежилых помещений обычно выше на 10-30%. Отсутствуют льготы и субсидии, доступные для жилья.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Страхование</p>
                  <p className="text-sm text-muted-foreground">Программы страхования как для коммерческой недвижимости с повышенными коэффициентами риска и стоимостью полисов.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Налогообложение доходов
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Доходы от сдачи апартаментов облагаются подоходным налогом как предпринимательская деятельность:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Без регистрации ИП:</strong> 13% (резиденты) или 30% (нерезиденты) с полной суммы дохода</li>
            <li>• <strong>ИП на УСН:</strong> 6% с доходов или 15% с прибыли (доходы минус расходы)</li>
            <li>• <strong>ИП на патенте:</strong> фиксированная стоимость патента в зависимости от региона</li>
            <li>• <strong>Самозанятость:</strong> 4% с физлиц, 6% с юрлиц (доступна не во всех регионах для краткосрочной аренды)</li>
          </ul>
        </div>
        
        <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-r-lg">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Практический вывод:</strong> Апартаменты — это легальный способ ведения гостиничного бизнеса в формате владения недвижимостью, но с повышенными налоговыми и операционными издержками по сравнению с обычным жильем. Инвестор получает больше свободы в коммерческом использовании, но несет дополнительные расходы и ограничения.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "types",
    title: "Виды апартаментов",
    icon: <Hotel className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          Рынок апартаментов предлагает различные форматы, каждый из которых имеет свою специфику управления, целевую аудиторию и финансовые показатели. Выбор типа апартаментов определяет не только потенциальную доходность, но и уровень участия инвестора в процессе управления.
        </p>

        <div className="grid gap-6">
          <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Апарт-отели
            </h4>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Полноценные гостиничные комплексы с профессиональным управлением, круглосуточной службой приема, консьерж-сервисом, ежедневной уборкой и дополнительными услугами. Инвестор покупает номер, а управляющая компания ведет весь операционный процесс.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Преимущества</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Стабильная загрузка 70-85%</li>
                  <li>• Профессиональный маркетинг</li>
                  <li>• Высокие ADR за счет сервиса</li>
                  <li>• Узнаваемый бренд</li>
                  <li>• Минимум участия инвестора</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Недостатки</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Высокие операционные расходы</li>
                  <li>• Комиссия УК 20-30%</li>
                  <li>• Зависимость от репутации отеля</li>
                  <li>• Сложно сменить УК</li>
                  <li>• Высокая стоимость входа</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Кому подходит</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Пассивным инвесторам</li>
                  <li>• Владельцам крупного капитала</li>
                  <li>• Тем, кто хочет стабильность</li>
                  <li>• Инвесторам из других городов</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-3 rounded border">
              <p className="text-sm"><strong>Примеры:</strong> Radisson Collection Paradise Resort & Spa в Сочи, Hampton by Hilton в Москве, Apart Hotel Линкор в Санкт-Петербурге. Доходность: 7-12% годовых, стоимость: от 8-15 млн рублей.</p>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-green-50/50 to-green-100/30 dark:from-green-900/10 dark:to-green-800/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <HomeIcon className="h-5 w-5 text-green-600" />
              Сервисные апартаменты
            </h4>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Жилые комплексы с элементами гостиничного сервиса: консьерж, клининг по запросу, иногда бизнес-центр и конференц-залы. Больше автономности для гостей, меньше сервиса, чем в апарт-отелях. Популярны для командировок и длительных поездок.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Преимущества</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Меньше операционных расходов</li>
                  <li>• Больше контроля над объектом</li>
                  <li>• Подходят для долгосрочной аренды</li>
                  <li>• Проще смена УК</li>
                  <li>• Ниже комиссия управления</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Недостатки</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Нестабильная загрузка</li>
                  <li>• Больше участия в управлении</li>
                  <li>• Слабее маркетинг</li>
                  <li>• Зависимость от локации</li>
                  <li>• Конкуренция с квартирами</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Кому подходит</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Активным инвесторам</li>
                  <li>• Тем, кто знает рынок</li>
                  <li>• Владельцам небольшого капитала</li>
                  <li>• Местным инвесторам</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-3 rounded border">
              <p className="text-sm"><strong>Примеры:</strong> апартаменты в ЖК "Садовые кварталы", "Москва-Сити", резиденции в центре Санкт-Петербурга. Доходность: 5-10% годовых, стоимость: от 4-8 млн рублей.</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-purple-50/50 to-purple-100/30 dark:from-purple-900/10 dark:to-purple-800/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Лофты и дизайнерские апартаменты
            </h4>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Эксклюзивные помещения с уникальной архитектурой: высокие потолки, большие окна, открытые планировки, индустриальные элементы. Часто располагаются в исторических зданиях или районах с богатой культурной жизнью. Целевая аудитория — состоятельные туристы и творческие люди.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Преимущества</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Высокие ADR (premium сегмент)</li>
                  <li>• Уникальность привлекает гостей</li>
                  <li>• Рост стоимости в центре города</li>
                  <li>• Популярность в соцсетях</li>
                  <li>• Возможность личного использования</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Недостатки</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Низкая загрузка (50-70%)</li>
                  <li>• Высокие расходы на поддержание</li>
                  <li>• Узкая целевая аудитория</li>
                  <li>• Сложности с отоплением/охлаждением</li>
                  <li>• Проблемы с шумоизоляцией</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Кому подходит</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Любителям эксклюзива</li>
                  <li>• Инвесторам в премиум-сегменте</li>
                  <li>• Тем, кто планирует личное использование</li>
                  <li>• Опытным игрокам рынка</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-3 rounded border">
              <p className="text-sm"><strong>Примеры:</strong> лофты в Красном Октябре (Москва), исторический центр СПб, промзоны Казани. Доходность: 4-8% годовых, но высокий потенциал роста стоимости. Стоимость: от 6-20 млн рублей.</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-orange-50/50 to-orange-100/30 dark:from-orange-900/10 dark:to-orange-800/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Кондо-отели и курортная недвижимость
            </h4>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Гостиничные комплексы в курортных зонах с правом собственности на номер. Управляются как отель, но владелец получает доход от эксплуатации и может сам использовать апартаменты определенное количество дней в году. Характерна высокая сезонность и зависимость от туристических потоков.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Преимущества</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Высокие ADR в сезон</li>
                  <li>• Развитая инфраструктура</li>
                  <li>• Личный отдых в собственности</li>
                  <li>• Рост стоимости у моря/гор</li>
                  <li>• Валютное хеджирование</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Недостатки</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Крайняя сезонность доходов</li>
                  <li>• Зависимость от погоды, политики</li>
                  <li>• Высокие управленческие расходы</li>
                  <li>• Сложности с перепродажей</li>
                  <li>• Валютные риски (заграница)</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Кому подходит</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Любителям курортного отдыха</li>
                  <li>• Диверсификации портфеля</li>
                  <li>• Долгосрочным инвесторам</li>
                  <li>• Толерантным к волатильности</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-3 rounded border">
              <p className="text-sm"><strong>Примеры:</strong> Сочи (Роза Хутор, Красная Поляна), Анапа, зарубежные курорты (Болгария, Турция, ОАЭ). Доходность: 3-15% годовых с высокой волатильностью. Стоимость: от 3-10 млн рублей.</p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-red-50/50 to-red-100/30 dark:from-red-900/10 dark:to-red-800/5">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Таймшер и фрагментированная собственность
            </h4>
            
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Покупка права пользования апартаментами или номером на определенные недели в году. Инвестор не владеет недвижимостью полностью, а имеет долю во времени использования. Популярен в курортных зонах, но как инвестиционный инструмент крайне рискован и малоэффективен.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Условные плюсы</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Низкий входной порог</li>
                  <li>• Гарантированный отдых</li>
                  <li>• Обслуживание включено</li>
                  <li>• Обмен неделями между курортами</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Критичные недостатки</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Практически нулевая ликвидность</li>
                  <li>• Ежегодные взносы растут</li>
                  <li>• Невозможно получать доход</li>
                  <li>• Сложно выйти из программы</li>
                  <li>• Часто мошеннические схемы</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Не подходит</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Инвесторам (вообще никому)</li>
                  <li>• Тем, кто хочет доход</li>
                  <li>• Людям, ценящим ликвидность</li>
                  <li>• Рациональным покупателям</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-100/50 dark:bg-red-900/20 p-3 rounded border border-red-200">
              <p className="text-sm text-red-700 dark:text-red-400"><strong>Внимание:</strong> Таймшер НЕ является инвестицией. Это способ заранее оплатить отпуск с переплатой в 3-5 раз. Избегайте таких предложений при поиске инвестиционной недвижимости.</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Выбор типа апартаментов</strong> должен соответствовать вашему инвестиционному профилю: готовности к активному участию, размеру капитала, толерантности к риску и ожидаемой доходности. Универсального решения не существует — каждый тип имеет свою нишу и особенности эксплуатации.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "advantages",
    title: "Преимущества перед другими инвестициями",
    icon: <TrendingUp className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Апартаменты занимают промежуточное положение между различными классами активов, сочетая элементы недвижимости, бизнеса и финансовых инструментов. Их привлекательность для инвесторов определяется уникальной комбинацией характеристик, недоступной в других форматах инвестирования.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Основное преимущество апартаментов — возможность получения стабильного денежного потока при относительно низком уровне участия в операционной деятельности, что особенно ценно для пассивных инвесторов с ограниченным временем на управление активами.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-green-50/50 to-green-100/30 dark:from-green-900/10 dark:to-green-800/5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <HomeIcon className="h-5 w-5 text-green-600" />
              Сравнение с обычными квартирами
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Доходность (Москва, 2023-2024)</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Апартаменты:</strong> 6-12% годовых (средний ADR 4,500₽, загрузка 70%)</li>
                  <li>• <strong>Квартиры на сутки:</strong> 4-8% годовых (средний ADR 3,200₽, загрузка 65%)</li>
                  <li>• <strong>Долгосрочная аренда квартир:</strong> 3-5% годовых (35-55₽/м² в месяц)</li>
                </ul>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Операционные преимущества</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Управление:</strong> Профессиональная УК vs самостоятельное</li>
                  <li>• <strong>Маркетинг:</strong> Централизованный vs индивидуальный</li>
                  <li>• <strong>Обслуживание:</strong> 24/7 reception vs личное взаимодействие</li>
                  <li>• <strong>Бронирования:</strong> Автоматизированная система vs ручные звонки</li>
                </ul>
              </div>
              
              <div className="bg-red-50/50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Недостатки vs квартир</h5>
                <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                  <li>• Налог на имущество: 0.5-2.2% vs 0.1-0.3%</li>
                  <li>• Комиссия УК: 15-25% vs 0%</li>
                  <li>• Ликвидность: продажа за 6-12 мес vs 3-6 мес</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Banknote className="h-5 w-5 text-blue-600" />
              Сравнение с банковскими вкладами
            </h4>
            
            <div className="space-y-4">
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Финансовые показатели (2024)</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Вклады:</strong> 8-12% годовых, гарантированные</li>
                  <li>• <strong>Апартаменты:</strong> 6-15% годовых + рост стоимости 3-7%</li>
                  <li>• <strong>Инфляция:</strong> 6-8% (данные Росстата)</li>
                  <li>• <strong>Реальная доходность:</strong> Апартаменты +3-10%, вклады 0-4%</li>
                </ul>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Качественные отличия</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Защита от инфляции:</strong> Цены на аренду и недвижимость растут</li>
                  <li>• <strong>Диверсификация:</strong> Другой класс активов</li>
                  <li>• <strong>Использование кредитов:</strong> Кредитное плечо увеличивает ROE</li>
                  <li>• <strong>Налоговая оптимизация:</strong> Возможность зачета расходов</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50/50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Дополнительные риски</h5>
                <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                  <li>• Нет страхования вкладов</li>
                  <li>• Волатильность доходов</li>
                  <li>• Неликвидность (нельзя "забрать" за день)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-900/10 dark:to-purple-800/5">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Сравнение с фондовым рынком
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Доходность и риски (статистика 2020-2024)</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Российские акции (MOEX):</strong> среднегодовая 8%, волатильность 35%</li>
                  <li>• <strong>Дивидендные акции:</strong> дивиденды 4-8%, но нестабильные</li>
                  <li>• <strong>Апартаменты:</strong> среднегодовая 9%, волатильность 15%</li>
                  <li>• <strong>Корреляция с рынком:</strong> Низкая (недвижимость — защитный актив)</li>
                </ul>
              </div>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Качественные преимущества</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Регулярные выплаты:</strong> Ежемесячный доход vs квартальные дивиденды</li>
                  <li>• <strong>Прогнозируемость:</strong> Договоры аренды vs рыночная конъюнктура</li>
                  <li>• <strong>Контроль:</strong> Влияние на управление vs позиция миноритария</li>
                  <li>• <strong>Понимание бизнеса:</strong> Простая модель vs сложность корпораций</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50/50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
                <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Преимущества недвижимости</h5>
                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                  <li>• Стабильный денежный поток</li>
                  <li>• Защита от инфляции</li>
                  <li>• Возможность кредитного плеча</li>
                  <li>• Материальный актив</li>
                  <li>• Меньше эмоциональных решений</li>
                </ul>
              </div>
              
              <div className="bg-red-50/50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
                <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Преимущества акций</h5>
                <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                  <li>• Высокая ликвидность (продажа за секунды)</li>
                  <li>• Низкий входной порог (от 1000₽)</li>
                  <li>• Простота диверсификации</li>
                  <li>• Не требует управления</li>
                  <li>• Потенциал быстрого роста</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-gradient-to-r from-amber-50/50 to-orange-100/30 dark:from-amber-900/10 dark:to-orange-800/5">
          <h4 className="font-semibold mb-4">Комплексное сравнение инвестиционных характеристик</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Характеристика</th>
                  <th className="text-center py-2 px-3">Апартаменты</th>
                  <th className="text-center py-2 px-3">Квартиры</th>
                  <th className="text-center py-2 px-3">Вклады</th>
                  <th className="text-center py-2 px-3">Акции</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Входной порог</td>
                  <td className="text-center py-2 px-3">5-15 млн ₽</td>
                  <td className="text-center py-2 px-3">3-10 млн ₽</td>
                  <td className="text-center py-2 px-3">1,000 ₽</td>
                  <td className="text-center py-2 px-3">1,000 ₽</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Доходность</td>
                  <td className="text-center py-2 px-3 text-green-600">6-12%</td>
                  <td className="text-center py-2 px-3">3-8%</td>
                  <td className="text-center py-2 px-3">8-12%</td>
                  <td className="text-center py-2 px-3">5-15%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Ликвидность</td>
                  <td className="text-center py-2 px-3 text-yellow-600">6-12 мес</td>
                  <td className="text-center py-2 px-3">3-6 мес</td>
                  <td className="text-center py-2 px-3 text-green-600">1 день</td>
                  <td className="text-center py-2 px-3 text-green-600">1 секунда</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Участие в управлении</td>
                  <td className="text-center py-2 px-3 text-green-600">Минимальное</td>
                  <td className="text-center py-2 px-3 text-red-600">Активное</td>
                  <td className="text-center py-2 px-3 text-green-600">Нет</td>
                  <td className="text-center py-2 px-3 text-green-600">Нет</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 font-medium">Волатильность</td>
                  <td className="text-center py-2 px-3 text-green-600">Низкая</td>
                  <td className="text-center py-2 px-3 text-green-600">Низкая</td>
                  <td className="text-center py-2 px-3 text-green-600">Нулевая</td>
                  <td className="text-center py-2 px-3 text-red-600">Высокая</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Защита от инфляции</td>
                  <td className="text-center py-2 px-3 text-green-600">Хорошая</td>
                  <td className="text-center py-2 px-3 text-green-600">Хорошая</td>
                  <td className="text-center py-2 px-3 text-red-600">Плохая</td>
                  <td className="text-center py-2 px-3">Средняя</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Критически важные оговорки
          </h4>
          
          <div className="space-y-3 text-sm text-yellow-700 dark:text-yellow-300">
            <p>
              <strong>Доходность не гарантирована:</strong> Указанные цифры основаны на исторических данных и средних показателях рынка. Реальная доходность может быть как выше, так и существенно ниже в зависимости от множества факторов.
            </p>
            
            <p>
              <strong>Региональные различия:</strong> Показатели для Москвы и Санкт-Петербурга могут в 2-3 раза отличаться от региональных рынков. В небольших городах средняя доходность апартаментов часто не превышает 3-5% годовых.
            </p>
            
            <p>
              <strong>Роль управляющей компании:</strong> До 70% успешности инвестиций зависит от качества УК. Смена УК может как удвоить доходность, так и полностью убить проект.
            </p>
            
            <p>
              <strong>Скрытые расходы:</strong> Реальная доходность всегда ниже валовой на 20-40% за счет налогов, управленческих расходов, ремонтов, периодов простоя и форс-мажоров.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "economics",
    title: "Экономика апартаментов",
    icon: <Calculator className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Экономическая модель апартаментов базируется на принципах гостиничного бизнеса с элементами управления недвижимостью. Понимание всех компонентов доходности критически важно для принятия инвестиционных решений и оценки реальной эффективности вложений.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Ключевое отличие от других форм недвижимости — высокая зависимость от операционного управления. Качество УК может изменить доходность объекта в 2-3 раза при тех же базовых условиях, что делает выбор оператора решающим фактором успеха.
          </p>
        </div>

        <div className="bg-primary/10 p-6 rounded-lg space-y-4">
          <h4 className="font-semibold mb-4">Базовая формула доходности</h4>
          
          <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded font-mono text-center">
            <p className="text-lg font-bold">NOI = (ADR × Occupancy × 365) - OpEx</p>
            <p className="text-sm text-muted-foreground mt-2">где NOI = Net Operating Income (чистый операционный доход)</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded">
              <h5 className="font-medium mb-2">ADR (Average Daily Rate)</h5>
              <p className="text-sm text-muted-foreground">Средневзвешенная стоимость суток проживания с учетом всех тарифов и скидок</p>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded">
              <h5 className="font-medium mb-2">Occupancy Rate</h5>
              <p className="text-sm text-muted-foreground">Процент занятых дней в году. Учитывает техперерывы, простои, сезонность</p>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/30 p-4 rounded">
              <h5 className="font-medium mb-2">OpEx</h5>
              <p className="text-sm text-muted-foreground">Операционные расходы: УК, коммуналка, налоги, ремонт, маркетинг</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Структура доходов</h4>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-medium mb-3">Основная выручка</h5>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex justify-between">
                  <span>• Проживание (номерной фонд)</span>
                  <span className="font-medium">85-92%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Дополнительные услуги</span>
                  <span className="font-medium">3-8%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Парковка, трансферы</span>
                  <span className="font-medium">2-5%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Прочие доходы</span>
                  <span className="font-medium">1-3%</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-medium mb-3">Каналы бронирования и их эффективность</h5>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Booking.com:</strong> 35-45% бронирований, комиссия 12-18%</li>
                <li>• <strong>Airbnb:</strong> 15-25% бронирований, комиссия 14-16%</li>
                <li>• <strong>Яндекс.Путешествия:</strong> 10-20%, комиссия 8-12%</li>
                <li>• <strong>Прямые продажи:</strong> 15-25%, без комиссий</li>
                <li>• <strong>Корпоративные клиенты:</strong> 5-15%, фиксированные ставки</li>
                <li>• <strong>Повторные гости:</strong> 8-15%, самая высокая маржинальность</li>
              </ul>
            </div>

            <div className="bg-green-50/50 dark:bg-green-900/20 p-4 rounded border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Revenue Management</h5>
              <p className="text-sm text-green-600 dark:text-green-400">
                Профессиональные УК используют динамическое ценообразование, анализируя спрос, конкурентов, события в городе. 
                Это может увеличить выручку на 15-25% по сравнению с фиксированными тарифами.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold mb-3">Структура расходов</h4>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-medium mb-3">Операционные расходы (% от валовой выручки)</h5>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex justify-between">
                  <span>• Комиссия УК</span>
                  <span className="font-medium text-red-600">15-25%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Коммунальные услуги</span>
                  <span className="font-medium">8-12%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Комиссии площадок</span>
                  <span className="font-medium">6-10%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Уборка и обслуживание</span>
                  <span className="font-medium">4-8%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Ремонтный фонд</span>
                  <span className="font-medium">3-5%</span>
                </li>
                <li className="flex justify-between">
                  <span>• Страхование</span>
                  <span className="font-medium">1-2%</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-medium mb-3">Налоговая нагрузка</h5>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Налог на прибыль:</strong> 6% (УСН) или 13% (НДФЛ)</li>
                <li>• <strong>НДС:</strong> 0% (при использовании УСН)</li>
                <li>• <strong>Налог на имущество:</strong> 0.5-2.2% от кадастровой стоимости</li>
                <li>• <strong>Земельный налог:</strong> доля в зависимости от площади</li>
              </ul>
            </div>

            <div className="bg-red-50/50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
              <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Скрытые расходы</h5>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                <li>• Мебель и техника: замена каждые 3-5 лет</li>
                <li>• Косметический ремонт: каждые 2-3 года</li>
                <li>• Форс-мажоры: поломки, ущерб от гостей</li>
                <li>• Периоды простоя при смене УК</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold mb-4">Детальный анализ сезонности по регионам</h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-blue-600">Москва</h5>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Пиковые месяцы: Май-Сентябрь</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 5,500-6,500₽ (+25%)</li>
                    <li>• Occupancy: 75-85%</li>
                    <li>• RevPAR: 4,100-5,500₽</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Низкий сезон: Январь-Март</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 3,800-4,200₽ (-20%)</li>
                    <li>• Occupancy: 55-65%</li>
                    <li>• RevPAR: 2,100-2,700₽</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/50 p-2 rounded text-xs text-blue-600">
                  <strong>Драйверы спроса:</strong> бизнес-поездки, конференции, туризм, New Year Shopping
                </div>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-green-600">Сочи</h5>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Пиковый сезон: Июнь-Август</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 8,000-12,000₽ (+60%)</li>
                    <li>• Occupancy: 85-95%</li>
                    <li>• RevPAR: 6,800-11,400₽</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Мертвый сезон: Декабрь-Февраль</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 2,500-3,500₽ (-50%)</li>
                    <li>• Occupancy: 25-40%</li>
                    <li>• RevPAR: 625-1,400₽</li>
                  </ul>
                </div>
                
                <div className="bg-green-50/50 p-2 rounded text-xs text-green-600">
                  <strong>Критично:</strong> 70% годового дохода — за 3 летних месяца. Остальное время — убытки/минимальная прибыль
                </div>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-purple-600">Санкт-Петербург</h5>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Белые ночи: Май-Июль</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 4,500-5,500₽ (+30%)</li>
                    <li>• Occupancy: 80-90%</li>
                    <li>• RevPAR: 3,600-4,950₽</li>
                  </ul>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Межсезонье: Ноябрь-Март</p>
                  <ul className="text-muted-foreground mt-1 space-y-1">
                    <li>• ADR: 2,800-3,500₽ (-25%)</li>
                    <li>• Occupancy: 50-60%</li>
                    <li>• RevPAR: 1,400-2,100₽</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50/50 p-2 rounded text-xs text-purple-600">
                  <strong>Особенность:</strong> Новогодние праздники — второй пик. Много культурных событий круглый год
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50/50 to-red-100/30 dark:from-orange-900/10 dark:to-red-800/5 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Примеры реальных расчетов</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
              <h5 className="font-semibold mb-3">Апартаменты в Москве (40м², 10 млн₽)</h5>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Среднегодовой ADR:</span>
                  <span className="font-medium">4,800₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Среднегодовая загрузка:</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Валовая выручка:</span>
                  <span className="font-medium">1,192,320₽</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>- Комиссия УК (20%):</span>
                  <span>-238,464₽</span>
                </div>
                <div className="flex justify-between">
                  <span>- Коммунальные (10%):</span>
                  <span>-119,232₽</span>
                </div>
                <div className="flex justify-between">
                  <span>- Налоги и прочее (8%):</span>
                  <span>-95,386₽</span>
                </div>
                <div className="flex justify-between border-t pt-1 font-medium text-foreground">
                  <span>Чистый доход (NOI):</span>
                  <span className="text-green-600">739,238₽</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Доходность:</span>
                  <span className="text-green-600">7.4%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
              <h5 className="font-semibold mb-3">Кондо-отель в Сочи (35м², 8 млн₽)</h5>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Среднегодовой ADR:</span>
                  <span className="font-medium">5,200₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Среднегодовая загрузка:</span>
                  <span className="font-medium">55%</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Валовая выручка:</span>
                  <span className="font-medium">1,044,300₽</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>- Комиссия УК (25%):</span>
                  <span>-261,075₽</span>
                </div>
                <div className="flex justify-between">
                  <span>- Коммунальные (12%):</span>
                  <span>-125,316₽</span>
                </div>
                <div className="flex justify-between">
                  <span>- Налоги и прочее (10%):</span>
                  <span>-104,430₽</span>
                </div>
                <div className="flex justify-between border-t pt-1 font-medium text-foreground">
                  <span>Чистый доход (NOI):</span>
                  <span className="text-green-600">553,479₽</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Доходность:</span>
                  <span className="text-green-600">6.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-orange-500 pl-6 bg-orange-50/30 dark:bg-orange-900/10 p-4 rounded-r-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Критическая роль управляющей компании
          </h4>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            Качество УК определяет до 70% финансового результата инвестиций. Разница между профессиональной и некомпетентной УК может составлять 5-8% годовой доходности при прочих равных условиях.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-600 mb-2">Хорошая УК может:</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• Поднять загрузку на 15-20% через yield management</li>
                <li>• Увеличить ADR на 10-15% через позиционирование</li>
                <li>• Снизить операционные расходы на 5-10%</li>
                <li>• Минимизировать ущерб от форс-мажоров</li>
                <li>• Оптимизировать налогообложение</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-red-600 mb-2">Плохая УК приводит к:</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• Загрузке ниже рыночной на 20-30%</li>
                <li>• Завышенным операционным расходам</li>
                <li>• Плохим отзывам и падению рейтинга</li>
                <li>• Потере крупных клиентов</li>
                <li>• Убыткам вместо прибыли</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "terminology",
    title: "Терминология",
    icon: <BookOpen className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Гостиничный бизнес и инвестиции в апартаменты используют специализированную терминологию, понимание которой критично для анализа предложений и принятия решений. Многие термины пришли из международной практики и имеют устоявшиеся англоязычные сокращения.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Особое внимание следует уделять различию между маркетинговыми терминами (часто используемыми для приукрашивания реальности) и техническими показателями, имеющими четкую методологию расчета и применяемыми профессиональными участниками рынка.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Основные финансовые показатели</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">ADR (Average Daily Rate)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Средневзвешенная стоимость размещения за одни сутки. Рассчитывается как общая выручка от номерного фонда, деленная на количество проданных номеро-ночей. Не включает налоги, дополнительные услуги и сборы.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> Общая выручка от проживания ÷ Количество проданных номеро-ночей<br/>
                    <strong>Типичные значения:</strong> Москва 3,500-8,000₽, регионы 1,500-4,500₽
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 bg-green-50/30 dark:bg-green-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">Occupancy Rate (Загрузка)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Процент времени, когда номера заняты гостями. Измеряется в днях или ночах за период. Учитывает только фактически оплаченные размещения, исключая технические перерывы и некоммерческие занятости.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> (Продано номеро-ночей ÷ Доступно номеро-ночей) × 100%<br/>
                    <strong>Хорошие показатели:</strong> 70%+ стабильно, 80%+ отлично
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50/30 dark:bg-purple-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">RevPAR (Revenue Per Available Room)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Ключевой показатель эффективности номерного фонда. Показывает, сколько дохода приносит каждый доступный номер независимо от загрузки. Позволяет сравнивать объекты с разными стратегиями ценообразования.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> ADR × Occupancy или Общая выручка ÷ Общее количество номеров<br/>
                    <strong>Значение:</strong> Главный KPI для сравнения конкурентов
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50/30 dark:bg-orange-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">NOI (Net Operating Income)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Чистый операционный доход после всех операционных расходов, но до учета налогов, амортизации и процентов по кредитам. Базовый показатель для расчета инвестиционной привлекательности объекта недвижимости.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> Валовой доход - Операционные расходы<br/>
                    <strong>Исключает:</strong> Налоги, проценты, амортизацию, капзатраты
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50/30 dark:bg-red-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">ROI (Return on Investment)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Коэффициент возврата инвестиций, показывающий эффективность вложенного капитала. Рассчитывается как отношение годового чистого дохода к полной стоимости инвестиций включая покупку, ремонт, мебелировку.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> (Годовой NOI ÷ Общие инвестиции) × 100%<br/>
                    <strong>Хорошие показатели:</strong> 8%+ с учетом всех рисков
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">Cap Rate (Capitalization Rate)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Ставка капитализации, показывающая доходность объекта недвижимости относительно его текущей рыночной стоимости. Используется для сравнения инвестиционной привлекательности разных объектов и оценки справедливой стоимости.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> NOI ÷ Текущая рыночная стоимость<br/>
                    <strong>Интерпретация:</strong> Выше = больше доходность, но выше риск
                  </div>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4 bg-teal-50/30 dark:bg-teal-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">IRR (Internal Rate of Return)</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Внутренняя норма доходности, учитывающая временную стоимость денег и изменение стоимости актива. Показывает эффективную годовую ставку, которую получает инвестор за весь период владения включая продажу.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Учитывает:</strong> Все денежные потоки + стоимость продажи<br/>
                    <strong>Хорошие показатели:</strong> 12%+ для апартаментов
                  </div>
                </div>
                
                <div className="border-l-4 border-pink-500 pl-4 bg-pink-50/30 dark:bg-pink-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">Payback Period</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Период окупаемости инвестиций в годах. Простой период — время возврата первоначальных инвестиций. Дисконтированный период учитывает временную стоимость денег и более точен для принятия решений.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> Общие инвестиции ÷ Годовой NOI<br/>
                    <strong>Реалистично:</strong> 10-18 лет для качественных объектов
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50/30 dark:bg-yellow-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">EBITDA</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Прибыль до вычета процентов, налогов, износа и амортизации. В контексте апартаментов показывает операционную эффективность управления без учета структуры финансирования и налогового планирования.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Использование:</strong> Оценка эффективности УК<br/>
                    <strong>Margin:</strong> 30-50% от валовой выручки — хороший показатель
                  </div>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4 bg-cyan-50/30 dark:bg-cyan-900/10 p-4 rounded-r-lg">
                  <h5 className="font-semibold">Cash-on-Cash Return</h5>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Доходность на вложенные наличные деньги при использовании кредитного плеча. Показывает эффективность собственных средств инвестора без учета заемного финансирования в знаменателе.
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-gray-800/30 p-2 rounded">
                    <strong>Формула:</strong> Годовой денежный поток ÷ Собственные инвестиции<br/>
                    <strong>Преимущество:</strong> Учитывает эффект кредитного плеча
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Операционная терминология</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">УК (Управляющая Компания)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Профессиональный оператор, осуществляющий полный цикл управления апартаментами: от маркетинга и бронирований до клининга и технического обслуживания. Работает за комиссию 15-30% от валовой выручки.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Функции:</strong> Revenue management, бронирования, клининг, техобслуживание, отчетность
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Revenue Management (Yield Management)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Система динамического управления ценами на основе анализа спроса, конкуренции, событий и исторических данных. Позволяет максимизировать выручку через оптимальное соотношение цены и загрузки.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Эффект:</strong> Увеличение выручки на 15-25% по сравнению с фиксированными тарифами
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">OTA (Online Travel Agency)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Онлайн-платформы бронирования: Booking.com, Airbnb, Expedia, Яндекс.Путешествия. Основные каналы продаж для апартаментов, взимающие комиссию 8-18% за привлечение гостей.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Доля продаж:</strong> 60-80% всех бронирований проходит через OTA
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">PMS (Property Management System)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Программная система управления отелем или апартаментами. Автоматизирует бронирования, check-in/check-out, ценообразование, отчетность. Интегрируется со всеми OTA и платежными системами.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Примеры:</strong> Opera, Mews, Booking.com Connectivity, Cloudbeds
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Channel Manager</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Система синхронизации тарифов и доступности между PMS и различными каналами бронирования. Предотвращает овербукинг и обеспечивает единое управление ценами на всех платформах.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Необходимость:</strong> Обязателен при работе с 3+ каналами бронирования
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Direct Booking (Прямые продажи)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Бронирования, поступающие напрямую к оператору в обход комиссионных платформ: через сайт, телефон, email, повторных гостей. Наиболее маржинальный канал продаж без внешних комиссий.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Цель:</strong> 20-30% всех бронирований для снижения зависимости от OTA
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Walk-in Rate</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Тариф для гостей без предварительного бронирования. Обычно выше обычных тарифов на 15-30%, так как спрос срочный и неэластичный. Характерен для объектов в популярных локациях.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Доля:</strong> 5-15% от общих продаж в зависимости от локации
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">No-show / Late cancellation</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Неявки гостей и поздние отмены бронирований. Влияют на фактическую загрузку и выручку. Профессиональные операторы используют штрафные политики и овербукинг для компенсации потерь.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Типично:</strong> 2-8% всех бронирований в зависимости от сегмента
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">ALOS (Average Length of Stay)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Средняя продолжительность проживания гостей в ночах. Влияет на операционные расходы: более длительные проживания снижают расходы на уборку и смену белья в пересчете на ночь.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Оптимально:</strong> 2-4 ночи для городских апартаментов
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Comp Set (Competitive Set)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Набор конкурирующих объектов, с которыми регулярно сравниваются показатели: ADR, занятость, RevPAR. Основа для принятия решений по ценообразованию и позиционированию на рынке.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Критерии:</strong> Аналогичный сегмент, локация, звездность, концепция
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Маркетинговые и продажные термины</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-yellow-50/50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">ГОТ (Гарантированная доходность)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Маркетинговый инструмент застройщиков: обещание фиксированной доходности на первые 1-3 года. После окончания периода инвестор остается с рыночными показателями, которые могут быть существенно ниже.
                  </p>
                  <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                    <strong>Внимание:</strong> Стоимость ГОТ заложена в цену покупки
                  </div>
                </div>

                <div className="bg-red-50/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">Buyback (Обратный выкуп)</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Обещание застройщика или УК выкупить апартаменты через определенный период по заранее оговоренной цене. Часто используется для привлечения неопытных инвесторов, реально выполняется редко.
                  </p>
                  <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                    <strong>Риск:</strong> Компания может обанкротиться к моменту buyback
                  </div>
                </div>

                <div className="bg-orange-50/50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Франшиза</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Использование бренда известной гостиничной сети (Marriott, Hilton, Radisson) за ежемесячную плату. Дает узнаваемость и стандарты сервиса, но увеличивает операционные расходы на 2-5% от выручки.
                  </p>
                  <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                    <strong>Эффект:</strong> Увеличение ADR на 10-20%, но выше расходы
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50/50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Soft Brand</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Мягкие бренды крупных гостиничных групп (Autograph Collection, Curio, Tapestry). Меньше операционных требований чем у полных франшиз, но сохраняется маркетинговая поддержка и система бронирования.
                  </p>
                  <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                    <strong>Баланс:</strong> Узнаваемость бренда + гибкость управления
                  </div>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Management Contract</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Договор управления, при котором профессиональная УК берет полную ответственность за операционную деятельность за фиксированную плату и процент от прибыли. Инвестор остается собственником, но не участвует в управлении.
                  </p>
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Типично:</strong> 3-5% фиксированная плата + 10-15% от GOP
                  </div>
                </div>

                <div className="bg-green-50/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Performance Fee</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Премия за результат, выплачиваемая УК при превышении плановых показателей доходности или загрузки. Мотивирует управляющую компанию на максимизацию результатов владельца недвижимости.
                  </p>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Структура:</strong> 20-30% от превышения плановых показателей
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
            <h4 className="font-semibold mb-3">Как использовать терминологию</h4>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-green-600 mb-2">При анализе предложений, всегда уточняйте:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Методику расчета заявленного ROI или IRR</li>
                  <li>• Структуру операционных расходов</li>
                  <li>• Исторические данные по ADR и Occupancy</li>
                  <li>• Условия и гарантии выполнения ГОТ</li>
                  <li>• Компетенции и track record УК</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-600 mb-2">Красные флаги в терминологии:</h5>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Обещания "гарантированной доходности" выше 15%</li>
                  <li>• Сложные схемы с множеством посредников</li>
                  <li>• Отсутствие прозрачной отчетности по KPI</li>
                  <li>• Использование только маркетинговых терминов</li>
                  <li>• Нежелание предоставить исторические данные</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "history",
    title: "История апартаментов в России",
    icon: <History className="h-6 w-6" />,
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Развитие рынка апартаментов в России прошло несколько ярко выраженных циклов, отражающих общую экономическую ситуацию, изменения в законодательстве и эволюцию потребительских предпочтений. История этого сегмента наглядно демонстрирует важность макроэкономических факторов для инвестиционной недвижимости.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Российский рынок апартаментов во многом копировал зарубежные модели, но адаптировался к местным особенностям регулирования, налогообложения и потребительского поведения, что создало уникальную экосистему со своими преимуществами и рисками.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6 bg-blue-50/30 dark:bg-blue-900/10 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-3">2010-2014: Зарождение рынка</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Первые апарт-отели появились как попытка российских девелоперов адаптировать успешные европейские модели под местные условия. Инициаторами выступили крупные застройщики, искавшие новые форматы монетизации коммерческой недвижимости в условиях насыщающегося офисного рынка.
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Ключевые события:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>2011:</strong> Открытие первого Adagio Moscow Kievskaya (Capital Group) — копия французской модели</li>
                  <li>• <strong>2012:</strong> AFI Development запускает проект Marriott Courtyard Moscow в Павелецкой</li>
                  <li>• <strong>2013:</strong> Группа «ПИК» анонсирует масштабную программу развития апарт-отелей</li>
                  <li>• <strong>2014:</strong> В Санкт-Петербурге открывается Hampton by Hilton на Московском проспекте</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Факторы роста</h5>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• Высокие цены на недвижимость в центре</li>
                    <li>• Растущий деловой туризм</li>
                    <li>• Недостаток качественных отелей</li>
                    <li>• Доступное финансирование девелоперов</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                  <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Рыночные условия</h5>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Стоимость: 120,000-180,000₽/м²</li>
                    <li>• Обещанная доходность: 12-15%</li>
                    <li>• ADR Москва: 4,000-6,000₽</li>
                    <li>• Целевая загрузка: 75-80%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-red-500 pl-6 bg-red-50/30 dark:bg-red-900/10 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-3">2015-2017: Кризис и проверка на прочность</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Экономический кризис, вызванный падением цен на нефть и введением санкций, стал серьезным испытанием для молодого рынка апартаментов. Многие проекты столкнулись с резким падением спроса, что обнажило недостатки бизнес-моделей и некомпетентность ряда управляющих компаний.
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Критические моменты:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Январь 2015:</strong> Резкое падение рубля — турпоток снизился на 40%</li>
                  <li>• <strong>2015-2016:</strong> Банкротство нескольких небольших УК в регионах</li>
                  <li>• <strong>2016:</strong> Скандал с апарт-отелем "Арбат" — инвесторы потеряли до 60% вложений</li>
                  <li>• <strong>2017:</strong> Судебные разбирательства с ГК "Гранель" по невыполнению обязательств</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50/50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                  <h5 className="font-medium text-red-700 dark:text-red-400 mb-1">Основные проблемы</h5>
                  <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
                    <li>• Завышенные прогнозы доходности</li>
                    <li>• Отсутствие резервов на кризис</li>
                    <li>• Неопытность управляющих команд</li>
                    <li>• Зависимость от иностранных туристов</li>
                    <li>• Слабые договоры с инвесторами</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50/50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                  <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-1">Реальные показатели</h5>
                  <ul className="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
                    <li>• Фактическая доходность: 2-6% (вместо 12-15%)</li>
                    <li>• Загрузка: 45-60% (вместо 75-80%)</li>
                    <li>• ADR снизился на 25-40%</li>
                    <li>• Рост операционных расходов</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-green-500 pl-6 bg-green-50/30 dark:bg-green-900/10 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-3">2018-2019: Стабилизация и профессионализация</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Период восстановления и создания устойчивых бизнес-моделей. Выжившие игроки сосредоточились на повышении качества управления, развитии внутреннего туризма и создании прозрачных систем отчетности. Началось формирование отраслевых стандартов и саморегулирования.
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Важные изменения:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>2018:</strong> Создание Ассоциации операторов апарт-отелей России</li>
                  <li>• <strong>2018:</strong> Radisson открывает первый Paradise Resort в Сочи с прозрачной отчетностью</li>
                  <li>• <strong>2019:</strong> Внедрение стандартов финансовой отчетности по РСБУ</li>
                  <li>• <strong>2019:</strong> Появление первых независимых рейтингов УК</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Достижения периода</h5>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• Рост внутреннего туризма на 15-20%</li>
                    <li>• Стандартизация договоров с инвесторами</li>
                    <li>• Развитие региональных рынков</li>
                    <li>• Появление специализированных УК</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                  <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Ключевые проекты</h5>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Azimut Hotel Freestyle Rosa Khutor</li>
                    <li>• Apart Hotel Линкор (СПб)</li>
                    <li>• Golden Tulip Rosa Khutor</li>
                    <li>• Расширение сети Hampton by Hilton</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-6 bg-purple-50/30 dark:bg-purple-900/10 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-3">2020-2022: Пандемийный парадокс</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                COVID-19 парадоксальным образом стал катализатором роста для российского рынка апартаментов. Закрытие границ перенаправило туристические потоки на внутренние направления, что привело к буму спроса на качественное размещение в курортных зонах и крупных городах России.
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Переломные моменты:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Март 2020:</strong> Первые локдауны — падение загрузки до 10-20%</li>
                  <li>• <strong>Лето 2020:</strong> Взрывной рост спроса на Черноморском побережье</li>
                  <li>• <strong>2021:</strong> Сочи показал рекордную загрузку 85-90% в сезон</li>
                  <li>• <strong>2022:</strong> Пик инвестиционного интереса — продажи выросли на 60%</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50/50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                  <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-1">Новые тренды</h5>
                  <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                    <li>• Workation — работа из курорта</li>
                    <li>• Длительные аренды (1-3 месяца)</li>
                    <li>• Семейный туризм внутри страны</li>
                    <li>• Инвестиции от IT-сферы</li>
                  </ul>
                </div>
                
                <div className="bg-green-50/50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Рост показателей</h5>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• Цены выросли на 30-50%</li>
                    <li>• ADR Сочи: до 15,000₽ в пик</li>
                    <li>• Новые проекты в Анапе, Геленджике</li>
                    <li>• Доходность: 10-18% в курортах</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50/50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                  <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-1">Региональное развитие</h5>
                  <ul className="text-xs text-yellow-600 dark:text-yellow-400 space-y-1">
                    <li>• Казань — рост деловых поездок</li>
                    <li>• Екатеринбург — промышленный туризм</li>
                    <li>• Красная Поляна — зимний спорт</li>
                    <li>• Крым — альтернатива зарубежью</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-orange-500 pl-6 bg-orange-50/30 dark:bg-orange-900/10 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-3">2023-2024: Коррекция и новая реальность</h4>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Период охлаждения после пандемийного бума. Рынок столкнулся с перенасыщением предложения в ряде курортных зон, ростом процентных ставок и снижением реальных доходов населения. Фокус сместился с количества на качество управления и уникальность предложения.
              </p>
              
              <div className="bg-white/60 dark:bg-gray-800/30 p-4 rounded">
                <h5 className="font-medium mb-2">Текущие вызовы:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>2023:</strong> Ключевая ставка ЦБ 16-20% — удорожание ипотеки</li>
                  <li>• <strong>2023:</strong> Перенасыщение Сочи — падение ADR на 15-25%</li>
                  <li>• <strong>2024:</strong> Рост коммунальных тарифов на 10-15%</li>
                  <li>• <strong>2024:</strong> Ужесточение требований к УК со стороны ЦБ</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50/50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                  <h5 className="font-medium text-red-700 dark:text-red-400 mb-1">Негативные факторы</h5>
                  <ul className="text-xs text-red-600 dark:text-red-400 space-y-1">
                    <li>• Избыток предложения в Краснодарском крае</li>
                    <li>• Снижение доходов среднего класса</li>
                    <li>• Рост конкуренции с частным сектором</li>
                    <li>• Ужесточение банковского кредитования</li>
                  </ul>
                </div>
                
                <div className="bg-green-50/50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-1">Адаптация рынка</h5>
                  <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                    <li>• Фокус на уникальные концепции</li>
                    <li>• Развитие корпоративного сегмента</li>
                    <li>• Технологизация управления</li>
                    <li>• Региональная диверсификация</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold mb-4">Знаковые проекты по периодам</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-100/30 dark:from-blue-900/10 dark:to-indigo-800/5 p-4 rounded-lg">
              <h5 className="font-semibold mb-3">Московские пионеры (2011-2014)</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Adagio Moscow Kievskaya</strong><br/>
                  <span className="text-muted-foreground">Первый апарт-отель европейского формата. 128 номеров, франшиза Adagio.</span>
                </li>
                <li>
                  <strong>Marriott Courtyard Moscow</strong><br/>
                  <span className="text-muted-foreground">Позиционирование в бизнес-сегменте, полный гостиничный сервис.</span>
                </li>
                <li>
                  <strong>Residence Inn Moscow</strong><br/>
                  <span className="text-muted-foreground">Концепция "домашнего офиса", кухни в номерах.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50/50 to-emerald-100/30 dark:from-green-900/10 dark:to-emerald-800/5 p-4 rounded-lg">
              <h5 className="font-semibold mb-3">Курортные хиты (2018-2022)</h5>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Radisson Collection Paradise Resort</strong><br/>
                  <span className="text-muted-foreground">Сочи, эталон управления и сервиса, стабильная доходность 8-12%.</span>
                </li>
                <li>
                  <strong>Golden Tulip Rosa Khutor</strong><br/>
                  <span className="text-muted-foreground">Горнолыжный курорт, сезонность 200%, продажи по 300-500 тыс₽/м².</span>
                </li>
                <li>
                  <strong>Hampton by Hilton Volgograd</strong><br/>
                  <span className="text-muted-foreground">Успешное региональное развитие, ЧМ-2018 как катализатор.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
          <h4 className="font-semibold mb-4">Ключевые уроки истории</h4>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-green-600 mb-2">Что работает долгосрочно:</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• Прозрачность операционной и финансовой отчетности</li>
                <li>• Консервативное планирование доходности (реальные 6-10%)</li>
                <li>• Профессиональные УК с опытом более 5 лет</li>
                <li>• Диверсификация по сегментам и географии</li>
                <li>• Адаптивность к изменениям рынка</li>
                <li>• Сильные локации с устойчивым спросом</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-red-600 mb-2">Повторяющиеся ошибки:</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• Завышенные прогнозы доходности в маркетинге</li>
                <li>• Недооценка операционных расходов и рисков</li>
                <li>• Зависимость от одного канала спроса</li>
                <li>• Игнорирование макроэкономических циклов</li>
                <li>• Слабые юридические конструкции для инвесторов</li>
                <li>• Экспансия без накопленной экспертизы</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50/50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              <strong>Главный урок:</strong> Российский рынок апартаментов крайне цикличен и зависит от внешних факторов. 
              Успешные инвестиции требуют горизонта планирования 10+ лет, диверсификации рисков и работы только с проверенными операторами с длительным track record.
            </p>
          </div>
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
          <h4 className="font-semibold mb-2">Красные флаги:</h4>
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
                <h5 className="font-medium mb-2">Финансы</h5>
                <ul className="text-sm space-y-1">
                  <li>□ ADR и его динамика по сезонам</li>
                  <li>□ Историческая загрузка (3+ года)</li>
                  <li>□ RevPAR и сравнение с конкурентами</li>
                  <li>□ Полная структура расходов</li>
                  <li>□ NOI после всех затрат</li>
                  <li>□ Реальная окупаемость (не менее 12 лет)</li>
                </ul>
                
                <h5 className="font-medium mb-2 mt-4">УК и договор</h5>
                <ul className="text-sm space-y-1">
                  <li>□ Опыт работы УК (5+ лет)</li>
                  <li>□ Прозрачная отчётность</li>
                  <li>□ Условия расторжения договора</li>
                  <li>□ Кто несёт риски простоя</li>
                  <li>□ Размер и структура комиссии УК</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Локация</h5>
                <ul className="text-sm space-y-1">
                  <li>□ Транспортная доступность</li>
                  <li>□ Туристическая привлекательность</li>
                  <li>□ Развитая инфраструктура</li>
                  <li>□ Конкурентное окружение</li>
                  <li>□ Перспективы развития района</li>
                </ul>
                
                <h5 className="font-medium mb-2 mt-4">Юридическое</h5>
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
          <h4 className="font-semibold mb-3 text-center">Нужна помощь с выбором?</h4>
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