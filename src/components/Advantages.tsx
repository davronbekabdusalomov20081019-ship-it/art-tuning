import React from 'react';
import { ADVANTAGES_DATA } from '../data/company';
import { Compass, CheckCircle } from 'lucide-react';

export const Advantages: React.FC = () => {
  return (
    <section className="py-24 bg-art-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Принципы работы</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Почему владельцы премиальных авто доверяют ART TUNING
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            Честные инженерные стандарты, профессиональное оборудование и уважение к заводской безопасности вашего автомобиля.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES_DATA.map((adv) => (
            <div
              key={adv.number}
              className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden group glass-panel-hover"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-3xl font-extrabold text-white/20 group-hover:text-art-gold transition-colors">
                  {adv.number}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-art-gold">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-art-gold transition-colors">
                {adv.title}
              </h3>

              <p className="text-xs sm:text-sm text-art-muted leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}

          {/* 6th Card: Красноярск & Приглашение в гости */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-art-gold/15 to-art-card border border-art-gold/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-art-gold font-bold block mb-2">
                Красноярск · Шахтёров 4/3
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                Приезжайте на бесплатный осмотр и примерку образцов
              </h3>
              <p className="text-xs text-art-silver/80 leading-relaxed">
                Подержите в руках образцы европейских кож, приложите их к интерьеру вашего автомобиля и согласуйте смету прямо в ателье.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#contacts"
                className="text-xs font-semibold text-art-gold hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Посмотреть адрес и маршрут на карте</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
