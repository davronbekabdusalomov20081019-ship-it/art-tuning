import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/company';
import type { ServiceCategory, ServiceItem } from '../types';
import { Sparkles, ArrowRight, Clock, ChevronRight } from 'lucide-react';

interface ServicesProps {
  onSelectServiceModal: (service: ServiceItem) => void;
  onSelectServiceForConfigurator: (serviceId: string) => void;
  onOpenConsultation: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onSelectServiceModal,
  onSelectServiceForConfigurator,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const categories = [
    { id: 'all', label: 'Все направления' },
    { id: 'reupholstery', label: 'Перетяжка салона' },
    { id: 'repair', label: 'Ремонт и восстановление' },
    { id: 'comfort', label: 'Комфорт и подогревы' },
    { id: 'detailing', label: 'Детейлинг и уход' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-art-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Направления услуг</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Полный спектр работ по интерьеру вашего авто
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            От точечного ремонта бокового валика кресла до комплексной перетяжки всего салона натуральной кожей Nappa и Alcantara.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group glass-panel-hover"
            >
              {/* Card Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-art-card via-art-card/20 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-lg bg-art-bg/85 backdrop-blur-md text-art-gold font-display font-bold text-xs sm:text-sm border border-art-gold/30">
                    {service.priceDisplay}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-mono flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-art-gold" />
                    {service.duration}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider text-art-muted px-2 py-0.5 rounded bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-art-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-art-muted mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectServiceModal(service)}
                    className="text-xs font-semibold text-art-silver hover:text-art-gold transition-colors flex items-center gap-1 py-1"
                  >
                    <span>Подробнее</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForConfigurator(service.id)}
                    className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-art-gold hover:text-white flex items-center gap-1.5"
                  >
                    <span>В конфигуратор</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-art-card via-art-surface to-art-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-lg sm:text-xl font-bold text-white">
              Не нашли нужную деталь или требуется нестандартный проект?
            </h4>
            <p className="text-xs sm:text-sm text-art-muted">
              Мастера ART TUNING реализуют любые задачи: от восстановления раритетных ретро-салонов до дооснащения катеров и спецтранспорта.
            </p>
          </div>

          <button
            onClick={() => onOpenConsultation('Индивидуальный проект')}
            className="btn-primary px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 shadow-lg"
          >
            Получить консультацию мастера
          </button>
        </div>
      </div>
    </section>
  );
};
