interface GeneralInfoTenantProps {
  color: string;
  activeSections: number;
  totalSections: number;
  lastEdit: string;
  views: string | number;
}

export default function GeneralInfoTenant({ color, activeSections, totalSections, lastEdit, views }: GeneralInfoTenantProps) {
  const formattedViews = typeof views === 'number' ? new Intl.NumberFormat('pt-BR').format(views) : views;

  const stats = [
    { value: `${activeSections}/${totalSections}`, label: 'Seções ativas' },
    { value: lastEdit, label: 'Última edição' },
    { value: formattedViews, label: 'Visualizações' },
  ];

  return (
    <section className="w-full mb-8 animate-fade-in-up">
      <div className="mb-6">
        <h1 className="font-display text-[26px] md:text-[30px] font-semibold text-slate-900 mb-1 tracking-tight">
          Painel de Edição
        </h1>
        <p className="text-slate-500 text-sm md:text-[15px]">
          Edite e publique as seções do seu portfólio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 animate-fade-in-up delay-${i + 1}`}
          >
            <span className="font-display text-2xl font-semibold mb-1 tracking-tight" style={{ color }}>
              {stat.value}
            </span>
            <span className="text-sm font-medium text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
