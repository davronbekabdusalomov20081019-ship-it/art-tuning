import React, { useState } from 'react';
import { MATERIALS_DATA } from '../data/company';
import { Layers, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const Materials: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(MATERIALS_DATA[0].id);
  const [activeColorCode, setActiveColorCode] = useState<string>(MATERIALS_DATA[0].colors[0].code);

  const activeMaterial = MATERIALS_DATA.find(m => m.id === selectedMaterialId) || MATERIALS_DATA[0];
  const activeColor = activeMaterial.colors.find(c => c.code === activeColorCode) || activeMaterial.colors[0];

  return (
    <section id="materials" className="py-24 bg-art-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-art-gold/10 border border-art-gold/20 text-art-gold text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Коллекция материалов</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Оригинальные европейские кожи и Alcantara®
          </h2>
          <p className="text-art-silver/80 text-base sm:text-lg mt-4 font-light">
            Мы работаем только с сертифицированными автомобильными материалами, прошедшими тесты на износ, сибирские морозы и ультрафиолет.
          </p>
        </div>

        {/* Material Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {MATERIALS_DATA.map((mat) => {
            const isActive = selectedMaterialId === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => {
                  setSelectedMaterialId(mat.id);
                  setActiveColorCode(mat.colors[0].code);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-art-card border-art-gold shadow-glow-gold scale-[1.02]'
                    : 'bg-art-bg/60 border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-art-gold block mb-1">
                  {mat.type}
                </span>
                <h4 className="font-display text-sm font-bold text-white mb-1">
                  {mat.name}
                </h4>
                <p className="text-[11px] text-art-muted line-clamp-1">
                  {mat.origin}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Material Showcase Display */}
        <div className="p-6 sm:p-10 rounded-3xl bg-art-card border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Texture & Color Swatch Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-72 sm:h-80 shadow-2xl group">
              <img
                src={activeMaterial.image}
                alt={activeMaterial.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Color swatch active overlay indicator */}
              <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg border border-white/40 shadow-inner"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <div>
                  <span className="text-[10px] text-art-muted font-mono uppercase block">Выбранный оттенок:</span>
                  <span className="text-xs font-bold text-white">{activeColor.name}</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono text-art-gold uppercase tracking-wider block">
                  {activeMaterial.origin}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {activeMaterial.name}
                </h3>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div>
              <label className="block text-xs uppercase font-mono text-art-muted mb-3">
                Доступная цветовая палитра: <span className="text-white font-bold">{activeColor.name}</span> ({activeColor.code})
              </label>
              <div className="flex flex-wrap gap-3">
                {activeMaterial.colors.map((color) => {
                  const isCurColor = activeColorCode === color.code;
                  return (
                    <button
                      key={color.code}
                      onClick={() => setActiveColorCode(color.code)}
                      className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                        isCurColor
                          ? 'border-art-gold bg-art-gold/20 shadow-md shadow-art-gold/10'
                          : 'border-white/10 bg-art-surface hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isCurColor && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <span className="text-xs text-art-silver">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications & Features */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-art-gold font-bold">
                {activeMaterial.type}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
                {activeMaterial.subtitle}
              </h3>
              <p className="text-art-silver/85 text-sm sm:text-base leading-relaxed font-light">
                {activeMaterial.description}
              </p>
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-art-bg/70 border border-white/5">
              <div>
                <span className="text-[10px] uppercase font-mono text-art-muted block">Тест Мартиндейла:</span>
                <span className="text-sm font-bold text-art-gold">{activeMaterial.specs.wearResistance}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-art-muted block">Толщина полотна:</span>
                <span className="text-sm font-bold text-white">{activeMaterial.specs.thickness}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-art-muted block">Паропроницаемость:</span>
                <span className="text-sm font-bold text-white">{activeMaterial.specs.breathability}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-art-muted block">Ресурс службы:</span>
                <span className="text-sm font-bold text-art-gold">{activeMaterial.specs.warranty}</span>
              </div>
            </div>

            {/* Advantage Checklist */}
            <div className="space-y-2.5">
              {activeMaterial.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-art-silver">
                  <ShieldCheck className="w-4 h-4 text-art-gold shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#configurator"
                className="inline-flex items-center gap-2 text-xs font-semibold text-art-gold hover:text-white transition-colors"
              >
                <span>Выбрать этот материал в конфигураторе</span>
                <Sparkles className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
