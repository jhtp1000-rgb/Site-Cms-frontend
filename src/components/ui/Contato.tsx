import FormaContato from './FormaContato';

export default function Contato() {
  const contatos = [
    {
      type: 'whatsapp' as const,
      label: 'WhatsApp',
      value: '+55 (11) 99999-9999',
      link: 'https://wa.me/5511999999999'
    },
    {
      type: 'instagram' as const,
      label: 'Instagram',
      value: '@analima.digital',
      link: 'https://instagram.com/analima.digital'
    },
    {
      type: 'email' as const,
      label: 'E-mail',
      value: 'ana@analima.digital',
      link: 'mailto:ana@analima.digital'
    },
    {
      type: 'telefone' as const,
      label: 'Telefone',
      value: '+55 (11) 3333-4444',
      link: 'tel:+551133334444'
    }
  ];

  return (
    <section id="contato" className="w-full">
      
      <div className="mb-6 md:mb-8">
        <span className="text-[#00966D] text-xs font-extrabold tracking-widest uppercase block mb-1">
          CONTATO
        </span>
        <h2 className="text-[#0F172A] text-2xl md:text-3xl font-bold mb-2">
          Vamos conversar?
        </h2>
        <p className="text-slate-500 text-sm md:text-base">
          Escolha o canal de sua preferência para entrar em contato.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {contatos.map((contato, index) => (
          <FormaContato 
            key={index}
            type={contato.type}
            label={contato.label}
            value={contato.value}
            link={contato.link}
          />
        ))}
      </div>

      <div className="bg-[#00966D] rounded-2xl p-6 text-white flex flex-col md:justify-center">
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="text-sm font-medium">Horário de atendimento</span>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold mb-1">
          Segunda a Sexta, 9h–18h
        </h3>
        <p className="text-[#a7f3d0] text-sm">
          Resposta garantida em até 2 horas úteis
        </p>
      </div>

    </section>
  );
}