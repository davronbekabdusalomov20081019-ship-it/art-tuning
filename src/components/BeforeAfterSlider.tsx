import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  car?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'ДО РАБОТЫ',
  afterLabel = 'ПОСЛЕ ART TUNING',
  title,
  car
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden select-none border border-white/10 shadow-2xl bg-black">
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-80 sm:h-96 md:h-[460px] cursor-ew-resize overflow-hidden"
      >
        {/* AFTER IMAGE (Background base layer) */}
        <img
          src={afterImage}
          alt="После реставрации ART TUNING"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE IMAGE (Clipped overlay layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="До реставрации"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          />
        </div>

        {/* BADGES */}
        {/* Left Badge (Before) */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono tracking-wider font-bold text-red-400 border border-red-500/30 shadow-lg">
            {beforeLabel}
          </span>
        </div>

        {/* Right Badge (After) */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-art-gold/90 backdrop-blur-md text-[11px] font-mono tracking-wider font-bold text-art-bg border border-art-gold shadow-lg">
            {afterLabel}
          </span>
        </div>

        {/* SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical white/gold line */}
          <div className="w-0.5 h-full bg-art-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] -translate-x-1/2" />
          
          {/* Draggable Circle Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-art-gold text-art-bg flex items-center justify-center shadow-xl border-2 border-white cursor-ew-resize pointer-events-auto">
            <div className="flex items-center gap-0.5 text-xs font-bold font-mono">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>

        {/* Mobile / Interaction Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-art-silver/80 border border-white/10 uppercase tracking-widest">
            Потяните разделитель влево-вправо
          </span>
        </div>
      </div>

      {/* Caption footer */}
      {(title || car) && (
        <div className="p-4 bg-art-card/90 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            {car && <span className="text-[11px] font-mono uppercase tracking-wider text-art-gold block">{car}</span>}
            {title && <h4 className="text-sm font-bold text-white">{title}</h4>}
          </div>
          <span className="text-xs text-art-muted font-mono">Интерактивное сравнение состояния</span>
        </div>
      )}
    </div>
  );
};
