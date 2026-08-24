interface TenantHeaderProps {
  color: string;
  tenantName: string;
  tenantPortfolioName: string;
  assinatura: 'pro' | 'premium' | 'free';
  onToggleMenu: () => void;
}

export default function TenantHeader({
  color,
  tenantName,
  tenantPortfolioName,
  assinatura,
  onToggleMenu,
}: TenantHeaderProps) {
  const initial = tenantPortfolioName.charAt(0).toUpperCase();
  const nameParts = tenantPortfolioName.split('.');
  const nameMain = nameParts[0];
  const nameExtension = nameParts.length > 1 ? `.${nameParts.slice(1).join('.')}` : '';

  return (
    <header className="flex items-center justify-between w-full h-16 px-4 md:px-6 bg-white/80 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMenu}
          className="text-slate-400 hover:text-slate-700 transition-colors duration-150 rounded-lg p-1.5 hover:bg-slate-100"
          aria-label="Abrir menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div
          className="flex items-center justify-center w-8 h-8 font-display font-semibold text-white rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
          style={{ backgroundColor: color, boxShadow: `0 2px 8px ${color}40` }}
        >
          {initial}
        </div>
        <div className="font-display text-[15px] font-semibold text-slate-800 hidden sm:block tracking-tight">
          {nameMain}
          {nameExtension && <span style={{ color }}>{nameExtension}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button className="text-slate-400 hover:text-slate-700 transition-colors duration-150 relative rounded-lg p-1.5 hover:bg-slate-100">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full font-display font-semibold text-[13px]"
            style={{ backgroundColor: `${color}18`, color }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="hidden md:flex flex-col items-start justify-center leading-none gap-1">
            <span className="text-[13px] font-medium text-slate-800">{tenantName}</span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {assinatura}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}