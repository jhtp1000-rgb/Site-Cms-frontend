import { useState } from 'react';
import { Link } from 'react-router-dom';

interface AsideMenuTenantProps {
  color: string;
  isOpen: boolean;
  onClose: () => void;
}

const dashboardIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const assinaturaIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

export default function AsideMenuTenant({ color, isOpen, onClose }: AsideMenuTenantProps) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const itemClass = (id: string) =>
    `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 outline-none ${
      activeItem === id
        ? 'text-slate-900'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/70 flex flex-col h-[calc(100vh-4rem)] transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0 mt-16 md:mt-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex-1 overflow-y-auto p-3.5">
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="#dashboard"
                onClick={() => handleItemClick('dashboard')}
                className={itemClass('dashboard')}
                style={activeItem === 'dashboard' ? { backgroundColor: `${color}12` } : undefined}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                  style={{
                    backgroundColor: activeItem === 'dashboard' ? color : 'transparent',
                    color: activeItem === 'dashboard' ? '#fff' : undefined,
                  }}
                >
                  {dashboardIcon}
                </span>
                <span>Painel de Edição</span>
              </a>
            </li>

            <li>
              <Link
                to="/admin/assinatura"
                onClick={() => handleItemClick('assinatura')}
                className={itemClass('assinatura')}
                style={activeItem === 'assinatura' ? { backgroundColor: `${color}12` } : undefined}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
                  style={{
                    backgroundColor: activeItem === 'assinatura' ? color : 'transparent',
                    color: activeItem === 'assinatura' ? '#fff' : undefined,
                  }}
                >
                  {assinaturaIcon}
                </span>
                <span>Assinatura</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
