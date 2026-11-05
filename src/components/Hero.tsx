import React from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeroProps {
  onOpenConsultation: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExplorePortfolio }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Image Layer with Cinematic Vignette & Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="./images/hero_interior.jpg"
          alt="Премиальный салон автомобиля ART TUNING Красноярск"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Deep cinematic overlays: multi-stop gradients for luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-art-bg via-art-bg/85 to-art-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-transparent to-art-bg/90" />
        <div className="absolute inset-0 bg-radial-gradient from-art-gold/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-12">
        <div className="max-w-3xl">
          {/* Top Location & Rating Badges */}
          <div className="inline-flex flex-wrap items-center gap-3 mb-6 animate-fadeIn">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-art-silver">
              <MapPin className="w-3.5 h-3.5 text-art-gold" />
              <span>Красноярск · {COMPANY_INFO.address}</span>
            </div>

            <a
              href={COMPANY_INFO.links.yandexMapsOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-art-gold/10 border border-art-gold/30 backdrop-blur-md text-xs font-semibold text-art-gold hover:bg-art-gold/20 transition-colors"
            >
              <div className="flex text-art-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-art-gold" />
                ))}
              </div>
              <span className="font-display font-bold">5.0</span>
              <span className="text-white/70">на Яндекс Картах</span>
            </a>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Искусство{' '}
            <span className="gold-gradient-text inline-block">преображения</span>{' '}
            автомобильного интерьера
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-art-silver/85 font-light leading-relaxed mb-10 max-w-2xl">
            Перетяжка, восстановление и индивидуальный дизайн автомобильных салонов в Красноярске. От локального ремонта боковины кресла до комплексного авторского проекта.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onOpenConsultation}
              className="btn-primary px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-3 shadow-glow-gold transition-all"
            >
              <span>Обсудить проект</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExplorePortfolio}
              className="btn-secondary px-8 py-4 rounded-xl text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:border-art-gold/40 transition-all"
            >
              <span>Наши работы</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-art-gold">
                Портфолио
              </span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-art-gold shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">До 3 лет гарантии</h4>
                <p className="text-xs text-art-muted mt-0.5">Письменная гарантия на все швы и материалы</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-art-gold shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Nappa & Alcantara</h4>
                <p className="text-xs text-art-muted mt-0.5">Оригинальные европейские кожи и микрофибра</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-art-gold shrink-0 mt-0.5">
                <div className="w-2.5 h-2.5 rounded-full bg-art-gold animate-ping" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Точные заводские лекала</h4>
                <p className="text-xs text-art-muted mt-0.5">Полное сохранение датчиков и SRS Airbag</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-art-muted hover:text-art-gold transition-colors text-xs font-mono tracking-widest uppercase opacity-75 hover:opacity-100"
      >
        <span>Листать вниз</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
