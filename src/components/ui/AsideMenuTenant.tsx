import { useState } from 'react';

interface AsideMenuTenantProps {
  color: string;
  isOpen: boolean;       // Controlado pelo botão hambúrguer no Parent Layout
  onClose: () => void;   // Função para fechar o menu no mobile ao clicar em um link
}

export default function AsideMenuTenant({ color, isOpen, onClose }: AsideMenuTenantProps) {
  // Estado para controlar visualmente qual item está ativo no momento
  const [activeItem, setActiveItem] = useState('ctas'); // Iniciando com CTAs como no seu print

  // Configuração dos itens do menu com seus respectivos IDs (âncoras) e ícones SVG
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    {
      id: 'carrossel',
      label: 'Carrossel',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    },
    {
      id: 'descricao',
      label: 'Descrição',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      id: 'ctas',
      label: 'CTAs',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"></path>
          <path d="M9 18h6"></path>
          <path d="M10 22h4"></path>
        </svg>
      )
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      id: 'contatos',
      label: 'Contatos',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    },
    {
      id: 'depoimentos',
      label: 'Depoimentos',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      id: 'assinatura',
      label: 'Assinatura',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      )
    }
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (window.innerWidth < 768) {
      onClose(); // Fecha o menu no mobile após o clique
    }
  };

  return (
    <>
      {/* Overlay escuro para mobile (aparece quando menu está aberto) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu Lateral */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col h-[calc(100vh-4rem)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 mt-16 md:mt-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`} // O clique fará a página rolar para a section correspondente na área central
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 outline-none
                      ${isActive ? 'bg-[var(--dynamic-bg)] text-[var(--dynamic-text)]' : 'text-slate-500 hover:bg-[var(--dynamic-bg)] hover:text-[var(--dynamic-text)] focus-visible:ring-2 focus-visible:ring-[var(--dynamic-text)]'}
                    `}
                    // Injeção da cor dinâmica via variáveis CSS no style inline. O '20' no final simula ~12% de opacidade no HEX.
                    style={{
                      '--dynamic-bg': `${color}20`,
                      '--dynamic-text': color
                    } as React.CSSProperties}
                  >
                    <span className="flex-shrink-0">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}