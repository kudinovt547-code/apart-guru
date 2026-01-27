import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Apart Guru — ваш персональный гид в мире апарт-отелей
          </h1>
          <p className="text-xl text-muted-foreground">
            Инвестируйте с уверенностью. Выбирайте с умом.
          </p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              Apart Guru — это первый в России специализированный аналитический сервис для частных и
              профессиональных инвесторов, рассматривающих апарт-отели как источник стабильного пассивного
              дохода. Мы объединяем данные, технологии и экспертизу, чтобы превратить сложный и непрозрачный
              рынок в понятную, предсказуемую и выгодную инвестиционную среду.
            </p>
          </CardContent>
        </Card>

        {/* What Makes Us Unique */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Что делает Apart Guru уникальным?</h2>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Полная база апарт-отелей страны</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                От Москвы до Сочи, от Санкт-Петербурга до Казани — мы собираем и верифицируем информацию по
                каждому значимому проекту: строящемуся, запущенному и даже закрытому. База постоянно пополняется.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Реальные метрики эффективности</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                ADR (средняя дневная ставка), RevPAR (доход на номер), загрузка, чистая доходность, рейтинги
                на Yandex и Ostrovok — всё в одном месте.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Прогнозная аналитика для строящихся проектов</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                Наши модели учитывают:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Локацию и транспортную доступность</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Звёздность и концепцию отеля</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Репутацию и опыт управляющей компании</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Конкурентную среду и сезонность</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-3">
                — и дают обоснованный прогноз доходности ещё до старта продаж.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Данные от самих инвесторов</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Мы не полагаемся только на маркетинговые презентации застройщиков. Реальные цифры приходят от
                владельцев апартаментов — тех, кто уже получает доход или сталкивается с трудностями.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>Прозрачные отзывы гостей</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Агрегированные и структурированные отзывы позволяют оценить качество управления, сервис и
                соответствие заявленной концепции реальности.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Target Audience */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Для кого создан Apart Guru?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Частные инвесторы, ищущие надёжные объекты недвижимости с пассивным доходом
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Финансовые консультанты, подбирающие решения для клиентов
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Управляющие компании, стремящиеся повысить доверие и прозрачность
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                Застройщики, желающие продемонстрировать обоснованную доходность своих проектов
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="border-primary">
          <CardContent className="pt-6">
            <h3 className="text-2xl font-semibold mb-4">Наша миссия</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Сделать рынок апарт-отелей открытым, предсказуемым и справедливым. Помочь инвесторам принимать
              решения, основанные не на обещаниях, а на данных. И тем самым — повысить качество всей экосистемы.
            </p>
          </CardContent>
        </Card>

        {/* Final Statement */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">
            Apart Guru — инвестируйте в апарт-отели, как профессионал
          </h2>
          <p className="text-lg text-muted-foreground">
            Где каждый номер — не просто квадратный метр, а источник дохода, проверенный временем и данными.
          </p>
        </div>
      </div>
    </div>
  );
}
