import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenConfigurator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, onOpenConfigurator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'Конфигуратор', href: '#configurator', highlight: true },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Материалы', href: '#materials' },
    { name: 'О компании', href: '#about' },
    { name: 'Отзывы', href: '#reviews' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-art-bg/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-art-gold to-art-goldDark flex items-center justify-center shadow-lg shadow-art-gold/20 transition-transform duration-300 group-hover:scale-105">
                <span className="font-display font-extrabold text-art-bg text-xl tracking-tighter">AT</span>
                <div className="absolute inset-0 rounded-lg border border-white/30" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wider text-white flex items-center gap-1.5">
                  ART TUNING
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-art-gold animate-pulse" />
                </span>
                <span className="text-[10px] tracking-widest text-art-muted uppercase font-mono">
                  Автоателье · Красноярск
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.highlight) {
                      e.preventDefault();
                      onOpenConfigurator();
                    }
                  }}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    link.highlight
                      ? 'text-art-gold hover:text-white font-semibold'
                      : 'text-art-silver/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.highlight && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-art-gold rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Right actions: Phone & CTA */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex flex-col text-right">
                <a
                  href={`tel:${COMPANY_INFO.phones[0].value}`}
                  className="font-display text-sm font-bold text-white hover:text-art-gold transition-colors flex items-center gap-1.5 justify-end"
                >
                  <Phone className="w-3.5 h-3.5 text-art-gold" />
                  {COMPANY_INFO.phones[0].display}
                </a>
                <span className="text-[11px] text-art-muted flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Пн–Пт с 09:00 до 18:00
                </span>
              </div>

              <button
                onClick={onOpenConsultation}
                className="btn-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 shadow-lg"
              >
                <span>Обсудить проект</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={`tel:${COMPANY_INFO.phones[0].value}`}
                className="p-2 rounded-lg bg-art-card border border-white/10 text-art-gold"
                aria-label="Позвонить"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-art-card border border-white/10 text-white"
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs text-art-muted">
              <MapPin className="w-4 h-4 text-art-gold shrink-0" />
              <span>Красноярск, {COMPANY_INFO.address}</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-display py-2 border-b border-white/5 flex items-center justify-between ${
                  link.highlight ? 'text-art-gold font-bold' : 'text-white'
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-art-muted" />
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6">
            <div className="bg-art-card p-4 rounded-xl border border-white/10">
              <p className="text-xs text-art-muted mb-1">Прямой номер мастера:</p>
              <a
                href={`tel:${COMPANY_INFO.phones[0].value}`}
                className="font-display text-lg font-bold text-white block mb-2"
              >
                {COMPANY_INFO.phones[0].display}
              </a>
              <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {COMPANY_INFO.schedule.weekdays}
              </p>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full btn-primary py-3 rounded-xl text-sm font-semibold tracking-wide uppercase text-center block"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      )}
    </>
  );
};
