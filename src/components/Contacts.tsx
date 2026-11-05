import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { MapPin, Phone, Clock, Navigation, MessageCircle, Send, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactsProps {
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onShowToast }) => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phoneDisplay: string) => {
    navigator.clipboard.writeText(phoneDisplay);
    setCopiedPhone(phoneDisplay);
    onShowToast(`Номер ${phoneDisplay} скопирован в буфер обмена`, 'success');
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  return (
    <section id="contacts" className="py-24 bg-art-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Контакты и локация</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ждём вас в мастерской ART TUNING
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            Удобный заезд с улицы Шахтёров, собственная охраняемая парковка для клиентских автомобилей.
          </p>
        </div>

        {/* Main Grid: Left Info Cards + Right Interactive Map Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (5/12): Details */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-art-gold text-xs font-mono uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Фактический адрес</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                г. {COMPANY_INFO.city}, {COMPANY_INFO.address}
              </h3>
              <p className="text-xs text-art-muted">
                {COMPANY_INFO.addressNote}
              </p>
              
              <div className="pt-2">
                <a
                  href={COMPANY_INFO.links.yandexRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Построить маршрут в Яндекс Картах</span>
                </a>
              </div>
            </div>

            {/* Phones Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-art-gold text-xs font-mono uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Контактные телефоны</span>
              </div>
              
              <div className="space-y-2">
                {COMPANY_INFO.phones.map((phone) => (
                  <div
                    key={phone.value}
                    className="flex items-center justify-between p-3 rounded-xl bg-art-bg/70 border border-white/5"
                  >
                    <div>
                      <a
                        href={`tel:${phone.value}`}
                        className="font-display text-base font-bold text-white hover:text-art-gold transition-colors block"
                      >
                        {phone.display}
                      </a>
                      <span className="text-[10px] font-mono text-art-muted">{phone.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyPhone(phone.display)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-art-silver hover:text-white transition-colors"
                        title="Скопировать номер"
                      >
                        {copiedPhone === phone.display ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`tel:${phone.value}`}
                        className="px-3 py-1.5 rounded-lg bg-art-gold/15 text-art-gold hover:bg-art-gold hover:text-art-bg text-xs font-semibold transition-all"
                      >
                        Вызов
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-art-gold text-xs font-mono uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Режим работы</span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-white font-medium flex items-center justify-between">
                  <span>Будние дни:</span>
                  <span className="font-mono text-art-gold">{COMPANY_INFO.schedule.weekdays}</span>
                </p>
                <p className="text-art-silver flex items-center justify-between text-xs">
                  <span>Выходные:</span>
                  <span className="font-mono text-art-muted">{COMPANY_INFO.schedule.weekends}</span>
                </p>
              </div>
            </div>

            {/* Quick Messengers Bar */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={COMPANY_INFO.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-white"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={COMPANY_INFO.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#0088cc]/15 border border-[#0088cc]/30 hover:bg-[#0088cc]/25 transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-white"
              >
                <Send className="w-4 h-4 text-[#0088cc]" />
                <span>Telegram</span>
              </a>
            </div>

          </div>

          {/* Right Column (7/12): Interactive Styled Map & Route Launcher */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[420px] bg-art-card flex flex-col justify-between">
            {/* Interactive Yandex Map Iframe */}
            <div className="relative w-full h-full min-h-[400px]">
              <iframe
                title="Расположение автоателье ART TUNING на карте Красноярска"
                src="https://yandex.ru/map-widget/v1/?ll=92.888972%2C56.025391&z=16&pt=92.888972,56.025391,pm2grm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125 saturate-50"
                loading="lazy"
              />

              {/* Floating Map Overlay Header */}
              <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="p-4 rounded-xl glass-panel border border-white/10 shadow-2xl flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-art-gold flex items-center justify-center text-art-bg font-extrabold font-display">
                      AT
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">ART TUNING Красноярск</h4>
                      <p className="text-[11px] text-art-muted">{COMPANY_INFO.address}</p>
                    </div>
                  </div>

                  <a
                    href={COMPANY_INFO.links.yandexMapsOrg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
                  >
                    <span>Открыть в картах</span>
                    <ExternalLink className="w-3 h-3 text-art-gold" />
                  </a>
                </div>
              </div>

              {/* Bottom Quick Route Button */}
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex justify-center">
                <a
                  href={COMPANY_INFO.links.yandexRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto btn-primary px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Построить маршрут на автомобиле</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
