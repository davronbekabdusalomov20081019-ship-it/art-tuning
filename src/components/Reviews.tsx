import React from 'react';
import { REVIEWS_DATA, COMPANY_INFO } from '../data/company';
import { Star, ExternalLink, CheckCircle2, MessageSquare } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-art-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Yandex Maps Score Widget */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Репутация и отзывы</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Рейтинг 5.0 на Яндекс Картах
            </h2>
            <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
              Честные впечатления владельцев автомобилей Красноярска. Никаких заказных текстов — только реальные истории работ.
            </p>
          </div>

          {/* Official Yandex Maps Badge */}
          <div className="glass-panel p-5 rounded-2xl border border-art-gold/30 flex items-center gap-5 shrink-0 shadow-glow-gold">
            <div className="text-center pr-5 border-r border-white/10">
              <span className="font-display text-3xl font-extrabold text-white">5.0</span>
              <div className="flex text-art-gold mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-art-gold" />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Яндекс Карты</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </p>
              <p className="text-[11px] text-art-muted mt-0.5">
                Более 140 реальных оценок
              </p>
              <a
                href={COMPANY_INFO.links.yandexMapsOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-art-gold hover:text-white mt-2 transition-colors"
              >
                <span>Читать все на Яндекс Картах</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 flex flex-col justify-between group glass-panel-hover"
            >
              <div>
                {/* Header: Author & Car */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-art-gold/20 text-art-gold font-bold font-mono text-xs flex items-center justify-center border border-art-gold/30">
                      {rev.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] font-mono text-art-gold">
                        {rev.car}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-art-muted border border-white/5">
                    {rev.source}
                  </span>
                </div>

                {/* Rating stars & Service tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-art-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-art-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-art-muted font-mono">{rev.date}</span>
                </div>

                <div className="text-[11px] font-mono text-art-silver/70 mb-3 bg-white/5 px-2.5 py-1 rounded-lg">
                  Услуга: {rev.service}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-art-silver/90 leading-relaxed font-light">
                  «{rev.text}»
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Подтверждённый отзыв с геометкой Красноярска</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to View More / Leave a Review */}
        <div className="mt-12 text-center">
          <a
            href={COMPANY_INFO.links.yandexMapsOrg}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold hover:border-art-gold/40"
          >
            <span>Оставить отзыв или прочитать все 140+ оценок на Яндекс Картах</span>
            <ExternalLink className="w-3.5 h-3.5 text-art-gold" />
          </a>
        </div>

      </div>
    </section>
  );
};
