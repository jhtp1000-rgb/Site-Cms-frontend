interface GeneralInfoTenantProps {
  color: string;             // Cor dinâmica do Tenant (ex: '#00966D')
  activeSections: number;    // Ex: 5
  totalSections: number;     // Ex: 7
  lastEdit: string;          // Ex: 'Hoje', 'Há 2 dias', '11/08/2026'
  views: string | number;    // Ex: '1.240' ou 1240
}

export default function GeneralInfoTenant({
  color,
  activeSections,
  totalSections,
  lastEdit,
  views
}: GeneralInfoTenantProps) {
  
  // Função auxiliar para formatar números caso receba um Number em vez de String (ex: 1240 -> "1.240")
  const formattedViews = typeof views === 'number' 
    ? new Intl.NumberFormat('pt-BR').format(views) 
    : views;

  return (
    <section className="w-full mb-8">
      
      {/* Cabeçalho da Seção */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
          Painel de Edição
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Edite e publique as seções do seu portfólio
        </p>
      </div>

      {/* Grid de Cards (1 coluna no mobile, 3 colunas no desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Seções Ativas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span 
            className="text-2xl font-bold mb-1" 
            style={{ color: color }}
          >
            {activeSections}/{totalSections}
          </span>
          <span className="text-sm font-medium text-slate-400">
            Seções ativas
          </span>
        </div>

        {/* Card 2: Última Edição */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span 
            className="text-2xl font-bold mb-1" 
            style={{ color: color }}
          >
            {lastEdit}
          </span>
          <span className="text-sm font-medium text-slate-400">
            Última edição
          </span>
        </div>

        {/* Card 3: Visualizações */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <span 
            className="text-2xl font-bold mb-1" 
            style={{ color: color }}
          >
            {formattedViews}
          </span>
          <span className="text-sm font-medium text-slate-400">
            Visualizações
          </span>
        </div>

      </div>
    </section>
  );
}