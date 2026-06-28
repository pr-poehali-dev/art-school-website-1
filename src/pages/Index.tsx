import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const WORK_1 = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/61b712c9-0e5f-4952-a06b-8917102649c7.jpg';
const WORK_2 = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/108c9479-de56-41db-9d4e-6180cec847eb.jpg';
const WORK_3 = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/947d7efd-b9d9-44c4-82d2-c33821a12448.jpg';
const PENCIL = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/f7a48a5c-d59a-47b0-a3ba-2cd3f882e707.jpg';
const WATERCOLOR = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/3aa5dc7d-e367-43ad-8eb2-43776a08e4d8.jpg';
const GOUACHE = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/81010ba2-59aa-4ea6-b6f8-ffc8ab19768a.jpg';
const OPEN_DAY = 'https://cdn.poehali.dev/projects/03ce724a-2ba4-4d98-bd85-35dc4dede31b/files/a1c697ea-b4ae-4925-ab22-0bd3c08728f0.jpg';

const courses = [
  { icon: 'PencilLine', title: 'Рисунок', color: 'bg-primary', desc: 'Учимся видеть форму, объём и свет. Карандаш, уголь, основы перспективы и построения.', img: PENCIL },
  { icon: 'Palette', title: 'Живопись', color: 'bg-secondary', desc: 'Масло и акрил, работа с цветом и настроением. От первого мазка до законченной картины.', img: WATERCOLOR },
  { icon: 'Apple', title: 'Натюрморт', color: 'bg-accent', desc: 'Композиция, фактуры и цветовые отношения. Любимый жанр для развития насмотренности.', img: WORK_2 },
  { icon: 'Shapes', title: 'Скульптура', color: 'bg-primary', desc: 'Лепка из глины, объём руками. Чувство пропорций и пластики формы в трёх измерениях.', img: WORK_3 },
  { icon: 'LayoutTemplate', title: 'Композиция', color: 'bg-secondary', desc: 'Гуашь, коллаж и смешанные техники. Учимся строить сюжет, ритм и баланс на листе.', img: GOUACHE },
];

const gallery = [WORK_1, WORK_2, WORK_3, WORK_2, WORK_1, WORK_3];

const teachers = [
  { name: 'Анна Морозова', role: 'Рисунок и академический портрет', emoji: '🎨', exp: '12 лет преподавания' },
  { name: 'Дмитрий Лебедев', role: 'Живопись маслом', emoji: '🖌️', exp: 'Член Союза художников' },
  { name: 'Мария Светлова', role: 'Скульптура и керамика', emoji: '🏺', exp: 'Выпускница Строгановки' },
];

const schedule = [
  { day: 'Понедельник', time: '19:00', course: 'Рисунок · группа для начинающих' },
  { day: 'Вторник', time: '19:00', course: 'Живопись маслом' },
  { day: 'Четверг', time: '18:30', course: 'Натюрморт · средний уровень' },
  { day: 'Суббота', time: '12:00', course: 'Скульптура · лепка из глины' },
  { day: 'Воскресенье', time: '11:00', course: 'Свободная мастерская' },
];

const events = [
  { tag: 'Кафе', emoji: '☕', title: 'Встречи учеников в кафе', desc: 'Раз в месяц собираемся обсудить любимых художников и просто пообщаться.' },
  { tag: 'Праздник', emoji: '🎄', title: 'Новогодний корпоратив', desc: 'Тёплый вечер с глинтвейном, подарками и творческими конкурсами.' },
];

const navLinks = [
  { id: 'courses', label: 'Курсы' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'teachers', label: 'Преподаватели' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'events', label: 'События' },
  { id: 'contacts', label: 'Контакты' },
];

type Msg = { role: 'bot' | 'user'; text: string };

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', text: 'Привет! Я Кисточка — помощник школы «Палитра» 🎨 Расскажу про занятия и помогу выбрать курс. Что вам ближе?' },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const botReply = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes('рисун')) return 'Рисунок — отличное начало! Учимся строить форму, чувствовать свет и тень. Занятия по понедельникам в 19:00. Записать вас на пробное?';
    if (t.includes('живопис') || t.includes('масл') || t.includes('краск')) return 'Живопись маслом — это про цвет и эмоции. Подойдёт даже без опыта, всё покажем с нуля. Вторник, 19:00. Хотите расписание на почту?';
    if (t.includes('скульпт') || t.includes('глин') || t.includes('лепк')) return 'Скульптура — лепим из глины руками, очень медитативно! Суббота, 12:00. Можно прийти на день открытых дверей 1 июля и попробовать бесплатно.';
    if (t.includes('натюрморт')) return 'Натюрморт развивает насмотренность и чувство композиции. Идеален для тех, кто любит детали. Четверг, 18:30.';
    if (t.includes('начин') || t.includes('нуля') || t.includes('опыт')) return 'Для начинающих идеален курс «Рисунок» — там всё с самых основ, без страшных терминов. А ещё приходите 1 июля на день открытых дверей!';
    if (t.includes('цен') || t.includes('стои') || t.includes('сколько')) return 'Стоимость зависит от курса и абонемента. Оставьте заявку через кнопку «Записаться» — менеджер подберёт удобный вариант 🙌';
    if (t.includes('1 июля') || t.includes('открыт')) return '1 июля у нас день открытых дверей! Бесплатные мастер-классы, экскурсия по студии и чай с печеньем. Приходите всей семьёй ✨';
    return 'Интересный вопрос! У нас 4 направления: рисунок, живопись, натюрморт и скульптура. Что хотелось бы попробовать в первую очередь?';
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setTimeout(() => setMessages((m) => [...m, { role: 'bot', text: botReply(text) }]), 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 font-display font-extrabold text-xl">
            <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center">П</span>
            Палитра
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contacts')} className="rounded-full font-semibold">Записаться</Button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative pt-32 pb-24 container">
        <div className="absolute -z-10 top-20 -right-20 w-[28rem] h-[28rem] bg-accent/40 animate-blob" />
        <div className="absolute -z-10 bottom-0 -left-24 w-80 h-80 bg-secondary/30 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-float-up">
            <span className="font-hand text-2xl text-secondary">для взрослых · с любого уровня</span>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05] mt-2">
              Научитесь <span className="text-primary">рисовать</span> в радость
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Школа «Палитра» — уютное пространство, где взрослые открывают в себе художника. Рисунок, живопись, натюрморт и скульптура.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('contacts')} size="lg" className="rounded-full font-semibold text-base h-12 px-7">
                Записаться на занятие
              </Button>
              <Button onClick={() => setChatOpen(true)} variant="outline" size="lg" className="rounded-full font-semibold text-base h-12 px-7 border-2">
                <Icon name="Sparkles" className="mr-1" size={18} /> Спросить ассистента
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div><div className="font-display font-extrabold text-3xl text-primary">500+</div><div className="text-sm text-muted-foreground">учеников</div></div>
              <div><div className="font-display font-extrabold text-3xl text-secondary">4</div><div className="text-sm text-muted-foreground">направления</div></div>
              <div><div className="font-display font-extrabold text-3xl text-accent-foreground">8</div><div className="text-sm text-muted-foreground">лет студии</div></div>
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: '0.15s' }}>
            <img src={WORK_2} alt="Работа ученика" className="rounded-[2rem] w-full aspect-square object-cover shadow-2xl" />
            <img src={WORK_1} alt="Работа ученика" className="absolute -bottom-8 -left-8 w-40 h-40 object-cover rounded-2xl border-4 border-background shadow-xl rotate-[-6deg]" />
            <div className="absolute -top-5 -right-3 bg-accent text-accent-foreground font-display font-bold px-5 py-3 rounded-2xl shadow-lg rotate-6">
              🎉 День открытых дверей 1 июля!
            </div>
          </div>
        </div>
      </section>

      {/* OPEN DAY BANNER */}
      <section className="container">
        <div className="rounded-[2rem] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative min-h-[220px]">
          <img src={OPEN_DAY} alt="День открытых дверей" className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" />
          <div className="absolute inset-0 rounded-[2rem] bg-primary/75" />
          <div className="relative">
            <span className="font-hand text-2xl">приходите все желающие</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-1">День открытых дверей · 1 июля</h2>
            <p className="mt-3 max-w-xl opacity-90">Бесплатные мастер-классы по всем направлениям, экскурсия по студии, знакомство с преподавателями и чай с печеньем. Вход свободный!</p>
          </div>
          <Button onClick={() => scrollTo('contacts')} size="lg" variant="secondary" className="relative rounded-full font-semibold h-12 px-7 shrink-0">
            Хочу прийти
          </Button>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="container py-24">
        <SectionTitle eyebrow="наши занятия" title="Четыре направления для творчества" />
        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {courses.map((c) => (
            <div key={c.title} className="group rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-shadow bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl ${c.color} text-white grid place-items-center mb-4`}>
                  <Icon name={c.icon} size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl">{c.title}</h3>
                <p className="mt-2 text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-muted py-24">
        <div className="container">
          <SectionTitle eyebrow="работы учеников" title="Галерея вдохновения" />
          <div className="columns-2 md:columns-3 gap-4 mt-12 [&>img]:mb-4">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={`Работа ученика ${i + 1}`} className="w-full rounded-2xl hover-scale cursor-pointer break-inside-avoid" />
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="container py-24">
        <SectionTitle eyebrow="команда" title="Наши преподаватели" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {teachers.map((t) => (
            <div key={t.name} className="rounded-3xl border border-border p-8 text-center hover:shadow-xl transition-shadow bg-card">
              <div className="w-24 h-24 mx-auto rounded-full bg-accent grid place-items-center text-5xl">{t.emoji}</div>
              <h3 className="font-display font-bold text-xl mt-5">{t.name}</h3>
              <p className="text-primary font-medium mt-1">{t.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="bg-muted py-24">
        <div className="container">
          <SectionTitle eyebrow="расписание" title="Когда мы рисуем" />
          <div className="max-w-3xl mx-auto mt-12 space-y-3">
            {schedule.map((s) => (
              <div key={s.day} className="flex items-center gap-5 bg-card rounded-2xl border border-border p-5 hover:border-primary transition-colors">
                <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary grid place-items-center font-display font-bold text-lg shrink-0">{s.time}</div>
                <div>
                  <div className="font-display font-semibold text-lg">{s.day}</div>
                  <div className="text-muted-foreground">{s.course}</div>
                </div>
                <Button onClick={() => scrollTo('contacts')} variant="ghost" size="sm" className="ml-auto rounded-full font-semibold text-primary shrink-0">Записаться</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="container py-24">
        <SectionTitle eyebrow="жизнь школы" title="Не только рисуем, но и дружим" />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {events.map((e) => (
            <div key={e.title} className="rounded-3xl bg-card border border-border p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 grid place-items-center text-3xl">{e.emoji}</div>
                <span className="font-hand text-2xl text-secondary">{e.tag}</span>
              </div>
              <h3 className="font-display font-bold text-2xl mt-4">{e.title}</h3>
              <p className="mt-2 text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="bg-foreground text-background py-24">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <span className="font-hand text-2xl text-accent">давайте знакомиться</span>
            <h2 className="font-display font-extrabold text-4xl mt-1">Запишитесь на занятие</h2>
            <p className="mt-4 text-background/70 max-w-md">Оставьте заявку — мы перезвоним, ответим на вопросы и подберём удобную группу. Первое пробное занятие со скидкой!</p>
            <div className="mt-8 space-y-4">
              <ContactRow icon="MapPin" text="Москва, ул. Художников, 12, студия 3" />
              <ContactRow icon="Phone" text="+7 (495) 123-45-67" />
              <ContactRow icon="Mail" text="hello@palitra-school.ru" />
              <ContactRow icon="Clock" text="Ежедневно с 10:00 до 21:00" />
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="bg-background text-foreground rounded-3xl p-8 space-y-4">
            <h3 className="font-display font-bold text-2xl">Заявка на занятие</h3>
            <input className="w-full h-12 rounded-xl border border-border px-4 outline-none focus:border-primary" placeholder="Ваше имя" />
            <input className="w-full h-12 rounded-xl border border-border px-4 outline-none focus:border-primary" placeholder="Телефон" />
            <select className="w-full h-12 rounded-xl border border-border px-4 outline-none focus:border-primary text-muted-foreground">
              <option>Выберите направление</option>
              <option>Рисунок</option><option>Живопись</option><option>Натюрморт</option><option>Скульптура</option>
            </select>
            <Button type="submit" size="lg" className="w-full rounded-xl font-semibold h-12">Отправить заявку</Button>
          </form>
        </div>
        <div className="container mt-16 pt-8 border-t border-background/15 text-sm text-background/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 Школа рисования «Палитра»</span>
          <span>Сделано с любовью к искусству 🎨</span>
        </div>
      </section>

      {/* AI CHAT */}
      <button onClick={() => setChatOpen((o) => !o)} className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl grid place-items-center hover:scale-110 transition-transform">
        <Icon name={chatOpen ? 'X' : 'MessageCircle'} size={28} />
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] bg-card rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-float-up">
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 grid place-items-center text-xl">🖌️</div>
            <div>
              <div className="font-display font-bold">Кисточка</div>
              <div className="text-xs opacity-80">ИИ-помощник школы</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${m.role === 'bot' ? 'bg-muted rounded-tl-sm' : 'bg-primary text-primary-foreground ml-auto rounded-tr-sm'}`}>
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-border flex flex-wrap gap-2">
            {['Я новичок', 'Про живопись', 'Цены'].map((q) => (
              <button key={q} onClick={() => send(q)} className="text-xs bg-muted hover:bg-accent px-3 py-1.5 rounded-full transition-colors">{q}</button>
            ))}
          </div>
          <ChatInput onSend={send} />
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="text-center">
    <span className="font-hand text-2xl text-secondary">{eyebrow}</span>
    <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-1">{title}</h2>
  </div>
);

const ContactRow = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-background/10 grid place-items-center shrink-0"><Icon name={icon} size={18} /></div>
    <span className="text-background/85">{text}</span>
  </div>
);

const ChatInput = ({ onSend }: { onSend: (t: string) => void }) => {
  const [val, setVal] = useState('');
  return (
    <div className="p-3 border-t border-border flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { onSend(val); setVal(''); } }}
        placeholder="Напишите вопрос..."
        className="flex-1 h-10 rounded-full border border-border px-4 text-sm outline-none focus:border-primary"
      />
      <button onClick={() => { onSend(val); setVal(''); }} className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
        <Icon name="Send" size={16} />
      </button>
    </div>
  );
};

export default Index;