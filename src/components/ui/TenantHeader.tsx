interface TenantHeaderProps {
  color: string;
  tenantName: string;
  tenantPortfolioName: string;
  assinatura: 'pro' | 'premium' | 'free';
}

export default function TenantHeader({
  color,
  tenantName,
  tenantPortfolioName,
  assinatura
}: TenantHeaderProps) {
  // Pega a primeira letra do nome do portfólio para o quadrado
  const initial = tenantPortfolioName.charAt(0).toUpperCase();

  // Lógica para colorir a extensão do domínio se houver um "." (ex: analima.digital)
  const nameParts = tenantPortfolioName.split('.');
  const nameMain = nameParts[0];
  const nameExtension = nameParts.length > 1 ? `.${nameParts.slice(1).join('.')}` : '';

  return (
    <header className="flex items-center justify-between w-full h-16 px-4 md:px-6 bg-white border-b border-slate-200">
      
      {/* Seção Esquerda: Menu e Logo */}
      <div className="flex items-center gap-4">
        {/* Ícone de Menu Hambúrguer */}
        <button className="text-slate-500 hover:text-slate-800 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Quadrado com a Inicial */}
        <div 
          className="flex items-center justify-center w-8 h-8 font-bold text-white rounded-md"
          style={{ backgroundColor: color }}
        >
          {initial}
        </div>

        {/* Nome do Portfólio (com a extensão colorida) */}
        <div className="text-lg font-bold text-slate-800 hidden sm:block">
          {nameMain}
          {nameExtension && (
            <span style={{ color: color }}>{nameExtension}</span>
          )}
        </div>
      </div>

      {/* Seção Direita: Notificações e Perfil */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Ícone de Sino (Notificações) */}
        <button className="text-slate-500 hover:text-slate-800 transition-colors relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>

        {/* Informações do Usuário */}
        <div className="flex items-center gap-3">
          {/* Avatar (Fundo claro dinâmico baseado na cor hexadecimal - adicionando '20' para 12% de opacidade) */}
          <div 
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          {/* Nome e Badge (Oculto em telas muito pequenas) */}
          <div className="hidden md:flex flex-col items-start justify-center">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              {tenantName}
            </span>
            {/* Badge de Assinatura */}
            <span 
              className="text-[10px] font-bold px-1.5 py-0.5 mt-0.5 rounded-sm uppercase tracking-wide leading-none"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {assinatura}
            </span>
          </div>
        </div>
      </div>
      
    </header>
  );
}