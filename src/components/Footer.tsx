import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { Phone, MapPin, Clock, Star, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-art-bg border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info (Cols 2/5) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-art-gold to-art-goldDark flex items-center justify-center font-display font-extrabold text-art-bg text-lg shadow-lg shadow-art-gold/20">
                AT
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-wider text-white">
                  ART TUNING
                </span>
                <p className="text-[10px] tracking-widest text-art-muted uppercase font-mono">
                  Автоателье · Красноярск
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-art-silver/70 max-w-sm leading-relaxed">
              Профессиональная перетяжка, ремонт, восстановление и индивидуальный дизайн автомобильных салонов в Красноярске с 2012 года.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={COMPANY_INFO.links.yandexMapsOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-art-gold/10 border border-art-gold/30 text-xs font-semibold text-art-gold hover:bg-art-gold/20 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-art-gold" />
                <span>Рейтинг 5.0 на Яндекс Картах</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Nav Links: Услуги */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-art-gold font-bold">
              Услуги ателье
            </h4>
            <ul className="space-y-2 text-xs text-art-silver/80">
              <li><a href="#services" className="hover:text-art-gold transition-colors">Перетяжка руля</a></li>
              <li><a href="#services" className="hover:text-art-gold transition-colors">Пошив кресел и диванов</a></li>
              <li><a href="#services" className="hover:text-art-gold transition-colors">Потолок в Alcantara</a></li>
              <li><a href="#services" className="hover:text-art-gold transition-colors">Ремонт боковин и поролона</a></li>
              <li><a href="#services" className="hover:text-art-gold transition-colors">Подогрев сидений и руля</a></li>
              <li><a href="#services" className="hover:text-art-gold transition-colors">Детейлинг-химчистка</a></li>
            </ul>
          </div>

          {/* Nav Links: Разделы */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-art-gold font-bold">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs text-art-silver/80">
              <li><a href="#configurator" className="hover:text-art-gold transition-colors font-medium text-white">Калькулятор стоимости</a></li>
              <li><a href="#portfolio" className="hover:text-art-gold transition-colors">Портфолио Before/After</a></li>
              <li><a href="#materials" className="hover:text-art-gold transition-colors">Каталог кож и алькантары</a></li>
              <li><a href="#about" className="hover:text-art-gold transition-colors">О мастерах ателье</a></li>
              <li><a href="#reviews" className="hover:text-art-gold transition-colors">Отзывы клиентов</a></li>
              <li><a href="#contacts" className="hover:text-art-gold transition-colors">Схема проезда</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-art-gold font-bold">
              Контакты
            </h4>
            <div className="space-y-2 text-xs text-art-silver/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-art-gold shrink-0 mt-0.5" />
                <span>г. Красноярск, {COMPANY_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-art-gold shrink-0" />
                <a href={`tel:${COMPANY_INFO.phones[0].value}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phones[0].display}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-art-gold shrink-0" />
                <span>{COMPANY_INFO.schedule.weekdays}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-art-muted">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} ART TUNING. Все права защищены. Автоателье в Красноярске.</p>
            <p className="text-[10px] text-art-darkMuted">
              Информация, размещённая на данном сайте, носит исключительно ознакомительный характер и не является публичной офертой (ст. 437 ГК РФ). Окончательная стоимость и сроки работ определяются мастером после очного осмотра автомобиля.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-art-card border border-white/10 text-art-silver hover:text-art-gold hover:border-art-gold/40 transition-colors shrink-0"
            title="Наверх"
            aria-label="Вернуться наверх"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
