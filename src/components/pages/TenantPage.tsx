// src/pages/TenantPage.tsx
import { useState } from 'react';
import TenantHeader from '../ui/TenantHeader';
import AsideMenuTenant from '../ui/AsideMenuTenant';
import GeneralInfoTenant from '../ui/GeneralInfoTenant';
import EditPortfolioSection from '../ui/EditPortfolioSection';
import { useTenantDashboard } from '../../hooks/useTenantDashboard';

export default function TenantPage() {
  // 1. Estados de Controle de Interface[cite: 10]
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Consumo da lógica de API isolada no Custom Hook
  const { tenantData, sectionsData, loading, error } = useTenantDashboard();

  // Tela de Loading enquanto a API não responde[cite: 10]
  if (loading || !tenantData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#00966D] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Tratamento de Erro (Impede que a tela quebre se a API falhar)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    // Container principal: Ocupa 100vh e não rola a página inteira, apenas as áreas específicas[cite: 10]
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <TenantHeader 
        color={tenantData.color}
        tenantName={tenantData.tenantName}
        tenantPortfolioName={tenantData.tenantPortfolioName}
        assinatura={tenantData.assinatura}
      />

      {/* ÁREA INFERIOR (Menu Lateral + Conteúdo Principal)[cite: 10] */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* MENU LATERAL[cite: 10] */}
        <AsideMenuTenant 
          color={tenantData.color}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        {/* CONTEÚDO PRINCIPAL (MainTenant)[cite: 10] */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb[cite: 10] */}
            <div className="text-sm text-slate-400 mb-6 font-medium">
              CMS <span className="mx-1">&gt;</span> <span className="text-slate-700">Painel de Edição</span>
            </div>

            {/* SEÇÃO DE INFORMAÇÕES GERAIS[cite: 10] */}
            <GeneralInfoTenant 
              color={tenantData.color}
              activeSections={tenantData.stats.activeSections}
              totalSections={tenantData.stats.totalSections}
              lastEdit={tenantData.stats.lastEdit}
              views={tenantData.stats.views}
            />

            {/* LISTA DE SEÇÕES DO PORTFÓLIO[cite: 10] */}
            <div className="flex flex-col gap-4 pb-20">
              {sectionsData.map((section) => (
                <EditPortfolioSection 
                  key={section.id}
                  id={section.id}
                  color={tenantData.color}
                  sectionName={section.sectionName}
                  attributesDescription={section.attributesDescription}
                  status={section.status}
                />
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}