import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/company';
import type { PortfolioItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Camera, Maximize2, X, Clock, ArrowRight } from 'lucide-react';

interface PortfolioProps {
  onOpenConsultation: (projectTitle: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenConsultation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'Все проекты' },
    { id: 'interior', label: 'Комплексные салоны' },
    { id: 'steering', label: 'Рули' },
    { id: 'repair', label: 'Ремонт и реставрация' },
    { id: 'alcantara', label: 'Потолки Alcantara' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-art-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Галерея выполненных работ</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Качество, подтверждённое сотнями проектов
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            Оцените прецизионную ровность швов, натяжение полотна и точнейшее совпадение оттенков на реальных автомобилях наших клиентов.
          </p>
        </div>

        {/* FEATURED INTERACTIVE BEFORE / AFTER SHOWCASE */}
        <div className="mb-20">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-art-card to-art-surface border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-art-gold font-bold">
                  Интерактивная демонстрация
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  До и после работы мастеров ART TUNING
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-art-muted max-w-md">
                Перемещайте разделитель, чтобы наглядно увидеть результат восстановления сильно изношенных элементов до состояния нового автомобиля.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Slider 1: Steering Wheel */}
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
                afterImage="https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80"
                car="Porsche Macan GTS"
                title="Перетяжка руля в Nappa со спортивной перфорацией и красной строчкой"
                beforeLabel="ДО (160 000 км)"
                afterLabel="ПОСЛЕ ART TUNING"
              />

              {/* Slider 2: Seat Bolster Repair */}
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80"
                afterImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                car="Mercedes-Benz E 63 S AMG"
                title="Восстановление геометрии поролона и замена сегмента кожи боковины"
                beforeLabel="ДО (Трещины и заломы)"
                afterLabel="ПОСЛЕ ART TUNING"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-art-gold text-art-bg font-bold shadow-lg shadow-art-gold/20 scale-[1.02]'
                  : 'bg-art-card text-art-silver/70 border border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 cursor-pointer group glass-panel-hover flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-art-card via-art-card/20 to-transparent" />

                {/* Badge Category */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-art-gold border border-art-gold/30">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Lightbox Trigger icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-mono text-art-gold tracking-wider uppercase block">
                    {item.car}
                  </span>
                  <h3 className="font-display text-base font-bold text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs text-art-muted line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono text-art-silver/70">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-art-gold" />
                    <span>{item.specs.duration}</span>
                  </div>
                  <div className="text-right text-art-gold font-semibold">
                    Подробнее →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-art-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:text-art-gold flex items-center justify-center transition-colors border border-white/10"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative h-72 sm:h-96 md:h-[480px] w-full">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-art-card via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono uppercase tracking-widest text-art-gold font-bold">
                  {lightboxItem.car}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {lightboxItem.title}
                </h3>
              </div>
            </div>

            {/* Modal Specs & Description */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-art-silver leading-relaxed">
                {lightboxItem.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-art-bg/80 border border-white/5 text-xs">
                <div>
                  <span className="text-art-muted font-mono uppercase block mb-1">Срок исполнения:</span>
                  <span className="text-white font-bold">{lightboxItem.specs.duration}</span>
                </div>
                <div>
                  <span className="text-art-muted font-mono uppercase block mb-1">Использованные материалы:</span>
                  <span className="text-white font-bold">{lightboxItem.specs.materials}</span>
                </div>
                <div>
                  <span className="text-art-muted font-mono uppercase block mb-1">Объём работ:</span>
                  <span className="text-white font-bold">{lightboxItem.specs.works}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-art-muted">
                  Хотите аналогичный проект для вашего автомобиля?
                </span>
                <button
                  onClick={() => {
                    const title = lightboxItem.title;
                    setLightboxItem(null);
                    onOpenConsultation(`Проект по примеру: ${title}`);
                  }}
                  className="w-full sm:w-auto btn-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Рассчитать аналогичный проект</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
