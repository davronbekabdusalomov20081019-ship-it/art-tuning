import React, { useState, useId } from 'react';
import { 
  Sliders, Check, AlertCircle, Send, Upload, Trash2, 
  Car, Info, ArrowRight, RefreshCw, MessageCircle, PhoneCall
} from 'lucide-react';
import { 
  CONFIGURATOR_SERVICES, 
  CAR_CLASSES, 
  MATERIALS_DATA, 
  COMPANY_INFO 
} from '../data/company';
import { sendLeadToTelegram } from '../utils/telegram';

interface ConfiguratorProps {
  initialServiceId?: string | null;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({ 
  initialServiceId, 
  onShowToast 
}) => {
  const photoInputId = useId();

  // State
  const [selectedClassId, setSelectedClassId] = useState<string>('suv-crossover');
  const [carMake, setCarMake] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [carYear, setCarYear] = useState<string>('2022');

  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceId ? [initialServiceId] : ['wheel', 'front-seats']
  );

  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('nappa');
  const [selectedColorCode, setSelectedColorCode] = useState<string>('NP-01');
  const [stitchPattern, setStitchPattern] = useState<'classic' | 'diamond' | 'stripes' | 'honeycomb'>('diamond');
  const [stitchColor, setStitchColor] = useState<string>('В тон материалу');
  const [perforation, setPerforation] = useState<'none' | 'center' | 'sport'>('center');
  
  const [addZeroMark, setAddZeroMark] = useState<boolean>(false);
  const [addEmbossing, setAddEmbossing] = useState<boolean>(false);

  // Form submission fields
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientComment, setClientComment] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<{ file: File; preview: string }[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'config_needed' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Active material details
  const activeMaterial = MATERIALS_DATA.find(m => m.id === selectedMaterialId) || MATERIALS_DATA[0];
  const activeColor = activeMaterial.colors.find(c => c.code === selectedColorCode) || activeMaterial.colors[0];
  const activeCarClass = CAR_CLASSES.find(c => c.id === selectedClassId) || CAR_CLASSES[0];

  // Material multipliers
  const materialMultipliers: Record<string, number> = {
    'nappa': 1.3,
    'alcantara': 1.45,
    'dakota-monza': 1.15,
    'schweizer-eco': 1.0
  };

  // Pattern extra costs
  const patternExtraCost: Record<string, number> = {
    'classic': 0,
    'diamond': 4000,
    'stripes': 2500,
    'honeycomb': 5500
  };

  // Toggle service selection
  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      } else {
        onShowToast('Выберите хотя бы одну услугу для расчёта', 'info');
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate pricing breakdown
  const currentMultiplier = activeCarClass.multiplier * (materialMultipliers[selectedMaterialId] || 1.0);

  const selectedServicesObjects = CONFIGURATOR_SERVICES.filter(s => selectedServices.includes(s.id));
  
  const servicesBaseSum = selectedServicesObjects.reduce((acc, curr) => acc + curr.basePrice, 0);
  const servicesCalculatedSum = Math.round(servicesBaseSum * currentMultiplier);
  
  const patternAddition = selectedServices.some(s => s.includes('seats') || s.includes('bench')) 
    ? patternExtraCost[stitchPattern] 
    : 0;
  const zeroMarkAddition = (addZeroMark && selectedServices.includes('wheel')) ? 1500 : 0;
  const embossingAddition = addEmbossing ? 3000 : 0;

  const totalCalculatedEstimate = servicesCalculatedSum + patternAddition + zeroMarkAddition + embossingAddition;

  // Photo handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newPhotos = filesArray.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
      onShowToast(`Прикреплено фото: ${newPhotos.length} шт.`, 'success');
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Form Submission
  const handleSubmitConfig = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientPhone.trim()) {
      onShowToast('Пожалуйста, укажите ваш контактный номер телефона', 'error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const configSummaryList = [
      `Класс авто: ${activeCarClass.name}`,
      carMake || carModel ? `Авто: ${carMake} ${carModel} (${carYear})` : `Год: ${carYear}`,
      `Услуги: ${selectedServicesObjects.map(s => s.name).join(', ')}`,
      `Материал: ${activeMaterial.name} (Оттенок: ${activeColor.name})`,
      `Строчка: ${stitchPattern} (Цвет нити: ${stitchColor})`,
      `Перфорация: ${perforation}`,
      addZeroMark ? 'Нулевой маркер на руле: Да' : '',
      addEmbossing ? 'Тиснение логотипа: Да' : '',
    ].filter(Boolean);

    const payload = {
      source: 'Интерактивный конфигуратор ART TUNING',
      name: clientName.trim() || 'Потенциальный клиент',
      phone: clientPhone.trim(),
      carMakeModel: `${carMake} ${carModel} ${carYear}`.trim(),
      serviceInterest: selectedServicesObjects.map(s => s.name).join(', '),
      materialDetails: `${activeMaterial.name} / ${activeColor.name}`,
      estimatedCost: `~ ${totalCalculatedEstimate.toLocaleString('ru-RU')} ₽ (демонстрационный)`,
      comment: clientComment.trim(),
      configSummary: configSummaryList,
      photosCount: uploadedPhotos.length
    };

    try {
      const res = await sendLeadToTelegram(payload);
      if (res.success) {
        setSubmitStatus('success');
        setStatusMessage(res.message);
        onShowToast('Заявка успешно направлена мастеру!', 'success');
      } else if (!res.isConfigured) {
        // Honest fallback when Telegram tokens aren't configured in .env yet
        setSubmitStatus('config_needed');
        setStatusMessage(res.message);
      } else {
        setSubmitStatus('error');
        setStatusMessage(res.message);
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setStatusMessage('Произошла непредвиденная ошибка при отправке.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper WhatsApp pre-filled text
  const whatsappPreFilledText = encodeURIComponent(
    `Здравствуйте! Я собрал конфигурацию на сайте ART TUNING:\n` +
    `• Автомобиль: ${carMake || 'Мой авто'} ${carModel} (${carYear})\n` +
    `• Услуги: ${selectedServicesObjects.map(s => s.name).join(', ')}\n` +
    `• Материал: ${activeMaterial.name} (${activeColor.name})\n` +
    `• Предварительный ориентир: ~${totalCalculatedEstimate.toLocaleString('ru-RU')} ₽\n` +
    `Мой телефон: ${clientPhone}\nХочу согласовать осмотр и точную смету.`
  );

  return (
    <section id="configurator" className="py-24 bg-art-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Интерактивный конфигуратор</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Соберите проект вашего идеального интерьера
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            Выберите элементы, материалы, геометрию отстрочки и получите предварительный расчёт сметы онлайн.
          </p>
        </div>

        {/* Main Grid: Left Controls (Cols 7/12) + Right Sticky Summary (Cols 5/12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Step-by-Step Options */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* STEP 1: CAR DETAILS */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-art-gold/20 text-art-gold font-mono font-bold text-xs flex items-center justify-center">
                    01
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">
                    Параметры автомобиля
                  </h3>
                </div>
                <Car className="w-5 h-5 text-art-muted" />
              </div>

              {/* Class Buttons */}
              <div>
                <label className="block text-xs uppercase font-mono text-art-muted mb-3">
                  Класс и кузов автомобиля
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CAR_CLASSES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClassId(c.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        selectedClassId === c.id
                          ? 'border-art-gold bg-art-gold/15 text-white font-semibold'
                          : 'border-white/5 bg-art-card text-art-silver/70 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{c.name}</span>
                        {selectedClassId === c.id && <Check className="w-3.5 h-3.5 text-art-gold" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact make, model, year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono text-art-muted mb-1.5">Марка</label>
                  <input
                    type="text"
                    value={carMake}
                    onChange={(e) => setCarMake(e.target.value)}
                    placeholder="Например: Porsche"
                    className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-art-muted mb-1.5">Модель</label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="Например: Cayenne"
                    className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-art-muted mb-1.5">Год выпуска</label>
                  <input
                    type="text"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    placeholder="2022"
                    className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold"
                  />
                </div>
              </div>
            </div>

            {/* STEP 2: SELECT SERVICES */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-art-gold/20 text-art-gold font-mono font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Выбор необходимых услуг
                    </h3>
                    <p className="text-xs text-art-muted">Можно выбрать несколько позиций одновременно</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-art-gold">
                  Выбрано: {selectedServices.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONFIGURATOR_SERVICES.map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'border-art-gold bg-art-gold/10 shadow-lg shadow-art-gold/5'
                          : 'border-white/5 bg-art-card hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`text-sm font-semibold ${isChecked ? 'text-white' : 'text-art-silver'}`}>
                            {srv.name}
                          </p>
                          <p className="text-[11px] text-art-muted mt-0.5 line-clamp-1">
                            {srv.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-art-gold border-art-gold text-art-bg'
                              : 'border-white/20 bg-art-bg'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-[11px]">
                        <span className="text-art-muted font-mono">{srv.duration}</span>
                        <span className="font-display font-bold text-art-gold">
                          от {Math.round(srv.basePrice * currentMultiplier).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: MATERIALS & TEXTURES */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-art-gold/20 text-art-gold font-mono font-bold text-xs flex items-center justify-center">
                    03
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Материал и цветовая палитра
                    </h3>
                    <p className="text-xs text-art-muted">Визуальные образцы и характеристики премиум-коллекций</p>
                  </div>
                </div>
              </div>

              {/* Material Type Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MATERIALS_DATA.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => {
                      setSelectedMaterialId(mat.id);
                      setSelectedColorCode(mat.colors[0].code);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedMaterialId === mat.id
                        ? 'border-art-gold bg-art-gold/15 shadow-glow-gold'
                        : 'border-white/5 bg-art-card hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-sm font-bold text-white">{mat.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-art-gold">
                        {mat.origin.split('/')[0].trim()}
                      </span>
                    </div>
                    <p className="text-xs text-art-muted line-clamp-1">{mat.subtitle}</p>
                    <p className="text-[11px] text-art-silver/70 mt-2 font-mono">
                      Износостойкость: {mat.specs.wearResistance}
                    </p>
                  </button>
                ))}
              </div>

              {/* Color Swatches for Selected Material */}
              <div className="pt-2">
                <label className="block text-xs uppercase font-mono text-art-muted mb-3">
                  Цвет материала: <span className="text-white font-semibold">{activeColor.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {activeMaterial.colors.map((color) => {
                    const isSelected = selectedColorCode === color.code;
                    return (
                      <button
                        key={color.code}
                        type="button"
                        onClick={() => setSelectedColorCode(color.code)}
                        className={`group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                          isSelected
                            ? 'border-art-gold bg-art-gold/20'
                            : 'border-white/10 bg-art-card hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                        </span>
                        <span className="text-xs text-art-silver group-hover:text-white">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 4: STITCH PATTERN, THREAD & DETAILS */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-art-gold/20 text-art-gold font-mono font-bold text-xs flex items-center justify-center">
                    04
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Дизайн строчки и акценты
                    </h3>
                    <p className="text-xs text-art-muted">Геометрия отстрочки, цвет нити и лазерная перфорация</p>
                  </div>
                </div>
              </div>

              {/* Stitch Patterns */}
              <div>
                <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                  Узор отстрочки кресел
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'classic', name: 'Классический шов', note: 'Без узора' },
                    { id: 'diamond', name: 'Ромб AMG / Bentley', note: '+ 4 000 ₽' },
                    { id: 'stripes', name: 'Продольные полосы GT', note: '+ 2 500 ₽' },
                    { id: 'honeycomb', name: 'Соты Audi RS', note: '+ 5 500 ₽' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setStitchPattern(p.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        stitchPattern === p.id
                          ? 'border-art-gold bg-art-gold/20 text-white font-semibold'
                          : 'border-white/5 bg-art-card text-art-silver/70 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-medium">{p.name}</p>
                      <p className="text-[10px] text-art-muted mt-1 font-mono">{p.note}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread Color & Perforation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                    Цвет нити отстрочки
                  </label>
                  <select
                    value={stitchColor}
                    onChange={(e) => setStitchColor(e.target.value)}
                    className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-art-gold"
                  >
                    <option value="В тон материалу">В тон выбранному материалу</option>
                    <option value="Контрастный белый / серебро">Контрастный белый / серебро</option>
                    <option value="Золотистый шампань">Золотистый шампань (Gold)</option>
                    <option value="Спортивный красный Carmine">Спортивный красный Carmine</option>
                    <option value="BMW M-Style триколор">BMW M-Style триколор</option>
                    <option value="Яркий желтый Speed Yellow">Яркий желтый Speed Yellow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-art-muted mb-2">
                    Перфорация центральных частей
                  </label>
                  <select
                    value={perforation}
                    onChange={(e) => setPerforation(e.target.value as any)}
                    className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-art-gold"
                  >
                    <option value="none">Без перфорации (гладкая кожа)</option>
                    <option value="center">Вентилируемая центральная зона</option>
                    <option value="sport">Точечная дизайнерская перфорация</option>
                  </select>
                </div>
              </div>

              {/* Extra checkables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-art-card border border-white/5 cursor-pointer hover:border-white/20">
                  <input
                    type="checkbox"
                    checked={addZeroMark}
                    onChange={(e) => setAddZeroMark(e.target.checked)}
                    className="w-4 h-4 rounded text-art-gold focus:ring-art-gold border-white/20 bg-art-bg"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">Нулевая метка на руле (+1 500 ₽)</p>
                    <p className="text-[10px] text-art-muted">Кожаная вставка на 12 часов</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-art-card border border-white/5 cursor-pointer hover:border-white/20">
                  <input
                    type="checkbox"
                    checked={addEmbossing}
                    onChange={(e) => setAddEmbossing(e.target.checked)}
                    className="w-4 h-4 rounded text-art-gold focus:ring-art-gold border-white/20 bg-art-bg"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">Тиснение логотипа (+3 000 ₽)</p>
                    <p className="text-[10px] text-art-muted">Оттиск на подголовниках или спинках</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Summary & Application Submission */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* Summary Calculation Panel */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-art-gold/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-art-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-art-muted">
                    Конфигурация проекта
                  </span>
                  <h4 className="font-display text-xl font-bold text-white">
                    {carMake || carModel ? `${carMake} ${carModel}` : activeCarClass.name}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-art-gold/20 flex items-center justify-center text-art-gold font-bold text-xs">
                  ★
                </div>
              </div>

              {/* Selected Services Breakdown */}
              <div className="py-4 space-y-2 border-b border-white/10 max-h-48 overflow-y-auto pr-1">
                <p className="text-xs text-art-muted uppercase font-mono">Выбранные позиции:</p>
                {selectedServicesObjects.map((srv) => (
                  <div key={srv.id} className="flex items-center justify-between text-xs">
                    <span className="text-art-silver">{srv.name}</span>
                    <span className="text-white font-mono font-medium">
                      ~ {Math.round(srv.basePrice * currentMultiplier).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}

                {patternAddition > 0 && (
                  <div className="flex items-center justify-between text-xs text-art-gold">
                    <span>Узор отстрочки: {stitchPattern}</span>
                    <span className="font-mono">+{patternAddition.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                {zeroMarkAddition > 0 && (
                  <div className="flex items-center justify-between text-xs text-art-gold">
                    <span>Нулевая метка руля</span>
                    <span className="font-mono">+{zeroMarkAddition.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                {embossingAddition > 0 && (
                  <div className="flex items-center justify-between text-xs text-art-gold">
                    <span>Тиснение эмблемы</span>
                    <span className="font-mono">+{embossingAddition.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
              </div>

              {/* Material Details In Summary */}
              <div className="py-3 border-b border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-art-muted block">Материал / Оттенок:</span>
                  <span className="text-white font-medium">{activeMaterial.name} ({activeColor.name})</span>
                </div>
                <div
                  className="w-5 h-5 rounded-full border border-white/30"
                  style={{ backgroundColor: activeColor.hex }}
                />
              </div>

              {/* Total Preliminary Calculation */}
              <div className="pt-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase font-mono text-art-muted">Предварительная стоимость:</span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-art-gold">
                    ~ {totalCalculatedEstimate.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {/* Important Price Disclaimers as required by prompt */}
                <div className="p-3 rounded-xl bg-art-bg/80 border border-white/5 space-y-1.5 text-[11px] text-art-muted leading-relaxed">
                  <p className="flex items-start gap-1.5 text-art-silver/80">
                    <Info className="w-3.5 h-3.5 text-art-gold shrink-0 mt-0.5" />
                    <span><strong>Демонстрационный расчёт.</strong> Окончательная стоимость подтверждается мастером после очного осмотра геометрии и состояния элементов вашего автомобиля.</span>
                  </p>
                  <p className="text-[10px] text-art-muted pl-5">
                    Возможен как безналичный расчёт для юридических лиц, так и поэтапная оплата.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Submission Form */}
            <form onSubmit={handleSubmitConfig} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-art-gold" />
                <span>Отправить конфигурацию мастеру</span>
              </h4>
              <p className="text-xs text-art-muted">
                Мастер ART TUNING изучит конфигурацию, проверит наличие материалов на складе и свяжется с вами для согласования даты осмотра.
              </p>

              <div>
                <label className="block text-xs font-mono text-art-muted mb-1">Ваше имя</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Константин"
                  className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-art-muted mb-1">
                  Номер телефона <span className="text-art-gold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-art-muted mb-1">Комментарий или пожелания</label>
                <textarea
                  rows={2}
                  value={clientComment}
                  onChange={(e) => setClientComment(e.target.value)}
                  placeholder="Особые пожелания, удобное время для визита..."
                  className="w-full bg-art-bg border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-art-darkMuted focus:outline-none focus:border-art-gold resize-none"
                />
              </div>

              {/* Photo Upload Dropzone */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-art-muted flex items-center gap-1">
                    <Upload className="w-3 h-3 text-art-gold" />
                    Прикрепить фото повреждений или салона
                  </label>
                  <span className="text-[10px] text-art-muted font-mono">{uploadedPhotos.length}/5</span>
                </div>

                <div className="border border-dashed border-white/15 rounded-xl p-3 text-center bg-art-bg/40 hover:border-art-gold/50 transition-colors">
                  <input
                    id={photoInputId}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor={photoInputId}
                    className="cursor-pointer block text-xs text-art-silver/70 hover:text-art-gold transition-colors"
                  >
                    Нажмите, чтобы выбрать фото с телефона или ПК
                  </label>
                </div>

                {/* Previews */}
                {uploadedPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uploadedPhotos.map((item, idx) => (
                      <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/20 group">
                        <img src={item.preview} alt="Превью" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submission Status Message / Fallback Notice */}
              {submitStatus === 'config_needed' && (
                <div className="p-3.5 rounded-xl bg-art-gold/10 border border-art-gold/30 text-xs text-art-silver space-y-2">
                  <p className="font-semibold text-art-gold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Архитектура Telegram Bot API готова
                  </p>
                  <p className="text-[11px] text-art-muted leading-relaxed">
                    Для прямой отправки в Telegram укажите переменные <code>VITE_TELEGRAM_BOT_TOKEN</code> и <code>VITE_TELEGRAM_CHAT_ID</code> в файле <code>.env</code>.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/79029823504?text=${whatsappPreFilledText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Отправить конфигурацию в WhatsApp мастера</span>
                    </a>
                    <a
                      href={`tel:${COMPANY_INFO.phones[0].value}`}
                      className="btn-secondary py-2 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Позвонить прямо сейчас: {COMPANY_INFO.phones[0].display}</span>
                    </a>
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <p className="font-bold">✓ Заявка успешно принята!</p>
                  <p className="text-[11px] mt-1 text-emerald-300">
                    Мастер свяжется с вами в течение рабочего дня по номеру {clientPhone}.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  <p className="font-semibold">Ошибка отправки:</p>
                  <p className="text-[11px] mt-0.5">{statusMessage}</p>
                </div>
              )}

              {submitStatus !== 'config_needed' && submitStatus !== 'success' && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-gold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Формирование расчёта...</span>
                    </>
                  ) : (
                    <>
                      <span>Получить расчёт мастера</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}

              <p className="text-[10px] text-art-muted text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных для расчёта стоимости.
              </p>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
};
