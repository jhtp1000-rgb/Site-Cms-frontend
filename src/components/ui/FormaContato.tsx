export interface FormaContatoProps {
  type: 'whatsapp' | 'instagram' | 'email' | 'telefone';
  label: string;
  value: string;
  link: string;
  color?: string; // Cor dinâmica do tenant
}

export default function FormaContato({ type, label, value, link, color = '#00966D' }: FormaContatoProps) {
  // Configuração base (WhatsApp, Instagram e Telefone mantêm suas cores de marca)
  const config = {
    whatsapp: {
      bg: '#e8f7ea',
      text: '#25D366',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    },
    instagram: {
      bg: '#fce7f3',
      text: '#db2777',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    email: {
      bg: `${color}20`, // 20 adiciona opacidade ao HEX para o fundo
      text: color, // Usa a cor dinâmica do tenant
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    telefone: {
      bg: '#e0e7ff',
      text: '#4f46e5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    }
  };

  const currentConfig = config[type];

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5 group"
    >
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
        style={{ backgroundColor: currentConfig.bg, color: currentConfig.text }}
      >
        {currentConfig.icon}
      </div>

      <div className="flex flex-col">
        <span className="text-slate-400 text-sm font-medium mb-1">
          {label}
        </span>
        <span className="text-[#0F172A] font-bold md:text-lg">
          {value}
        </span>
      </div>
    </a>
  );
}