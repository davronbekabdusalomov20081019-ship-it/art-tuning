import React, { useState, useId } from 'react';
import { Send, Upload, Trash2, CheckCircle, AlertCircle, MessageCircle, PhoneCall, RefreshCw, Sparkles } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/company';
import { sendLeadToTelegram } from '../utils/telegram';

interface ApplicationFormProps {
  preselectedService?: string;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  preselectedService = '',
  onShowToast
}) => {
  const fileInputId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carMakeModel, setCarMakeModel] = useState('');
  const [selectedService, setSelectedService] = useState(preselectedService || 'Перетяжка руля');
  const [comment, setComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<{ file: File; preview: string }[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'config_needed' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newItems = filesArray.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setUploadedPhotos(prev => [...prev, ...newItems].slice(0, 5));
      onShowToast(`Прикреплено ${newItems.length} фото`, 'success');
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      onShowToast('Укажите контактный номер телефона', 'error');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    const payload = {
      source: 'Форма прямой заявки на сайте ART TUNING',
      name: name.trim() || 'Посетитель сайта',
      phone: phone.trim(),
      carMakeModel: carMakeModel.trim() || 'Не указан',
      serviceInterest: selectedService,
      comment: comment.trim(),
      photosCount: uploadedPhotos.length
    };

    try {
      const res = await sendLeadToTelegram(payload);
      if (res.success) {
        setStatus('success');
        setStatusMessage(res.message);
        onShowToast('Заявка успешно отправлена мастеру!', 'success');
      } else if (!res.isConfigured) {
        setStatus('config_needed');
        setStatusMessage(res.message);
      } else {
        setStatus('error');
        setStatusMessage(res.message);
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage('Сетевая ошибка при отправке заявки.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = encodeURIComponent(
    `Здравствуйте! Оставляю заявку с сайта ART TUNING:\n` +
    `• Имя: ${name || 'Клиент'}\n` +
    `• Телефон: ${phone}\n` +
    `• Автомобиль: ${carMakeModel || 'Не указан'}\n` +
    `• Услуга: ${selectedService}\n` +
    `• Комментарий: ${comment || 'Прошу связаться со мной'}`
  );

  return (
    <section id="consultation" className="py-24 bg-art-bg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-art-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Запись на осмотр</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Обсудите ваш проект с мастером
          </h2>
          <p className="text-art-silver/80 text-sm sm:text-base mt-4 font-light">
            Прикрепите фото повреждений или опишите желаемый дизайн. Мастер перезвонит в течение рабочего дня и сориентирует по срокам и материалам.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="w-full bg-art-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                Телефон для связи <span className="text-art-gold">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-art-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                Марка и модель авто
              </label>
              <input
                type="text"
                value={carMakeModel}
                onChange={(e) => setCarMakeModel(e.target.value)}
                placeholder="Например: BMW X5 G05"
                className="w-full bg-art-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                Интересующая услуга
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-art-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-art-gold transition-colors"
              >
                {SERVICES_DATA.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title} ({s.priceDisplay})
                  </option>
                ))}
                <option value="Комплексный индивидуальный проект">Комплексный авторский проект</option>
                <option value="Другое / Нужна консультация">Другое / Нужна консультация</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-art-muted mb-2">
              Комментарий или описание задачи
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Опишите состояние элементов, желаемый цвет кожи или удобные дни для визита..."
              className="w-full bg-art-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold transition-colors resize-none"
            />
          </div>

          {/* Photo Dropzone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-mono text-art-muted flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-art-gold" />
                Прикрепить фотографии (до 5 штук)
              </label>
              <span className="text-[11px] font-mono text-art-muted">{uploadedPhotos.length}/5</span>
            </div>

            <div className="border border-dashed border-white/15 rounded-2xl p-4 text-center bg-art-surface/50 hover:border-art-gold/50 transition-colors">
              <input
                id={fileInputId}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor={fileInputId}
                className="cursor-pointer block text-xs sm:text-sm text-art-silver/70 hover:text-art-gold transition-colors"
              >
                Перетащите фотографии сюда или кликните для выбора с устройства
              </label>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {uploadedPhotos.map((item, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 group">
                    <img src={item.preview} alt="Фото авто" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Architecture Status Feedback */}
          {status === 'config_needed' && (
            <div className="p-4 rounded-xl bg-art-gold/10 border border-art-gold/30 text-xs text-art-silver space-y-2">
              <p className="font-semibold text-art-gold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Архитектура Telegram Bot API готова</span>
              </p>
              <p className="text-[11px] text-art-muted leading-relaxed">
                В соответствии с техническим заданием, сайт готов отправлять лиды в Telegram владельца бизнеса. Для активации укажите <code>VITE_TELEGRAM_BOT_TOKEN</code> и <code>VITE_TELEGRAM_CHAT_ID</code> в <code>.env</code>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/79029823504?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary py-2.5 px-4 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Отправить напрямую в WhatsApp мастеру</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phones[0].value}`}
                  className="flex-1 btn-secondary py-2.5 px-4 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Позвонить: {COMPANY_INFO.phones[0].display}</span>
                </a>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Заявка успешно принята!
              </p>
              <p className="text-[11px] mt-1 text-emerald-300">
                Мастер автоателье свяжется с вами по номеру {phone}.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              <p className="font-semibold">{statusMessage}</p>
            </div>
          )}

          {status !== 'config_needed' && status !== 'success' && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-gold disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Отправка заявки...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Отправить заявку на осмотр</span>
                </>
              )}
            </button>
          )}

          <p className="text-[10px] text-art-muted text-center">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Конфиденциальность гарантируется.
          </p>
        </form>

      </div>
    </section>
  );
};
