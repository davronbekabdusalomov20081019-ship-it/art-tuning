import React from 'react';
import { X, Clock, ShieldCheck, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForConfigurator: (serviceId: string) => void;
  onOpenConsultation: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectForConfigurator,
  onOpenConsultation
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-art-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-art-gold flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-art-card via-art-card/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-art-gold/20 text-art-gold border border-art-gold/30 text-xs font-mono font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {service.title}
            </h3>
            <p className="text-sm text-art-silver/80 mt-1">{service.subtitle}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-art-bg/60 border border-white/5">
            <div>
              <p className="text-xs text-art-muted font-mono uppercase">Ориентир стоимости</p>
              <p className="text-base font-bold text-art-gold mt-0.5">{service.priceDisplay}</p>
            </div>
            <div>
              <p className="text-xs text-art-muted font-mono uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-art-gold" />
                Срок исполнения
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">{service.duration}</p>
            </div>
            <div>
              <p className="text-xs text-art-muted font-mono uppercase flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-art-gold" />
                Гарантия
              </p>
              <p className="text-sm font-semibold text-white mt-0.5">{service.warranty}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-mono text-art-muted mb-2">
              Подробное описание услуги
            </h4>
            <p className="text-art-silver/90 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Features */}
          {service.features && service.features.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-art-muted mb-3">
                Особенности исполнения в ART TUNING
              </h4>
              <ul className="space-y-2">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-art-silver">
                    <CheckCircle className="w-4 h-4 text-art-gold shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stages of Work */}
          {service.stages && service.stages.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-art-muted mb-3">
                Этапы выполнения работы
              </h4>
              <div className="space-y-2.5">
                {service.stages.map((stage, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-art-muted">
                    <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 text-art-gold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="text-art-silver">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suitable Materials */}
          {service.suitableMaterials && service.suitableMaterials.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-mono text-art-muted mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-art-gold" />
                Рекомендуемые материалы
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.suitableMaterials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-art-surface border border-white/5 text-xs text-art-silver"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-art-bg/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-art-muted text-center sm:text-left">
            * Точная стоимость рассчитывается после осмотра автомобиля мастером.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSelectForConfigurator(service.id);
              }}
              className="flex-1 sm:flex-none btn-secondary px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide"
            >
              Рассчитать в конфигураторе
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation(service.title);
              }}
              className="flex-1 sm:flex-none btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase flex items-center justify-center gap-1.5"
            >
              <span>Записаться</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
