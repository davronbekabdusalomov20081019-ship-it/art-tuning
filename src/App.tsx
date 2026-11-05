import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceModal } from './components/ServiceModal';
import { Configurator } from './components/Configurator';
import { Portfolio } from './components/Portfolio';
import { Materials } from './components/Materials';
import { Advantages } from './components/Advantages';
import { Reviews } from './components/Reviews';
import { ApplicationForm } from './components/ApplicationForm';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { NotificationToast, type ToastMessage } from './components/NotificationToast';
import type { ServiceItem } from './types';

export function App() {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [preselectedConfigService, setPreselectedConfigService] = useState<string | null>(null);
  const [consultationServiceTitle, setConsultationServiceTitle] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast dispatcher
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleOpenConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setConsultationServiceTitle(serviceTitle);
    }
    const elem = document.getElementById('consultation');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConfigurator = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedConfigService(serviceId);
    }
    const elem = document.getElementById('configurator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePortfolio = () => {
    const elem = document.getElementById('portfolio');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-art-bg text-art-silver selection:bg-art-gold/30 selection:text-white relative">
      {/* Top Header */}
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenConfigurator={() => handleOpenConfigurator()}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Screen */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExplorePortfolio={handleExplorePortfolio}
        />

        {/* 2. About Company */}
        <About />

        {/* 3. Services Catalog */}
        <Services
          onSelectServiceModal={(service) => setActiveModalService(service)}
          onSelectServiceForConfigurator={(serviceId) => handleOpenConfigurator(serviceId)}
          onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
        />

        {/* 4. Interactive Cost Configurator */}
        <Configurator
          initialServiceId={preselectedConfigService}
          onShowToast={showToast}
        />

        {/* 5. Portfolio & Before/After Comparison */}
        <Portfolio
          onOpenConsultation={(projectTitle) => handleOpenConsultation(projectTitle)}
        />

        {/* 6. Materials Showcase */}
        <Materials />

        {/* 7. Advantages */}
        <Advantages />

        {/* 8. Customer Reviews & Yandex Maps Rating */}
        <Reviews />

        {/* 9. Direct Application / Consultation Form */}
        <ApplicationForm
          preselectedService={consultationServiceTitle}
          onShowToast={showToast}
        />

        {/* 10. Contacts & Interactive Map */}
        <Contacts onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Service Detail Modal */}
      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onSelectForConfigurator={(serviceId) => handleOpenConfigurator(serviceId)}
        onOpenConsultation={(serviceTitle) => handleOpenConsultation(serviceTitle)}
      />

      {/* Toast Notification Container */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
