import React from 'react';
import { Award, Layers, Target, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-art-bg relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-art-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>О компании · ART TUNING</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Индивидуальный подход к каждому стежку и миллиметру
            </h2>

            <p className="text-art-silver/85 text-base sm:text-lg leading-relaxed font-light">
              <strong className="text-white font-semibold">ART TUNING</strong> — специализированное автоателье в Красноярске, созданное мастерами с глубоким пониманием эргономики и архитектуры современных автомобильных салонов.
            </p>

            <p className="text-art-muted text-sm sm:text-base leading-relaxed">
              Мы не используем типовые конвейерные чехлы или сомнительные материалы. Каждый заказ — от реставрации потёртой боковины кресла на BMW или Toyota до полного пошива салона спорткара кожей Nappa — выполняется строго по оригинальным лекалам с учётом пожеланий владельца.
            </p>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-art-gold shrink-0" />
                  <span>Прецизионный раскрой</span>
                </div>
                <p className="text-xs text-art-muted">
                  Идеальная посадка обивки без морщин, провисаний и вздутий даже в сложнейших зонах анатомических кресел.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Layers className="w-4 h-4 text-art-gold shrink-0" />
                  <span>Европейские материалы</span>
                </div>
                <p className="text-xs text-art-muted">
                  Подлинная кожа Wollsdorf, Pasubio, оригинальная Alcantara® и износостойкая экокожа на микрофибре.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-art-gold shrink-0" />
                  <span>Безопасность SRS Airbag</span>
                </div>
                <p className="text-xs text-art-muted">
                  Сохранение регламентных разрывных швов для боковых и фронтальных подушек безопасности.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Target className="w-4 h-4 text-art-gold shrink-0" />
                  <span>Комплексные решения</span>
                </div>
                <p className="text-xs text-art-muted">
                  Объединяем перетяжку, ремонт поролона, установку подогревов, шумоизоляцию и детейлинг интерьера.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Stats Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                alt="Процесс работы в автоателье ART TUNING Красноярск"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-art-muted font-mono uppercase">Локация ателье</p>
                    <p className="text-sm font-bold text-white">г. Красноярск, {COMPANY_INFO.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-art-gold font-bold flex items-center gap-1 justify-end">
                      ★ 5.0
                    </p>
                    <p className="text-[11px] text-art-muted">{COMPANY_INFO.rating.reviewsCount}+ отзывов</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-art-card p-4 rounded-xl border border-white/5 text-center">
                <div className="font-display text-2xl font-extrabold text-art-gold">5.0</div>
                <div className="text-[11px] text-art-muted mt-1 uppercase font-mono">Рейтинг клиентов</div>
              </div>
              <div className="bg-art-card p-4 rounded-xl border border-white/5 text-center">
                <div className="font-display text-2xl font-extrabold text-white">120+</div>
                <div className="text-[11px] text-art-muted mt-1 uppercase font-mono">Фактур и цветов</div>
              </div>
              <div className="bg-art-card p-4 rounded-xl border border-white/5 text-center">
                <div className="font-display text-2xl font-extrabold text-art-gold">3 года</div>
                <div className="text-[11px] text-art-muted mt-1 uppercase font-mono">Гарантия на швы</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
